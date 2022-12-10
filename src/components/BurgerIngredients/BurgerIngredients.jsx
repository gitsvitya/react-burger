import React from 'react';
import biStyles from './BurgerIngredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import apiPropTypes from '../../utils/propTypes.js';
import IngredientItemRender from '../IngredientItemRender/IngredientItemRender.jsx'


function BurgerIngredients({data}) {

  const [current, setCurrent] = React.useState('one')

  const handleScroll = (id) => {
    setCurrent(id);
    document.querySelector(`#${id}`)?.scrollIntoView({behavior: 'smooth'})
  }

  return (
    <section className={`${biStyles.section} pt-10`}>
      <h1 className='text text_type_main-large'>Соберите бургер</h1>
      <div className={`${biStyles.tabHolder} pt-5`}>
        <Tab value={'one'} active={current === 'one'} onClick={handleScroll}>Булки</Tab>
        <Tab value={'two'} active={current === 'two'} onClick={handleScroll}>Соусы</Tab>
        <Tab value={'three'} active={current === 'three'} onClick={handleScroll}>Начинки</Tab>
      </div>
      <div className={biStyles.ingredients}>
        <div className={`pt-10 pb-5`}>
          <h2 className='text text_type_main-medium' id='one'>Булки</h2>
          <ul className={`${biStyles.list} pt-6`}>
            {data.map((ingredient) => {
              if (ingredient.type === 'bun') {
                return (
                  <IngredientItemRender data={ingredient}/>
                )
              }
            })}
          </ul>
        </div>
        <div className={`pt-10 pb-5`}>
          <h2 className='text text_type_main-medium' id='two'>Соусы</h2>
          <ul className={`${biStyles.list} pt-6`}>
            {data.map((ingredient) => {
              if (ingredient.type === 'sauce') {
                return (
                  <IngredientItemRender data={ingredient}/>
                )
              }
            })}
          </ul>
        </div>
        <div className={`pt-10 pb-5`}>
          <h2 className='text text_type_main-medium' id='three'>Начинки</h2>
          <ul className={`${biStyles.list} pt-6`}>
            {data.map((ingredient) => {
              if (ingredient.type === 'main') {
                return (
                  <IngredientItemRender data={ingredient}/>
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
