import orderDetailsStyles from './OrderDetails.module.css';
import donePic from '../../images/done.svg';
import React from "react";
import {BurgerConstructorContext} from "../../services/burgerCunstructorContext";

function OrderDetails({receivedOrderNumber}) {

  const {burgerDispatch} = React.useContext(BurgerConstructorContext);

  React.useEffect(() => {
    burgerDispatch({type: 'clear'})
  }, [receivedOrderNumber]);

  return (
    <div className={orderDetailsStyles.container}>
      <h3 className={`${orderDetailsStyles.header} text text_type_digits-large`}>{ receivedOrderNumber ? receivedOrderNumber : 'Загрузка...'}</h3>
      <p className={`text text_type_main-medium pt-8`}>идентификатор заказа</p>
      <div className={orderDetailsStyles.donePic}>
        <img src={donePic} alt='Успех!'></img>
      </div>
      <p className={`${orderDetailsStyles.deliveryStatusParagraph} text text_type_main-default`}>Ваш заказ начали
        готовить</p>
      <p
        className={`${orderDetailsStyles.waitForYouOrderParagraph} text text_type_main-default text_color_inactive pt-2`}>Дождитесь
        готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails
