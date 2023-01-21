export const GET_BURGER_INGREDIENTS = 'GET_BURGER_INGREDIENTS';
export const GET_BURGER_INGREDIENTS_SUCCESS = 'GET_BURGER_INGREDIENTS_SUCCESS';
export const GET_BURGER_INGREDIENTS_FAILED = 'GET_BURGER_INGREDIENTS_FAILED';

export const getBurgerIngredientsDataFromApi = () => {
  return function (dispatch) {
    dispatch({
      type: GET_BURGER_INGREDIENTS
    });
    return fetch(`https://norma.nomoreparties.space/api/ingredients`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .then((res) => {
        if (res) {
          dispatch({
            type: GET_BURGER_INGREDIENTS_SUCCESS,
            payload: res.data
          });
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch(() => {
        dispatch({
          type: GET_BURGER_INGREDIENTS_FAILED
        })
      })
  };
}
