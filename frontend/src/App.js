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
import ProductReviews from "./component/Admin/ProductReviews.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import store from "./store.js";
import Home from "./component/Home/Home.js";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
function App() {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const [stripeApiKey, setStripeApiKey] = useState("");
    /*     const isAdmin=useSelector(state=>state.user.user.role)==="admin";
     */ async function getStripeApiKey() {
        const { data } = await axios.get("/api/v1/stripeapikey");
        setStripeApiKey(data.stripeApiKey);
    }

    useEffect(() => {
        getStripeApiKey();
        store.dispatch(loadUser());
    }, []);

    return (
        <>
            <Header />
            {isAuthenticated && <UserOptions user={user} />}

            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/product/:id" element={<ProductDetails />} />
                <Route exact path="/products" element={<Products />} />
                <Route path="/products/:id" element={<Products />} />

                <Route exact path="/search" element={<Search />} />

                <Route
                    exact
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    }
                />

                <Route
                    exact
                    path="/account"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    exact
                    path="/me/update"
                    element={
                        <ProtectedRoute>
                            <UpdateProfile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    exact
                    path="/shipping"
                    element={
                        <ProtectedRoute>
                            <Shipping />
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path="/yourOrder/confirm"
                    element={
                        <ProtectedRoute>
                            <ConfirmOrder />
                        </ProtectedRoute>
                    }
                />

                <Route
                    exact
                    path="/success"
                    element={
                        <ProtectedRoute>
                            <OrderSuccess />
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path="/orders"
                    element={
                        <ProtectedRoute>
                            <MyOrders />
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path="/admin/products"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <ProductList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path="/admin/product"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <NewProduct />
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path="/admin/product/:id"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <UpdateProduct />
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path="/admin/orders"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <OrderList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path="/admin/order/:id"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <ProcessOrder />
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path="/admin/users"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <UsersList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path="/admin/user/:id"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <UpdateUser />
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path="/admin/reviews"
                    element={
                        <ProtectedRoute isAdmin={true}>
                            <ProductReviews />
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path="/password/update"
                    element={
                        <ProtectedRoute>
                            <UpdatePassword />
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path="/password/forgot"
                    element={
                        <ProtectedRoute>
                            <ForgotPassword />
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path="/password/reset/:token"
                    element={
                        <ProtectedRoute>
                            <ResetPassword />
                        </ProtectedRoute>
                    }
                />

                <Route
                    exact
                    path="/payment/process"
                    element={
                        stripeApiKey && (
                            <ProtectedRoute>
                                <Elements stripe={loadStripe(stripeApiKey)}>
                                    <Payment />
                                </Elements>
                            </ProtectedRoute>
                        )
                    }
                />
                <Route exact path="/login" element={<LoginSignUp />} />
                <Route
                    exact
                    path="/order/:id"
                    element={
                        <ProtectedRoute>
                            <OrderDetails />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
