import {
  BURGER_CONSTRUCTOR_ADD,
  BURGER_CONSTRUCTOR_DELETE,
  BURGER_CONSTRUCTOR_CLEAR
} from "../actions/BurgerConstructor";

const initialState = {
  bun: false,
  ingredients: []
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case BURGER_CONSTRUCTOR_ADD:
      if (action.payload.type === 'bun') {
        return {
          ...state,
          bun: action.payload
        }
      }
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      }
    case BURGER_CONSTRUCTOR_DELETE:
      return {
        ...state,
        ingredients: [...state.ingredients.filter((item) => item.key !== action.payload)]
      }
    case BURGER_CONSTRUCTOR_CLEAR:
      return {
        bun: false,
        ingredients: []
      }
    default:
      return state;
  }
}
