"use client";

export default function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="bg-black text-white text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-md w-full sm:w-auto cursor-pointer hover:bg-gray-800 transition-all duration-200"
    >
      {children}
    </button>
  );
}
