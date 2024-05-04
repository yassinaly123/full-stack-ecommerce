import React from "react";

const SectionTag = ({name}) => {
  return (
    <div className="flex items-center container">
      <span className="w-[20px] h-[40px] rounded bg-secondary" />
      <h3 className="text-secondary ml-5 font-semibold">{name}</h3>
    </div>
  );
};

export default SectionTag;
