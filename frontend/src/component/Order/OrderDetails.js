import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Spinner from "../Spinner/Spinner";
import { toast } from "react-toastify";

const OrderDetails = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const { order, error, loading } = useSelector(
        (state) => state.orderDetails
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails());
    }, [dispatch, error, id]);
    console.log(order);
    return (
        <div className="w-full min-h-[100vh] overflow-x-hidden">
            {loading ? (
                <Spinner />
            ) : (
                <div className="w-[80vw] mx-auto my-8">
                    <h2 className="text-2xl text-center text-midnight-green font-semibold mb-4">
                        Order #{order && order?._id}
                    </h2>
                    <div className=" flex gap-x-8 justify-between flex-wrap border shadow-lg p-4 rounded-lg">
                        <div className="flex flex-col min-w-[200px] gap-y-2 p-4">
                            <div className=" text-xl text-pine-green">
                                Shipping Info
                            </div>
                            <div className="flex items-center">
                                <div className="text-base ">Name : </div>
                                <div className="capitalize text-[#333] pl-1">
                                    {order?.user?.name}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="text-base ">Phone : </div>
                                <div className="capitalize text-[#333] pl-1">
                                    {order?.shippingInfo?.phoneno}
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="text-base ">Address : </div>
                                <div className="capitalize text-[#333] pl-1 mt-[2px]">
                                    {order?.shippingInfo && (
                                        <div className="flex flex-col gap-y-1">
                                            <div>
                                                {order.shippingInfo.address}
                                            </div>
                                            <div>{` ${order.shippingInfo.city}, ${order.shippingInfo.pinCode},`}</div>
                                            <div>
                                                {`${order.shippingInfo.state},${order.shippingInfo.country}`}{" "}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col min-w-[200px] gap-y-2 p-4">
                            <div className=" text-xl text-pine-green">
                                Payment
                            </div>
                            <div
                                className={`${
                                    order?.paymentInfo &&
                                    order?.paymentInfo?.status === "succeeded"
                                        ? "text-green-500"
                                        : "text-red-500"
                                } text-base`}
                            >
                                {order?.paymentInfo &&
                                order?.paymentInfo?.status === "succeeded"
                                    ? "PAID"
                                    : "NOT PAID"}
                            </div>
                            <div className="flex items-center">
                                <div className="text-base ">Amount : </div>
                                <div className="capitalize text-[#333] pl-1">
                                    {order?.totalPrice}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col min-w-[200px] gap-y-2 p-4">
                            <div className=" text-xl text-pine-green">
                                Order Status
                            </div>
                            <div
                                className={`${
                                    order?.orderStatus &&
                                    order?.orderStatus === "Delivered"
                                        ? "text-green-500"
                                        : "text-red-500"
                                } text-base`}
                            >
                                {order?.orderStatus && order.orderStatus}
                            </div>
                        </div>
                    </div>
                    <div className=" mt-8 ">
                        <h3 className="text-xl font-semibold text-[#333] pt-2 pb-1 pl-2">
                            Order Items :{" "}
                        </h3>
                        <div>
                            {order?.orderItems?.[0] &&
                                order.orderItems.map((item) => (
                                    <div key={item.product} className="flex flex-wrap mt-4 justify-around items-center border rounded-xl hover:shadow-2xl">
                                        <div  className=" flex gap-x-4 items-center">
                                            <div  className="pl-2 py-4">
                                                <img
                                                    className=" h-[80px] aspect-auto object-cover rounded-lg shadow-xl"
                                                    key={item.product}
                                                    src={item.image}
                                                    alt="Product"
                                                />
                                            </div>
                                            <Link className="text-lg text-[#000000a4] hover:text-pine-green"
                                                key={item.product}
                                                to={`/product/${item.product}`}
                                            >
                                                {item.name}
                                            </Link>
                                        </div>
                                        <span className="text-base italic" key={item.product}>
                                            {item.quantity} X ₹{item.price} ={" "}
                                            <span className= " text-gray-800 font-semibold" key={item.product}>
                                                ₹{item.price * item.quantity}
                                            </span>
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderDetails;
