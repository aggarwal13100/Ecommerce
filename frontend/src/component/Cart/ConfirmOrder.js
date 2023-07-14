import React from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const {user} = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/payment/process");
  };
  return (
    <div>
      <CheckoutSteps activeStep={1} />
      <div className="w-11/12 mx-auto ">
        {/* ACTIONS */}

        <div className="flex flex-col mx-auto gap-4 py-4 px-2 md:flex-row md:justify-between md:max-w-[1024px] md:gap-x-4">
          {/* SHIPPING INFO */}
          <div className="flex flex-col  w-full">
            <h2 className="text-lg pl-4 py-3">Shipping Info</h2>
            <div className="pl-4 flex flex-col gap-y-2 mb-3">
              <div className="flex items-center">
                <div className="font-semibold pr-1">Name : </div>
                <div className="text-sm">{user.name}</div>
              </div>
              <div className="flex items-center">
                <div className="font-semibold pr-1">Phone : </div>
                <div className="text-sm">{shippingInfo.phoneno}</div>
              </div>
              <div className="flex items-center">
                <div className="font-semibold pr-1">Address : </div>
                <div className="text-sm">{`${shippingInfo.address} , ${shippingInfo.city} , ${shippingInfo.state} , ${shippingInfo.pincode} , ${shippingInfo.country}`}</div>
              </div>
            </div>
            {/* CART LIST */}

            <div className="md:w-full">
              {cartItems.map((item) => (
                <div
                  key={item.product_id} 
                  className="p-2 border-b-2 border-b-gray-900 flex mb-2 justify-between items-center grow"
                >
                  <div className="flex gap-x-2 items-center">
                    <div className="w-[25vw] md:w-[15vw] ">
                      <img
                        className=" aspect-[5/4] object-fill rounded-lg"
                        src={item.image.url}
                        alt={item.name}
                        loading="lazy"
                      />
                    </div>
                    <div className="pl-4 flex flex-col gap-y-2 ">
                        <Link to = {`/product/${item.product_id}`}>
                        <div className="text-base ">{item.name}</div>
                        </Link>
                        <div>{`${item.quantity} × ${item.price} = ${item.quantity*item.price}`}</div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* ORDER SUMMARY */}
          <div className="p-4 mt-8 flex flex-col w-full max-w-[80vw] mx-auto border-[1px] border-midnight-green shadow-lg rounded-xl md:max-w-[300px] h-fit md:sticky md:top-5 xl:w-[500px] md:grow-0">
            <div className="text-lg text-center font">ORDER SUMMARY</div>
            <div className="h-[1px] bg-midnight-green my-4"></div>
            <div className="flex justify-between p-1">
              <div className="font-semibold">SUBTOTAL</div>
              <div >₹ {subtotal}</div>
            </div>
            <div className="flex justify-between p-1">
              <div className="font-semibold">Shipping Charges</div>
              <div>₹ {shippingCharges}</div>
            </div>
            <div className="flex justify-between p-1">
              <div className="font-semibold">GST</div>
              <div >₹ {tax}</div>
            </div>
            <div className="h-[1px] bg-midnight-green my-4"></div>
            <div className="flex justify-between p-1 font-semibold text-lg">
              <div>Total</div>
              <div>₹ {totalPrice}</div>
            </div>
            <button
              onClick={proceedToPayment}
              className="ml-1 my-2 p-2 border-gray-800 border-r-[2px] border-b-[2px] bg-midnight-green text-baby-powder  border  transition-all duration-300  hover:font-semibold"
            >
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
