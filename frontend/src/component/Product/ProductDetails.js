import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProductDetails, newReview } from "../../actions/productAction";
import Spinner from "../Spinner/Spinner.js";
import { addToCartItems } from "../../actions/cartAction";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
// import required modules
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "./review.css";
import Review from "../Review/Review";
import {toast} from 'react-toastify';
// for submitting review
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import {Rating} from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";


const ProductDetails = () => {
  const [currIndex, setCurrIndex] = useState(0);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, loading , error } = useSelector((state) => state.productDetails);

  const {success , error : reviewError } = useSelector((state) => state.newReview);

  const [quantity, setQuantity] = useState(1);
  const [open , setOpen] = useState(false) ;
  const [rating , setRating] = useState(0) ;
  const [comment  , setComment ] = useState("");

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  }

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (quantity >= product.Stock) return;
    setQuantity(quantity + 1);
  };

  const addToCartHandler = () => {
    dispatch(addToCartItems(id , quantity));
    toast("Added to Cart Successfully");
  }

  useEffect(() => {
    if(error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if(reviewError) {
      toast.error(reviewError) 
      dispatch(clearErrors());
    }
    if(success) {
      toast.success("Review Submitted Successfully");
      dispatch({type : NEW_REVIEW_RESET})
    }
    dispatch(getProductDetails(id));
  }, [dispatch, error ,id , reviewError ,success]);

  const options = {
    value: product?.ratings,
    readOnly: true,
    precision : 0.5 ,
  };

  
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="flex flex-col my-4 mt-[8rem] md:flex-row md:w-10/12 md:mx-auto md:items-start">
            {/* IMAGE SECTION */}
            <div className="w-10/12 mx-auto flex justify-center items-center md:sticky md:top-0 flex-col">
              {product?.images?.[currIndex] && (
                <img
                  className="rounded-xl aspect-square max-h-[50vh] md:w-[500px] md:max-w-[50vw]"
                  src={product.images[currIndex].url}
                  alt="nature"
                />
              )}
              <div className="flex gap-x-2 gap-y-2 mt-4 flex-wrap">
                {product?.images?.[0] &&
                  product.images.map((image, index) => (
                    <div key={image.url} className="w-[50px] h-[50px] ">
                      <img 
                        onMouseEnter={() => {
                          setCurrIndex(index);
                        }}
                        className={`w-40 aspect-square object-cover transition-shadow cursor-pointer rounded-md ${
                          index === currIndex &&
                          "shadow-[2px_3px_2px_1px_rgba(3,121,113,1),-2px_-3px_2px_1px_rgba(3,121,113,1)] "
                          // index===currIndex && " border-[3px] border-pine-green"
                        }`}
                        src={image.url}
                        alt={image.url}
                        key={image.url}
                      />
                    </div>
                  ))}
              </div>
            </div>

            {/* PRODUCT DETAILS SECTION */}
            <div className="flex w-10/12 mx-auto flex-col items-center mt-4 md:ml-8 md:mt-0 md:mx-0 md:items-start ">
              <div className="text-xs italic">{product.category}</div>
              <h3 className="text-2xl mt-2 font-semibold p-1 pl-2">{product.name}</h3>
              <div className="h-[1px] bg-gray-800 w-full my-2"></div>
              <div className="flex gap-x-2 items-center">
                <Rating  {...options} />
                <span className="text-sm pt-1 italic text-[#333]">
                 ( {product.numOfReviews} Reviews )
                </span>
              </div>
              <div className="text-2xl font-semibold my-2">
                ₹ {product?.price}
              </div>
              <div className="flex gap-x-2 items-center">
                <div className="flex  text-xl rounded-lg border items-center">
                  <button
                    onClick={decreaseQuantity}
                    className="px-3 py-[2px] transition-all flex justify-center items-center text-xl bg-dim-gray rounded-l-md text-white hover:bg-gray-800 "
                  >
                    -
                  </button>
                  <span className="px-2 py-[2px] ">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="px-3 py-[2px] transition-all flex justify-center items-center text-xl bg-dim-gray rounded-r-md text-white hover:bg-gray-800"
                  >
                    +
                  </button>
                </div>
                <button
                onClick={addToCartHandler}
                disabled = {product.Stock > 0 ? false : true}
                className="border p-1 px-3 rounded-lg font-semibold text-baby-powder transition-all  bg-pine-green  hover:shadow-lg hover:shadow-gray hover:scale-105">
                  Add to Cart
                </button>
              </div>
              <div className="my-2 mt-4 ">
                <span className="font-medium">Status : </span>{" "}
                <span
                  className={`italic font-semibold ${
                    product.Stock > 0 ? "text-green-800" : "text-red-500"
                  }`}
                >
                  {product?.Stock > 0 ? "InStock" : "Out of Stock"}
                </span>
              </div>
              <button
              onClick={() => {submitReviewToggle()}}
               className="px-6 py-[6px] rounded-xl ease-in-out bg-pine-green text-white hover:bg-midnight-green transition-colors duration-300 delay-100">Add Review</button>
              <h3 className="font-bold mt-2 text-lg w-full mx-auto whitespace-pre-line">
                Product Description
              </h3>
              <p className="text-sm my-1 w-full mx-auto text-[#000000bd]
              tracking-wide whitespace-pre-line ">
                {product.description}
              </p>
            </div>
          </div>

          {/* REVIEW SECTION */}
          <div className="my-12 ">
            <h2 className="text-center text-3xl font-bold text-midnight-green mb-2">
              Reviews
            </h2>

            <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle className="text-center text-pine-green">Submit Review</DialogTitle>
            <DialogContent  className="flex flex-col">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea className="border border-pine-green rounded-lg mt-4 p-2"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button  onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>



            <div className="h-[1px] w-10/12 mx-auto bg-midnight-green"></div>
            {product?.reviews?.[0] ? (
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={false}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 0,
                  // rotate: 50,
                  // stretch: 0,
                  // depth: 100,
                  // modifier: 1,
                }}
                modules={[Autoplay, EffectCoverflow]}
                className="mySwiper"
              >
                {product?.reviews?.[0] &&
                  product.reviews.map((review) => (
                    <SwiperSlide key={review._id}>
                      <Review review={review} />
                    </SwiperSlide>
                  ))}
              </Swiper>
            ) : (
              <div className="text-2xl text-center my-4">
                No Reviews to Show
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
