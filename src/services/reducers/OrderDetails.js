import {GET_ORDER_DETAILS_REQUEST, GET_ORDER_DETAILS_SUCCESS, GET_ORDER_DETAILS_FAILED} from '../actions/OrderDetails';

const initialState = {
  orderNumber: '',
  orderRequest: false,
  orderNumberError: false
};

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_DETAILS_REQUEST:
      return {
        ...state,
        orderRequest: true,
        orderNumberError: false
      };
    case GET_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        orderNumber: action.payload,
        orderRequest: false
      };
    case GET_ORDER_DETAILS_FAILED:
      return {
        ...state,
        orderRequest: false,
        orderNumberError: true
      };
    default:
      return state;
  }
};
