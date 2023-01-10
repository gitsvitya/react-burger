import React from 'react';
import biStyles from './BurgerIngredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientItemRender from '../IngredientItemRender/IngredientItemRender.jsx';
import {BurgerIngredientsContext} from "../../services/burgerIngredientsContext";


function BurgerIngredients() {

  const [current, setCurrent] = React.useState('one')

  const ingredientData = React.useContext(BurgerIngredientsContext);

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
            {ingredientData.map((ingredient) => {
              if (ingredient.type === 'bun') {
                return (
                  <IngredientItemRender data={ingredient} key={ingredient._id}/>
                )
              }
            })}
          </ul>
        </div>
        <div className={`pt-10 pb-5`}>
          <h2 className='text text_type_main-medium' id='two'>Соусы</h2>
          <ul className={`${biStyles.list} pt-6`}>
            {ingredientData.map((ingredient) => {
              if (ingredient.type === 'sauce') {
                return (
                  <IngredientItemRender data={ingredient} key={ingredient._id}/>
                )
              }
            })}
          </ul>
        </div>
        <div className={`pt-10 pb-5`}>
          <h2 className='text text_type_main-medium' id='three'>Начинки</h2>
          <ul className={`${biStyles.list} pt-6`}>
            {ingredientData.map((ingredient) => {
              if (ingredient.type === 'main') {
                return (
                  <IngredientItemRender data={ingredient} key={ingredient._id}/>
                )
              }
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default BurgerIngredients;
