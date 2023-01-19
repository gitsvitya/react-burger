import React from 'react';
import ingredientItemRenderStyles from './IngredientItemRender.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import apiPropTypes from '../../utils/propTypes.js';
import { useSelector, useDispatch } from 'react-redux';
import {SET_MODAL, CLEAR_MODAL} from "../../services/actions/IngredientItemRender";

function IngredientItemRender({data}) {

  const dispatch = useDispatch();
  const selectedIngredient = useSelector(state => state.ingredientItemRenderReducer.selectedIngredient);
  const [ingredientDetailsOpen, ingredientDetailsOpened] = React.useState(false)

  function openModal() {
    ingredientDetailsOpened(true);
    dispatch({ type: SET_MODAL, payload: data });
  }

  function closeModal() {
    ingredientDetailsOpened(false);
    dispatch({ type: CLEAR_MODAL});
  }

  return (
    <>
      <li className={ingredientItemRenderStyles.listItem} key={data._id} onClick={openModal}>
        <img src={data.image} alt={data.name}/>
        <Counter count={1} size='default' extraClass={ingredientItemRenderStyles.counter}/>
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
