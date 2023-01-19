import {SET_MODAL, CLEAR_MODAL} from "../actions/IngredientItemRender";

const initialState = {
  selectedIngredient: null
}

export const ingredientItemRenderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODAL:
      return {
        ...state,
        selectedIngredient: action.payload
      }
    case CLEAR_MODAL:
      return {
        ...state,
        selectedIngredient: null
      }
    default:
      return state;
  }
}
