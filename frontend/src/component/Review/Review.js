import React from "react";
import { CgProfile } from "react-icons/cg";
import { Rating } from "@mui/material";

const Review = (props) => {
    const { name, rating, comment, reviewedAt } = props.review;
    const options = {
      value: rating,
      readOnly: true,
      precision : 0.5 ,
    };
  
  return (
    <div className="p-3 bg-[#ddd] min-h-[300px] rounded-xl shadow-xl relative flex flex-col justify-between">
      <p className="text-center italic mt-2 p-3 px-5 text-md text-[#333] tracking-wide whitespace-pre-line">{comment}</p>
      <div  className="flex justify-between items-center p-5 pt">
        <div className="flex items-center">
          <div ><CgProfile className="text-5xl text-pine-green mr-2" /></div>
          <div className="flex flex-col justify-center">
            <div className="capitalize font-semibold">{name}</div>
            <div>{reviewedAt.split('T')[0]}</div>
          </div>
        </div>
        <div><Rating key={options.value} {...options} /></div>
      </div>
    </div>
  );
};

export default Review;