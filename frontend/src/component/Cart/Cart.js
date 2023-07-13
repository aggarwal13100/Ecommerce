import React from "react";
import CartItem from "./CartItem";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdRemoveShoppingCart } from "react-icons/md";

const Cart = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const navigate = useNavigate();
    let totalItems = 0;
    let totalPrice = 0;
    cartItems.forEach((item) => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;
    });

    const checkoutHandler = () => {
        navigate("/login?redirect=shipping");
    };

    return (
        <div>
            <div className="text-3xl text-center p-2 text-teal-800">HEADER</div>
            <div className="w-11/12 mx-auto ">
                {cartItems?.[0] ? (
                    <div>
                        {/* HEADER */}
                        <h2 className="text-xl font-bold text-center p-1">
                            YOUR CART
                        </h2>
                        {/* ACTIONS */}
                        <div className="flex justify-between items-center py-2">
                            <button
                                onClick={() => navigate(-1)}
                                className="border-dim-gray border rounded-md px-2 py-1 border-r-[2px] border-b-[2px] bg text-xs uppercase bg-baby-powder  transition-transform hover:scale-105"
                            >
                                Continue Shopping
                            </button>
                            <div className="hidden md:block italic  ">
                                shopping bag ({cartItems.length})
                            </div>
                            <button
                                onClick={checkoutHandler}
                                className="border-midnight-green border rounded-md px-2 py-1 text-xs uppercase bg-midnight-green text-baby-powder transition-transform hover:scale-105"
                            >
                                CHECKOUT
                            </button>
                        </div>
                        <div className="flex flex-col gap-4 py-4 px-2 md:flex-row md:justify-between ">
                            {/* CART LIST */}

                            <div className="md:w-full">
                                {cartItems.map((item) => (
                                    <CartItem
                                        key={item.product_id}
                                        item={item}
                                    />
                                ))}
                            </div>
                            {/* CART SUMMARY */}
                            <div className="p-4 border-[1px] border-midnight-green shadow-lg rounded-xl md:min-w-[30vw] h-fit md:sticky md:top-5">
                                <div className="text-lg text-center font">
                                    CART SUMMARY
                                </div>
                                <div className="flex justify-between p-1">
                                    <div className="font-semibold">
                                        TOTAL ITEMS
                                    </div>
                                    <div className="font-semibold">
                                        {totalItems}
                                    </div>
                                </div>
                                <div className="flex justify-between p-1 font-semibold text-lg">
                                    <div>Total</div>
                                    <div>₹ {totalPrice}</div>
                                </div>
                                <button
                                    onClick={checkoutHandler}
                                    className="ml-1 my-2 p-2 border-gray-800 border-r-[2px] border-b-[2px] bg-[#80808060] border  transition-all duration-300  hover:font-semibold"
                                >
                                    CHECKOUT
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full absolute top-[50vh] left-[50vw] -translate-x-[50%] -translate-y-[50%] flex justify-center items-center text-2xl flex-col gap-y-4">
                        <MdRemoveShoppingCart className="text-midnight-green scale-150" />
                        <div>YOUR CART IS EMPTY</div>
                        <Link to="/products">
                            <button className="border-dim-gray border rounded-md px-3 py-2 border-r-[2px] border-b-[2px] bg text-sm uppercase bg-midnight-green text-white  transition-transform hover:scale-105">
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
