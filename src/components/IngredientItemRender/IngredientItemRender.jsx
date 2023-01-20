import React from 'react';
import ingredientItemRenderStyles from './IngredientItemRender.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import apiPropTypes from '../../utils/propTypes.js';
import { useSelector, useDispatch } from 'react-redux';
import {SET_MODAL, CLEAR_MODAL} from "../../services/actions/IngredientItemRender";
import { useDrag } from 'react-dnd';

function IngredientItemRender({data}) {

  const dispatch = useDispatch();
  const selectedIngredient = useSelector(state => state.ingredientItemRenderReducer.selectedIngredient);
  const addedBurgerIngredients = useSelector(state => state.burgerConstructorReducer);

  const [ingredientDetailsOpen, ingredientDetailsOpened] = React.useState(false)

  function openModal() {
    ingredientDetailsOpened(true);
    dispatch({ type: SET_MODAL, payload: data });
  }

  function closeModal() {
    ingredientDetailsOpened(false);
    dispatch({ type: CLEAR_MODAL});
  }

  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: data,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  const ingredientsCounter = React.useMemo(() => {
    if (addedBurgerIngredients.bun === false)
      return 0;
    return data.type === 'bun' && data._id === addedBurgerIngredients.bun._id
    ? 2
      : addedBurgerIngredients.ingredients.filter((item) => item._id === data._id).length;
  }, [addedBurgerIngredients.ingredients, addedBurgerIngredients.bun, data]);

  return (
    <>
      <li className={ingredientItemRenderStyles.listItem} key={data._id} onClick={openModal} ref={dragRef}>
        <img src={data.image} alt={data.name} style={{opacity}}/>
        {ingredientsCounter>0 && <Counter count={ingredientsCounter} size='default' extraClass={ingredientItemRenderStyles.counter}/>}
        <div className={ingredientItemRenderStyles.priceContainer}>
          <p className='text text_type_digits-default'>{data.price}</p>
          <CurrencyIcon type='primary'/>
        </div>
        <p className='text text_type_main-default'>{data.name}</p>
      </li>
      {
        ingredientDetailsOpen &&
        <Modal closeModal={closeModal}>
          <IngredientDetails data={selectedIngredient} />
        </Modal>
      }
    </>
  )
}

IngredientItemRender.propTypes = {
  data: apiPropTypes.isRequired
};

export default IngredientItemRender;
