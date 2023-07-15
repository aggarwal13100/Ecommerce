import LoginSignUp from "./component/User/LoginSignUp";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./component/Product/ProductDetails.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import { useEffect, useState } from "react";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js"


import Home from "./component/Home/Home.js";
function App() {
    // const [stripeApiKey, setStripeApiKey] = useState("");

    // // async function getStripeApiKey() {
    // //     const { data } = await axios.get("/api/v1/stripeapikey");
    // //     setStripeApiKey(data.stripeApiKey);
    // // }

    // // useEffect(() => {
    // //     getStripeApiKey();
    // // }, []);

    return (
        <>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/product/:id" element={<ProductDetails />} />
                <Route exact path="/cart" element={<Cart />} />
                <Route exact path="/shipping" element={<Shipping />} />
                <Route exact path="/order/confirm" element={<ConfirmOrder />} />
                <Route exact path="/success" element={<OrderSuccess />} />
                <Route exact path="/orders" element={<MyOrders />} />
                <Route exact path="/admin/products" element={<ProductList />} />
                <Route exact path="/admin/dashboard" element={<Dashboard />}/>
                <Route exact path="/admin/product" element={<NewProduct />} />
                <Route exact path="/admin/product/:id" element={<UpdateProduct />} />
                <Route exact path="/admin/orders" element={<OrderList />} />
                <Route exact path="/admin/order/:id" element={<ProcessOrder />} />
                <Route exact path="/admin/users" element={<UsersList />} />
                <Route exact path="/admin/user/:id" element={<UpdateUser />} />
                <Route exact path="/admin/reviews" element={<ProductReviews />} />


                {/* <Route
                    exact
                    path="/payment/process"
                    element={
                        stripeApiKey && (<Elements stripe={loadStripe(stripeApiKey)}>
                            <Payment />
                        </Elements>)
                    }
                /> */}
                <Route exact path="/login" element={<LoginSignUp />} />
                <Route exact path="/order/:id" element={<OrderDetails />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
