import React from 'react';
import biStyles from './BurgerIngredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientItemRender from '../IngredientItemRender/IngredientItemRender.jsx';
import {useSelector} from "react-redux";
import {useInView} from "react-intersection-observer";

function BurgerIngredients() {

  const [currentTab, setCurrentTab] = React.useState('one')

  const ingredientData = useSelector(state => state.burgerIngredientsReducer.burgerIngredients);

  const [bunRef, bunInView] = useInView({
    threshold: 0.1
  });
  const [sauceRef, sauceInView] = useInView({
    threshold: 0.1
  });
  const [mainRef, mainInView] = useInView({
    threshold: 0.1
  });

  const scrollToBun = (id) => {
    setCurrentTab(id);
    bunRef.current.scrollIntoView({behavior: 'smooth'})
  }
  const scrollToSause = (id) => {
    setCurrentTab(id);
    sauceRef.current.scrollIntoView({behavior: 'smooth'})
  }

  const scrollToMain = (id) => {
    setCurrentTab(id);
    mainRef.current.scrollIntoView({behavior: 'smooth'})
  }

  const handleIngredientScroll = () => {
    switch (true) {
      case bunInView:
        setCurrentTab('bun');
        break;
      case sauceInView:
        setCurrentTab('sauce');
        break;
      case mainInView:
        setCurrentTab('mains');
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    handleIngredientScroll();
  }, [bunInView, sauceInView, mainInView]);

  return (
    <section className={`${biStyles.section} pt-10`}>
      <h1 className='text text_type_main-large'>Соберите бургер</h1>
      <div className={`${biStyles.tabHolder} pt-5`}>
        <Tab value={'bun'} active={currentTab === 'bun'} onClick={scrollToBun}>Булки</Tab>
        <Tab value={'sauce'} active={currentTab === 'sauce'} onClick={scrollToSause}>Соусы</Tab>
        <Tab value={'mains'} active={currentTab === 'mains'} onClick={scrollToMain}>Начинки</Tab>
      </div>
      <div className={biStyles.ingredients}>
        <div className={`pt-10 pb-5`}>
          <h2 className='text text_type_main-medium' ref={bunRef}>Булки</h2>
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
          <h2 className='text text_type_main-medium' ref={sauceRef}>Соусы</h2>
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
          <h2 className='text text_type_main-medium' ref={mainRef}>Начинки</h2>
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
