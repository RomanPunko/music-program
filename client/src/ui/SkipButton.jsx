import React from 'react';

const SkipButton = ({ onClick, skipNextIcon }) => {
  return (
    <div
      className="rounded-[10px] p-[5px] cursor-pointer icon-hover"
      onClick={onClick}
    >
      <img src={skipNextIcon} alt="" className="w-8" />
    </div>
  );
};

export default SkipButton;
