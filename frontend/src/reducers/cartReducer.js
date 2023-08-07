import {
  ADD_TO_CART,
  CLEAR_ERRORS,
  ADD_TO_CART_FAIL,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] , shippingInfo : {}}, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const currItem = action.payload;
      // checking that given is already in cart or not
      const isProductExist = state.cartItems.findIndex(
        (item) => item.product_id === currItem.product_id
      );

      if (isProductExist !== -1) {
        state.cartItems[isProductExist] = currItem;
      } else {
        state.cartItems.push(currItem);
      }

      return {
        ...state,
        cartItems: state.cartItems,
      };

    case REMOVE_CART_ITEM:
      const product_id = action.product_id;

      state.cartItems = state.cartItems.filter(
        (item) => item.product_id !== product_id
      );

      return {
        ...state,
        cartItems: state.cartItems,
      };

	case SAVE_SHIPPING_INFO : 
	  return {
		...state ,
		shippingInfo : action.payload,
	  }

    case ADD_TO_CART_FAIL:
      return {
        error: action.payload,
      };

    // clear all the errors
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
