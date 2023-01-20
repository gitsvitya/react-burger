import {
  BURGER_CONSTRUCTOR_ADD,
  BURGER_CONSTRUCTOR_DELETE,
  BURGER_CONSTRUCTOR_CLEAR,
  BURGER_CONSTRUCTOR_SORT,
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
    case BURGER_CONSTRUCTOR_SORT:
      const ingredientsList = [...state.ingredients]
      ingredientsList.splice(action.hoverIndex, 0, ingredientsList.splice(action.dragIndex, 1)[0])
      return {
        ...state,
        ingredients: ingredientsList
      }
    default:
      return state;
  }
}
