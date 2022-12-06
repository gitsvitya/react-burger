import React from 'react';
import bcStyles from './BurgerConstructor.module.css';
import {ConstructorElement, Button, DragIcon, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import data from '../../utils/data.js';
import listBorderPic from '../../images/illustration.svg'

function BurgerConstructor() {
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
        <Button type='primary' size='large' htmlType='button'>Оформить заказ</Button>
      </div>
    </section>
  )
}

export default BurgerConstructor
