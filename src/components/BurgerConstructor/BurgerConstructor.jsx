import React from 'react';
import bcStyles from './BurgerConstructor.module.css';
import {ConstructorElement, Button, DragIcon, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import listBorderPic from '../../images/illustration.svg'
import Modal from '../Modal/Modal.jsx';
import OrderDetails from '../OrderDetails/OrderDetails.jsx';
import {useDispatch, useSelector} from "react-redux";
import {getOrderNumber} from "../../services/actions/OrderDetails";
import {v4 as uuidv4} from 'uuid';
import {BURGER_CONSTRUCTOR_ADD} from '../../services/actions/BurgerConstructor';
import { useDrop } from 'react-dnd';
import DndIngredientsConstructor from "../DndIngredientsConstructor/DndIngredientsConstructor";

function BurgerConstructor() {

  const dispatch = useDispatch();

  const burgerInnerIngredients = useSelector(state => state.burgerConstructorReducer);
  const numberOrderInfo = useSelector(state => state.orderDetailsReducer.orderNumber);

  const [orderDetailsOpened, openOrderDetails] = React.useState(false);
  const [finalPrice, setFinalPrice] = React.useState();
  const [orderData, setOrderData] = React.useState();

  const dndIngredients = React.useMemo(() => burgerInnerIngredients.ingredients.filter((ingredient) =>
  ingredient.type !== 'bun'), [burgerInnerIngredients.ingredients]);

  const burgerConstructor = {
    "ingredients": [
      burgerInnerIngredients.bun._id,
      ...burgerInnerIngredients.ingredients.map((ingredient) => ingredient._id),
      burgerInnerIngredients.bun._id
    ]
  };

  const [{isHover}, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch ({
        type: BURGER_CONSTRUCTOR_ADD,
        payload: { ...item, key: uuidv4()}
      })
    },
  });

  function openModal() {
    openOrderDetails(true);
    dispatch(getOrderNumber(burgerConstructor, setOrderData));
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
    <section className={bcStyles.section} ref={dropTarget}>
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
            dndIngredients.map((ingredient, index) => {
              return (
                <DndIngredientsConstructor key={ingredient.key} ingredient={ingredient} index={index} />
              )
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
          <OrderDetails receivedOrderNumber={numberOrderInfo.number}/>
        </Modal>
      }
    </section>
  )
}

export default BurgerConstructor
