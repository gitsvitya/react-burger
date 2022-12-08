import React from 'react';
import biStyles from './BurgerIngredients.module.css';
import {Tab, Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import apiPropTypes from "../../utils/propTypes";

function BurgerIngredients( {data} ) {

  const [current, setCurrent] = React.useState('one')

  const handleScroll = (id) => {
    setCurrent(id);
    document.querySelector(`#${id}`)?.scrollIntoView({behavior: "smooth"})
  }

  return (
    <section className={biStyles.section}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={biStyles.tabHolder}>
        <Tab value={'one'} active={current === 'one'} onClick={handleScroll}>Булки</Tab>
        <Tab value={'two'} active={current === 'two'} onClick={handleScroll}>Соусы</Tab>
        <Tab value={'three'} active={current === 'three'} onClick={handleScroll}>Начинки</Tab>
      </div>
      <div className={biStyles.ingredients}>
        <div className={biStyles.ingredientsParts}>
          <h2 className='text text_type_main-medium' id='one'>Булки</h2>
          <ul className={biStyles.list}>
            {data.map((ingredient) => {
              if (ingredient.type === 'bun') {
                return (
                  <li className={biStyles.listItem} key={ingredient._id}>
                    <img src={ingredient.image} alt={ingredient.name}/>
                    <Counter count={1} size='default' extraClass={biStyles.counter}/>
                    <div className={biStyles.priceContainer}>
                      <p className='text text_type_digits-default'>{ingredient.price}</p>
                      <CurrencyIcon type='primary'/>
                    </div>
                    <p className='text text_type_main-default'>{ingredient.name}</p>
                  </li>
                )
              }
            })}
          </ul>
        </div>
        <div className={biStyles.ingredientsParts}>
          <h2 className='text text_type_main-medium' id='two'>Соусы</h2>
          <ul className={biStyles.list}>
            {data.map((ingredient) => {
              if (ingredient.type === 'sauce') {
                return (
                  <li className={biStyles.listItem} key={ingredient._id}>
                    <img src={ingredient.image} alt={ingredient.name}/>
                    <Counter count={1} size='default' extraClass={biStyles.counter}/>
                    <div className={biStyles.priceContainer}>
                      <p className='text text_type_digits-default'>{ingredient.price}</p>
                      <CurrencyIcon type='primary'/>
                    </div>
                    <p className='text text_type_main-default'>{ingredient.name}</p>
                  </li>
                )
              }
            })}
          </ul>
        </div>
        <div className={biStyles.ingredientsParts}>
          <h2 className='text text_type_main-medium' id='three'>Начинки</h2>
          <ul className={biStyles.list}>
            {data.map((ingredient) => {
              if (ingredient.type === 'main') {
                return (
                  <li className={biStyles.listItem} key={ingredient._id}>
                    <img src={ingredient.image} alt={ingredient.name}/>
                    <Counter count={1} size='default' extraClass={biStyles.counter}/>
                    <div className={biStyles.priceContainer}>
                      <p className='text text_type_digits-default'>{ingredient.price}</p>
                      <CurrencyIcon type='primary'/>
                    </div>
                    <p className='text text_type_main-default'>{ingredient.name}</p>
                  </li>
                )
              }
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(apiPropTypes).isRequired,
}

export default BurgerIngredients;
