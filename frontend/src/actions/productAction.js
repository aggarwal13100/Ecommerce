import {
    // for single product page
    PRODUCT_DETAILS_REQUESTS,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants';
import axios from 'axios';


export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type : PRODUCT_DETAILS_REQUESTS,
        });

        const { data } = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type : PRODUCT_DETAILS_SUCCESS,
            payload : data.product, 
        });

    } catch (error) {
        dispatch({
            type : PRODUCT_DETAILS_FAIL,
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