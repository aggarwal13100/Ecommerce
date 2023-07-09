import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../actions/productAction";
import ReactStars from "react-rating-stars-component";
import Spinner from "../Spinner/Spinner.js";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
// import required modules
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "./review.css";
import Review from "../Review/Review";

const ProductDetails = () => {
  const [currIndex, setCurrIndex] = useState(0);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, loading } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const options = {
    edit: false,
    color: "rgba(20 , 20 , 20 , 0.1)",
    activeColor: "gold",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };
  console.log(product);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>

          {/* HEADER */}
          <div className="text-3xl text-red-500 text-center">Header</div>
          <div className="flex flex-col my-4 md:flex-row md:w-10/12 md:mx-auto md:items-start">

            {/* IMAGE SECTION */}
            <div className="w-10/12 mx-auto flex justify-center items-center md:sticky md:top-0 flex-col">
              {product?.images?.[currIndex] && (
                <img
                  className="rounded-xl object-cover max-h-[50vh] md:w-[500px] md:max-w-[50vw]"
                  src={product.images[currIndex].url}
                  alt="nature"
                />
              )}
              <div className="flex gap-x-2 gap-y-2 mt-4 flex-wrap">
                {product?.images?.[0] &&
                  product.images.map((image, index) => (
                    <div key={image._id} className="w-[50px] h-[50px] ">
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
              <h3 className="text-2xl mt-2 font-semibold">{product.name}</h3>
              <div className="h-[1px] bg-gray-800"></div>
              <div className="flex gap-x-2 items-center">
                <span className="text-sm pt-1">{product.ratings}</span>
                <ReactStars key={options.value} {...options} />
                <span className="text-sm pt-1">
                  {" "}
                  {product.numOfReviews} Reviews
                </span>
              </div>
              <div className="text-2xl font-semibold my-2">
                ₹ {product.price}
              </div>
              <div className="flex gap-x-2 items-center">
                <div className="flex  text-xl rounded-lg border items-center">
                  <button className="px-3 py-[2px] transition-all flex justify-center items-center text-xl bg-dim-gray rounded-l-md text-white hover:bg-gray-800 ">
                    -
                  </button>
                  <span className="px-2 py-[2px] ">0</span>
                  <button className="px-3 py-[2px] transition-all flex justify-center items-center text-xl bg-dim-gray rounded-r-md text-white hover:bg-gray-800">
                    +
                  </button>
                </div>
                <button className="border p-1 px-3 rounded-lg font-semibold text-baby-powder transition-all  bg-pine-green  hover:shadow-lg hover:shadow-gray hover:scale-105">
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
                  {product.Stock > 0 ? "InStock" : "Out of Stock"}
                </span>
              </div>
              <h3 className="font-bold mt-2 text-lg w-full mx-auto">
                Product Description
              </h3>
              <p className="text-sm my-1 w-full mx-auto  ">
                {product.description}
              </p>
            </div>
          </div>

          {/* REVIEW SECTION */}
          <div className="my-12 ">
            <h2 className="text-center text-3xl font-bold text-midnight-green mb-2">Reviews</h2>
            <div className="h-[1px] w-10/12 mx-auto bg-midnight-green"></div>
            {
              product?.reviews?.[0] ? 
              (
                <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
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
                  <SwiperSlide>
                    <Review review={review} />
                  </SwiperSlide>
                ))}
            </Swiper>
              ) :
              (
                <div className="text-2xl text-center my-4">
                  No Reviews to Show
                </div>
              )
            }
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
