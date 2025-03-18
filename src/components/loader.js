import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full py-8">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-[#222] rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
