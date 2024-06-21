import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Dashboardcontainer from "../pages/Dashboardcontainer";

const approutes = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/claim-link",
    element: (
      <Dashboard>
        <Dashboardcontainer />
      </Dashboard>
    ),
  },
  {
    path: "/dispensers",
    element: (
      <Dashboard>
        <Dashboardcontainer />
      </Dashboard>
    ),
  },
]);

export default approutes;
