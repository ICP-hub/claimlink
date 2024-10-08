import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useAuth } from "../connect/useClient";
import { useNavigate } from "react-router-dom";

const WalletModal = ({ isOpen, onClose }) => {
  const { login } = useAuth();

  const { backend, principal, connectWallet, disconnect, isConnected } =
    useAuth();
  const navigate = useNavigate();
  const handleLogin = (provider) => {
    login(provider);
    if (isConnected) {
      navigate("/dashboard");
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded p-4 w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Select Wallet</h2>
          <button
            className="bg-[#e6e6e7] p-2 rounded-md text-white text-sm font-medium"
            onClick={onClose}
          >
            <RxCross1 className="text-black/90" />
          </button>
        </div>

        <div className="flex flex-col py-4 gap-4">
          <button
            onClick={() => handleLogin("Plug")}
            className="mt-2 rounded-md hover:bg-[#5542F6] text-[#5542F6] hover:text-white transition duration-300 py-2 px-8 text-xl font-semibold border border-[#5542F6]"
          >
            Plug Wallet
          </button>

          <button
            onClick={() => handleLogin("NFID")}
            className="mt-2 rounded-md hover:bg-[#5542F6] text-[#5542F6] hover:text-white transition duration-300 py-2 px-8 text-xl font-semibold border border-[#5542F6]"
          >
            NFID
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
