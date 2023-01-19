import {BURGER_CONSTRUCTOR_CLEAR} from './BurgerConstructor';

export const GET_ORDER_DETAILS_REQUEST = 'GET_ORDER_DETAILS_REQUEST';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILED = 'GET_ORDER_DETAILS_FAILED';

export const getOrderNumber = (numberOrderInfo, setOrderData) => {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_DETAILS_REQUEST
    })
    return fetch('https://norma.nomoreparties.space/api/orders', {
      method: 'POST',
      headers: {

        'Content-Type': 'application/json',
      },
      body: JSON.stringify(numberOrderInfo)
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`)
        }
      })
      .then((res) => {
        if (res.success) {
          dispatch({
            type: GET_ORDER_DETAILS_SUCCESS,
            payload: res.order
          })

          setOrderData(res.order.number)

          dispatch({
            type: BURGER_CONSTRUCTOR_CLEAR
          })
        }
        else {
          return Promise.reject(`Ошибка ${res.status}`);
        }
      })
      .catch(
        dispatch({
          type: GET_ORDER_DETAILS_FAILED
        })
      )
  }
}
