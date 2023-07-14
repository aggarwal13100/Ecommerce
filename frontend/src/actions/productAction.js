import {
    // for single product page
    PRODUCT_DETAILS_REQUESTS,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
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

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_REVIEW_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.put(`/api/v1/review`, reviewData, config);
  
      dispatch({
        type: NEW_REVIEW_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: NEW_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type : CLEAR_ERRORS
    }); 
}