import orderDetailsStyles from './OrderDetails.module.css';
import donePic from '../../images/done.svg';

// Создаем компонент OrderDetails для заполнения модального окна контентом подтверждения заказа
function OrderDetails() {
  return (
    <>
      <div className={orderDetailsStyles.container}>
        <h1 className={`${orderDetailsStyles.header} text text_type_digits-large`}>034536</h1>
        <p className={`${orderDetailsStyles.idParagraph} text text_type_main-medium`}>идентификатор заказа</p>
        <div className={orderDetailsStyles.donePic}>
          <img src={donePic} alt="done"></img>
        </div>
        <p className={`${orderDetailsStyles.deliveryStatusParagraph} text text_type_main-default`}>Ваш заказ начали
          готовить</p>
        <p
          className={`${orderDetailsStyles.waitForYouOrderParagraph} text text_type_main-default text_color_inactive`}>Дождитесь
          готовности на орбитальной станции</p>
      </div>
    </>
  )
}

export default OrderDetails
