import {
    ADD_TO_CART,
    CLEAR_ERRORS,
    ADD_TO_CART_FAIL,
    REMOVE_CART_ITEM,
  } from "../constants/cartConstants";

import axios from 'axios';

export const addToCartItems = (product_id , quantity) => async (dispatch , getState) => {
    try {

        const { data } = await axios.get(`/api/v1/product/${product_id}`);

        const item = {
            product_id : data.product._id,
            quantity : quantity,
            name : data.product.name ,
            stock : data.product.Stock,
            price : data.product.price,
            image : data.product.images[0],
        }

        dispatch({
            type : ADD_TO_CART,
            payload : item, 
        });

        // storing the cart data into the local Storage
        localStorage.setItem("cartItems" , JSON.stringify(getState().cart.cartItems));

    } catch (error) {
        dispatch({
            type : ADD_TO_CART_FAIL,
            payload : error.response.data.message,
        });    
    }
}
export const removeFromCartItems = (product_id ) => async (dispatch , getState) => {
    try {
        dispatch({
            type : REMOVE_CART_ITEM,
            product_id : product_id, 
        });

        // storing the cart data into the local Storage
        localStorage.setItem("cartItems" , JSON.stringify(getState().cart.cartItems));

    } catch (error) {
        dispatch({
            type : ADD_TO_CART_FAIL,
            payload : error.response.data.message,
        });    
    }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type : CLEAR_ERRORS
    }); 
}