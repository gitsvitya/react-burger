import React from 'react';
import ingredientItemRenderStyles from './IngredientItemRender.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import apiPropTypes from '../../utils/propTypes.js';
import {BurgerConstructorContext} from '../../services/burgerCunstructorContext';

// Компонент, объединивший в себе рендер ингридиента в соответствии с данными из получаемого API.
// Помимо оптимизации кода позволяет подтягивать подтягивать в модальное окно актуальные данные каждого ингредиента.
function IngredientItemRender({data}) {

  const [ingredientDetailsOpen, ingredientDetailsOpened] = React.useState(false)
  const {burgerDispatch} = React.useContext(BurgerConstructorContext);

  function openModal() {
    ingredientDetailsOpened(true);
    burgerDispatch({
      type: 'add',
      payload: data
    })
  }

  function closeModal() {
    ingredientDetailsOpened(false);
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
          <IngredientDetails data={data} />
        </Modal>
      }
    </>
  )
}

IngredientItemRender.propTypes = {
  data: apiPropTypes.isRequired
};

export default IngredientItemRender;
