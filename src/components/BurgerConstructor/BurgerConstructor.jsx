import React from 'react';
import bcStyles from './BurgerConstructor.module.css';
import {ConstructorElement, Button, DragIcon, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import listBorderPic from '../../images/illustration.svg'
import Modal from '../Modal/Modal.jsx';
import OrderDetails from '../OrderDetails/OrderDetails.jsx';
import {useDispatch, useSelector} from "react-redux";

function BurgerConstructor() {

  const burgerInnerIngredients = useSelector(state => state.burgerConstructorReducer);

  const [orderDetailsOpened, openOrderDetails] = React.useState(false);
  const [finalPrice, setFinalPrice] = React.useState();
  const [orderData, setOrderData] = React.useState();

  // const numberOrderInfo = {
  //   "ingredients": [
  //     burgerInnerIngredients.bun._id,
  //     ...burgerInnerIngredients.ingredients.map((ingredient) => ingredient._id),
  //     burgerInnerIngredients.bun._id
  //   ]
  // };

  function openModal() {
    openOrderDetails(true);
    // getOrderData(numberOrderInfo, setOrderData);
  }

  function closeModal() {
    openOrderDetails(false);
    setOrderData(null);
  }

  React.useEffect(() => {
    let finalPrice = 0;
    finalPrice = burgerInnerIngredients.bun.price * 2;
    burgerInnerIngredients.ingredients.map((ingredient) => {
      finalPrice = finalPrice + ingredient.price;
    }, [burgerInnerIngredients.ingredients])
    setFinalPrice(finalPrice);
  }, [burgerInnerIngredients]);

  return (
    <section className={bcStyles.section}>
      <div className={bcStyles.bunConstructorList}>
        <div className={bcStyles.listBorder}>
          <ConstructorElement
            text={burgerInnerIngredients.bun.name ? `${burgerInnerIngredients.bun.name} (верх)` : 'Выберите булку'}
            thumbnail={burgerInnerIngredients.bun.image_mobile ? burgerInnerIngredients.bun.image_mobile : listBorderPic}
            price={burgerInnerIngredients.bun.price}
            type='top'
            isLocked={true}
          />
        </div>

        <ul className={`${bcStyles.ingredientsList} pt-4 pb-0 pr-0 pl-0`}>
          {
            burgerInnerIngredients.ingredients.map((ingredient) => {
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
            text={burgerInnerIngredients.bun.name ? `${burgerInnerIngredients.bun.name} (низ)` : 'Выберите булку'}
            thumbnail={burgerInnerIngredients.bun.image_mobile ? burgerInnerIngredients.bun.image_mobile : listBorderPic}
            price={burgerInnerIngredients.bun.price}
            type='bottom'
            isLocked={true}
          />
        </div>

      </div>

      <div className={`${bcStyles.orderResultContainer} pt-10 pr-4`}>
        <div className={bcStyles.priceSum}>
          <p className='text text_type_digits-medium'>{finalPrice ? finalPrice : 0}</p>
          <CurrencyIcon type='primary'/>
        </div>
        <Button type='primary' size='large' htmlType='button' onClick={openModal}>Оформить заказ</Button>
      </div>

      {orderDetailsOpened && orderData &&
        <Modal closeModal={closeModal}>
          <OrderDetails receivedOrderNumber={orderData.order.number}/>
        </Modal>
      }
    </section>
  )
}

export default BurgerConstructor
