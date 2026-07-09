import React from "react";
import { IModalProps } from "../types";

const Modal: React.FC<IModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="absolute top-[40%] right-[50%] bg-white p-4 rounded-lg z-10 text-right max-w-md w-full mx-4">
        <button
          className="text-black font-semibold hover:text-gray-700 focus:outline-none mr-2"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;