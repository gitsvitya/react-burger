import React from 'react';
import bcStyles from './BurgerConstructor.module.css';
import {ConstructorElement, Button, DragIcon, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import listBorderPic from '../../images/illustration.svg'
import PropTypes from 'prop-types';
import apiPropTypes from "../../utils/propTypes.js";
import Modal from '../Modal/Modal.jsx';
import OrderDetails from '../OrderDetails/OrderDetails.jsx';


// Создаем функциональную компоненту BurgerConstructor, которая отвечает за формирование заказа бургера
// исходя из выбранных ингредиентов, а также позволяет инициировать создание заказа при нажатии на
// кнопку 'Оформить заказ'. Принимает на вход данные об ингредиентах из API.
function BurgerConstructor({data}) {

  // Создаем хук для проверки статуса модального окна. При нажатии на кнопку "Оформить заказ" рендерим
  // модальное окно с данными из OrderDetails

  const [OrderDetailsOpened, openOrderDetails] = React.useState(false);

  function openModal() {
    openOrderDetails(true);
  }

  function closeModal() {
    openOrderDetails(false);
  }

  // Рендерим контент из 2 булок и ингридиентов из API
  return (
    <section className={bcStyles.section}>

      <div className={bcStyles.bunConstructorList}>

        <div className={bcStyles.listBorder}>
          <ConstructorElement
            text='Краторная булка N-200i (верх)'
            thumbnail={listBorderPic}
            price={20}
            type='top'
            isLocked={true}
          />
        </div>

        <ul className={bcStyles.ingredientsList}>
          {
            data.map((ingredient) => {
              if (ingredient.type !== 'bun') {
                return (
                  <li className={bcStyles.listItem} key={ingredient._id}>
                    <DragIcon type='primary'/>
                    <ConstructorElement
                      text={ingredient.name}
                      thumbnail={ingredient.image_mobile}
                      price={ingredient.price}
                    />
                  </li>
                )
              }
            })
          }
        </ul>

        <div className={bcStyles.listBorder}>
          <ConstructorElement
            text='Краторная булка N-200i (низ)'
            thumbnail={listBorderPic}
            price={20}
            type='bottom'
            isLocked={true}
          />
        </div>

      </div>

      <div className={bcStyles.orderResultContainer}>
        <div className={bcStyles.priceSum}>
          <p className='text text_type_digits-medium'>610</p>
          <CurrencyIcon type='primary'/>
        </div>
        <Button type='primary' size='large' htmlType='button' onClick={openModal}>Оформить заказ</Button>
      </div>

      {OrderDetailsOpened &&
        <Modal closeModal={closeModal}>
          <OrderDetails closeModal={closeModal}/>
        </Modal>
      }
    </section>
  )
}

// Проверяем данные, принимаемые BurgerConstructor, на соответствие форматам
BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(apiPropTypes).isRequired,
}

export default BurgerConstructor
