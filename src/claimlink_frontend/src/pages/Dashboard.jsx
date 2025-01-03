import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Breadcrumb from "../components/Breadcrumb";
import { Header } from "../common/Header";
import Stepper from "../common/Stepper";
import MobileSidebar, { MobileFooter } from "../components/MobileSidebar";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { MdArrowOutward } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import StepperComponent from "../common/StepperComponent";
import { PlugLogin, StoicLogin, NFIDLogin, IdentityLogin } from "ic-auth";
import { useAuth } from "../connect/useClient";
import DashBoardHome from "./DashboardHome";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../common/ScroolToTop";

const Dashboard = ({
  children = <DashBoardHome />,
  headerText,
  menubar = true,
  stepper = false,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const whitelist = [process.env.CANISTER_ID_CLAIMLINK_BACKEND];
  // const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const { backend, principal, connectWallet, disconnect, isConnected } =
    useAuth();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isConnected && !principal) {
        navigate("/login");
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [isConnected, principal, navigate]);
  const handleLogin = async () => {
    const userObject = await PlugLogin(whitelist);
    console.log(userObject);
    // Handle code will go here...
  };

  useEffect(() => {
    // Close sidebar on mobile view by default
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Initialize sidebar state based on screen size
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <ScrollToTop />
      {window.innerWidth < 640 ? (
        <div className="flex flex-col bg-gray-50 h-full">
          <header className="w-full bg-[#FBFAFC] h-[88px] border-b border-gray-300 p-6 flex justify-between items-center">
            <div className="text-4xl font-quicksand tracking-wide text-[#2E2C34] flex items-center">
              claimlink
              <MdArrowOutward className="bg-[#3B00B9] rounded text-white ml-2" />
            </div>
            {isSidebarOpen ? (
              <button
                onClick={toggleSidebar}
                className="text-xl bg-[#3B00B9] p-2 rounded-md"
              >
                <RxCross2 className="text-white " />{" "}
              </button>
            ) : (
              <button
                onClick={toggleSidebar}
                className="text-xl px-2 py-2 bg-gray-300 rounded-md"
              >
                <RxHamburgerMenu />
              </button>
            )}
          </header>
          {isSidebarOpen && (
            <MobileSidebar
              setSidebarOpen={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
            />
          )}
          <Breadcrumb />

          <div className="flex-grow ">
            <div className="bg-gray-100 h-full">{children}</div>
          </div>
          <MobileFooter />
        </div>
      ) : (
        <div className="flex bg-gray-50">
          <div
            className={`fixed top-0 left-0 h-full z-10 transition-transform duration-500 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar setSidebarOpen={toggleSidebar} />
          </div>
          <div
            className={`transition-all duration-500 flex-grow m-0 ${
              isSidebarOpen ? "sm:ml-[250px]" : "ml-0"
            }`}
          >
            <header className="w-full bg-[#FBFAFC] h-[88px] border-b border-gray-300 p-6 flex justify-between items-center">
              <Header
                htext={headerText}
                menubar={menubar}
                toggleSidebar={toggleSidebar}
              />
            </header>
            {stepper ? "" : <Breadcrumb />}
            <div className="bg-gray-100 min-h-screen">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
