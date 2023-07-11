import React from "react";
import ReactStars from "react-rating-stars-component";
import { CgProfile } from "react-icons/cg";

const Review = (props) => {
    const { name, rating, comment, reviewedAt } = props.review;
    const options = {
      edit: false,
      color: "rgba(20 , 20 , 20 , 0.1)",
      activeColor: "tomato",
      size: window.innerWidth < 600 ? 20 : 25,
      value: rating,
      isHalf: true,
    };
  return (
    <div className="p-3 bg-[#ddd] min-h-[300px] rounded-xl shadow-xl relative flex flex-col justify-between">
      <p className="text-center italic mt-2 text-lg ">{comment}</p>
      <div  className="flex justify-between items-center p-3 pt">
        <div className="flex ">
          <div ><CgProfile className="text-5xl text-pine-green mr-2" /></div>
          <div className="flex flex-col">
            <div className="capitalize">{name}</div>
            <div>{reviewedAt.split('T')[0]}</div>
          </div>
        </div>
        <div><ReactStars key={options.value} {...options} /></div>
      </div>
    </div>
  );
};

export default Review;