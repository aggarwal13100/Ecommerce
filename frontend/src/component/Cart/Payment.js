import React, { useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import {createOrder , clearErrors } from "../../actions/orderAction"
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
// importing the icons
import { FaRegCreditCard } from "react-icons/fa";
import { MdVpnKey } from "react-icons/md";
import { TbCalendarEvent } from "react-icons/tb";

const Payment = () => {
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const {user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/v1/payment/process",
                paymentData,
                config
            );

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });

            if (result.error) {

                payBtn.current.disabled = false;
                toast.error(result.error.message);

            } else {

                if (result.paymentIntent.status === "succeeded") {

                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };
                    
                    dispatch(createOrder(order));
                    localStorage.removeItem("cartItems");
                    navigate("/success");

                } else {
                    toast.error("There's some issue while processing payment ");
                }
            }

        } catch (error) {
            payBtn.current.disabled = false;
            toast.error(error.response.data.message);
        }
    };

    // clearing the error
    useEffect(() => {
        if(error) {
            toast.error(error);
            dispatch(clearErrors);
        }
    } , [dispatch , error ]);

    return (
        <div className="bg-[#ddd] w-screen min-h-screen overflow-hidden">
            <div className="mt-[8rem]">
                <CheckoutSteps activeStep={2} />
            </div>

            <div>
                <form className="w-[80vw] max-w-[500px] mx-auto rounded-lg flex flex-col justify-evenly shadow-lg bg-white p-4 min-h-[50vh] md:[600px] my-8">
                    <div className="relative">
                        <FaRegCreditCard className="absolute left-3 text-[#444] top-[0.65rem]" />
                        <CardNumberElement className="py-2 pl-8 pr-2 border rounded-lg " />
                    </div>
                    <div className="relative">
                        <TbCalendarEvent className="absolute left-3 text-[#444] top-[0.65rem]" />
                        <CardExpiryElement className="py-2 pl-8 pr-2 border rounded-lg" />
                    </div>
                    <div className="relative">
                        <MdVpnKey className="absolute left-3 text-[#444] top-[0.65rem]" />
                        <CardCvcElement className="py-2 pl-8 pr-2 border rounded-lg" />
                    </div>
                    <div className="self-center">
                        <button
                            className="bg-[#14595c] text-baby-powder py-2 px-4 rounded-md self-center hover:bg-midnight-green transition-colors duration-200 ease-linear"
                            ref={payBtn}
                            onClick={submitHandler}
                        >
                            {`Pay - ${orderInfo && orderInfo.totalPrice}`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Payment;
