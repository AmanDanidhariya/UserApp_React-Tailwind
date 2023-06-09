import React from "react";

const DeletePopup = ({ onDelete, onCancel }) => {
  return (
    <div className="fixed top-0 z-50 w-full h-full background-custom-gray flex justify-center items-center">
      <div className="bg-white popup-shadow p-8 rounded-lg text-center">
        <p className="pb-4 text-black">
          Are you sure you want to delete this User?
        </p>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={onDelete}
        >
          Delete
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeletePopup;
