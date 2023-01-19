import {
  GET_BURGER_INGREDIENTS,
  GET_BURGER_INGREDIENTS_SUCCESS,
  GET_BURGER_INGREDIENTS_FAILED
} from "../actions/BurgerIngredients";

const initialState = {
  burgerIngredients: [],
  burgerIngredientsRequest: false,
  burgerIngredientsFailed: false
}

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BURGER_INGREDIENTS:
      return {
        ...state,
        burgerIngredientsRequest: true,
        burgerIngredientsFailed: false
      }
    case GET_BURGER_INGREDIENTS_SUCCESS:
      return {
        ...state,
        burgerIngredients: action.payload,
        burgerIngredientsFailed: false
      }
    case GET_BURGER_INGREDIENTS_FAILED:
      return {
        ...state,
        burgerIngredientsRequest: false,
        burgerIngredientsFailed: true
      }
    default:
      return state;
  }
};
