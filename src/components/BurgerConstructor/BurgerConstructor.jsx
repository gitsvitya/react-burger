import React from 'react';
import bcStyles from './BurgerConstructor.module.css';
import {ConstructorElement, Button, DragIcon, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import listBorderPic from '../../images/illustration.svg'
import Modal from '../Modal/Modal.jsx';
import OrderDetails from '../OrderDetails/OrderDetails.jsx';
import {BurgerConstructorContext} from "../../services/burgerCunstructorContext";

function BurgerConstructor() {


  const [OrderDetailsOpened, openOrderDetails] = React.useState(false);
  const { burgerState } = React.useContext (BurgerConstructorContext);

  function openModal() {
    openOrderDetails(true);
  }

  function closeModal() {
    openOrderDetails(false);
  }

  return (
    <section className={bcStyles.section}>
      <div className={bcStyles.bunConstructorList}>
        <div className={bcStyles.listBorder}>
          <ConstructorElement
            text={burgerState.bun.name ? `${burgerState.bun.name} (верх)` : 'Выберите булку'}
            thumbnail={burgerState.bun.image_mobile ? burgerState.bun.image_mobile : listBorderPic}
            price={burgerState.bun.price}
            type='top'
            isLocked={true}
          />
        </div>

        <ul className={`${bcStyles.ingredientsList} pt-4 pb-0 pr-0 pl-0`}>
          {
            burgerState.ingredients.map((ingredient) => {
              if (ingredient.type !== 'bun') {
                return (
                  <li className={`${bcStyles.listItem} pb-4`} key={ingredient._id}>
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
            text={burgerState.bun.name ? `${burgerState.bun.name} (низ)` : 'Выберите булку'}
            thumbnail={burgerState.bun.image_mobile ? burgerState.bun.image_mobile : listBorderPic}
            price={burgerState.bun.price}
            type='bottom'
            isLocked={true}
          />
        </div>

      </div>

      <div className={`${bcStyles.orderResultContainer} pt-10 pr-4`}>
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

export default BurgerConstructor
