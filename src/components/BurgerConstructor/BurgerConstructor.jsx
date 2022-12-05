import React from 'react';
import bcStyles from './BurgerConstructor.module.css';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data.js';
import listBorderPic from '../../images/illustration.svg'

function BurgerConstructor() {
  return (
    <section className={bcStyles.section}>
      <ul className={bcStyles.list}>
        <li className={bcStyles.listBorder}>
          <ConstructorElement
            text = 'Краторная булка N-200i (верх)'
            thumbnail = { listBorderPic }
            price = {20}
            type = 'top'
            isLocked = {true}
          />
        </li>

          {
            data.map((ingredient) => {
              if(ingredient.type !== 'bun') {
                return (
                  <li className = { bcStyles.item } key = { ingredient._id }>
                    <div className = { bcStyles.dragIcon }>
                      <DragIcon type = 'primary' />
                    </div>
                    <ConstructorElement
                      text = {ingredient.name}
                      thumbnail = {ingredient.image_mobile}
                      price = {ingredient.price}
                    />
                  </li>
                )
              }
            })
          }

        <li className = {bcStyles.listBorder}>
          <ConstructorElement
            text = 'Краторная булка N-200i (низ)'
            thumbnail = { listBorderPic }
            price = {20}
            type = 'bottom'
            isLocked = {true}
          />
        </li>
      </ul>

      <div className = {bcStyles.orderResultContainer}>
        <div className = {bcStyles.priceSum}>
          <p className = 'text text_type_digits-medium'>610</p>
          <div className = {bcStyles.currencyIcon}>
            <CurrencyIcon type = 'primary'/>
          </div>
        </div>
        <Button type = 'primary' size = 'large' htmlType = 'button'>Оформить заказ</Button>
      </div>
    </section>
  )
}

export default BurgerConstructor
