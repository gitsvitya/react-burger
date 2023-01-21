import {combineReducers} from 'redux';
import {burgerIngredientsReducer} from './BurgerIngredients';
import {burgerConstructorReducer} from './BurgerConstructor';
import {ingredientItemRenderReducer} from './IngredientItemRender';
import {orderDetailsReducer} from './OrderDetails';

export const rootReducer = combineReducers({
  burgerIngredientsReducer,
  burgerConstructorReducer,
  ingredientItemRenderReducer,
  orderDetailsReducer
});
