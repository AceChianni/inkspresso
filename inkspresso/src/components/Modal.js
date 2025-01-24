// src/components/Modal.js

import React from "react";

const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-80">
        <h3 className="text-lg font-semibold text-center">{message}</h3>
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
