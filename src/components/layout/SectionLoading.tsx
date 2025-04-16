import React from "react";

function SectionLoading() {
  return (
    <div className="animate-pulse space-y-4 py-4">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
}

export default SectionLoading;
