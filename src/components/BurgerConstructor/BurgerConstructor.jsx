import bcStyles from './BurgerConstructor.module.css';
import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import listBorderPic from '../../images/illustration.svg'
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import DndIngredientsConstructor from '../DndIngredientsConstructor/DndIngredientsConstructor';
import {getOrderNumber} from '../../services/actions/OrderDetails';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuid} from 'uuid';
import {useDrop} from 'react-dnd';
import {BURGER_CONSTRUCTOR_ADD} from '../../services/actions/BurgerConstructor';

function BurgerConstructor() {

  const dispatch = useDispatch();

  const data = useSelector(state => state.burgerConstructorReducer);

  const numberOrderInfo = useSelector(state => state.orderDetailsReducer.orderNumber);

  const [orderDetailsOpenedStatus, setOrderDetailsOpenedStatus] = React.useState(false);
  const [orderData, setOrderData] = React.useState();

  const [orderPrice, setOrderPrice] = React.useState();

  const dndMains = React.useMemo(() => data.ingredients.filter((ingredient) =>
    ingredient.type !== 'bun'), [data.ingredients]);

  const burgerConstructor = {
    'ingredients': [
      data.bun._id,
      ...data.ingredients.map((main) => main._id),
      data.bun._id
    ]
  };

  const [{isHover}, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredientItem) {
      dispatch({
        type: BURGER_CONSTRUCTOR_ADD,
        payload: {...ingredientItem, key: uuid()}
      });
    },
  });

  function openModal() {
    setOrderDetailsOpenedStatus(true);
    dispatch(getOrderNumber(burgerConstructor, setOrderData));
  }

  function closeModal() {
    setOrderDetailsOpenedStatus(false);
    setOrderData(null);
  }

  React.useEffect(() => {
    let orderPrice = 0;
    if (data.bun.price !== undefined) {
      orderPrice = data.bun.price * 2;
    }
    data.ingredients.map((ingredient) => {
      orderPrice = orderPrice + ingredient.price;
    }, [data.ingredients]);
    setOrderPrice(orderPrice);
  }, [data]);

  return (
    <section className={bcStyles.section} ref={dropTarget}>
      <div className={bcStyles.bunConstructorList}>
        <div className={bcStyles.listBorder}>
          <ConstructorElement
            text={data.bun.name ? `${data.bun.name} (верх)` : 'Выберите булку'}
            thumbnail={data.bun.image_mobile ? data.bun.image_mobile : listBorderPic}
            price={data.bun.price}
            type='top'
            isLocked={true}
          />
        </div>

        <ul className={`${bcStyles.ingredientsList} pt-4 pb-0 pr-0 pl-0`}>
          {
            dndMains.map((ingredient, index) => {
              return (
                <DndIngredientsConstructor key={ingredient.key} ingredient={ingredient} index={index}/>
              );
            })
          }
        </ul>

        <div className={bcStyles.listBorder}>
          <ConstructorElement
            text={data.bun.name ? `${data.bun.name} (низ)` : 'Выберите булку'}
            thumbnail={data.bun.image_mobile ? data.bun.image_mobile : listBorderPic}
            price={data.bun.price}
            type='bottom'
            isLocked={true}
          />
        </div>

      </div>

      <div className={`${bcStyles.orderResultContainer} pt-10 pr-4`}>
        <div className={bcStyles.priceSum}>
          <p className='text text_type_digits-medium'>{orderPrice ? orderPrice : 0}</p>
          <CurrencyIcon type='primary'/>
        </div>
        <Button type='primary' size='large' htmlType='button' onClick={() => !!data.bun._id ? openModal() : null}>Оформить
          заказ</Button>
      </div>

      {orderDetailsOpenedStatus && orderData &&
        <Modal closeModal={closeModal}>
          <OrderDetails receivedOrderNumber={numberOrderInfo.number}/>
        </Modal>
      }
    </section>
  );
}

export default BurgerConstructor
