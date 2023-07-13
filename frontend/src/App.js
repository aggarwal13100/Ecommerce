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
import OrderSuccess from "./component/Cart/OrderSuccess.js";

function App() {
    const [stripeApiKey, setStripeApiKey] = useState("");

    async function getStripeApiKey() {
        const { data } = await axios.get("/api/v1/stripeapikey");
        setStripeApiKey(data.stripeApiKey);
    }

    useEffect(() => {
        getStripeApiKey();
    }, []);

    return (
        <Routes>
            <Route exact path="/" element={<div>home page</div>} />
            <Route exact path="/product/:id" element={<ProductDetails />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/shipping" element={<Shipping />} />
            <Route exact path="/order/confirm" element={<ConfirmOrder />} />
            <Route exact path="/success" element={<OrderSuccess/>} />
            <Route
                exact
                path="/payment/process"
                element={
                    stripeApiKey && (<Elements stripe={loadStripe(stripeApiKey)}>
                        <Payment />
                    </Elements>)
                }
            />
            <Route exact path = "/login" element={<LoginSignUp/>} />
        </Routes>
    );
}

export default App;
