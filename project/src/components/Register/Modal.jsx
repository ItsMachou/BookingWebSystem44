// FILE: src/components/Register/Modal.jsx
import React from 'react';

const Modal = ({ show, message, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">{message}</h2>
        <div className="text-center">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;