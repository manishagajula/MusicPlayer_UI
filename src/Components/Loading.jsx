import React from "react";

export const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-800"></div>
      <p className="ml-2 text-gray-800">Loading...</p>
    </div>
  );
};
