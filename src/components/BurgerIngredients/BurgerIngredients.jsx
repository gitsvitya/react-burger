import biStyles from './BurgerIngredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientItemRender from '../IngredientItemRender/IngredientItemRender';
import React from 'react';
import {useSelector} from 'react-redux';
import {useInView} from 'react-intersection-observer';
import {mergeRefs} from "react-merge-refs";

function BurgerIngredients() {

  const [currentTab, setCurrentTab] = React.useState('bun');

  const ingredientData = useSelector(state => state.burgerIngredientsReducer.burgerIngredients);

  const [bunRef, bunInView] = useInView({
    threshold: 0.5
  });
  const [sauceRef, sauceInView] = useInView({
    threshold: 0.5
  });
  const [mainRef, mainInView] = useInView({
    threshold: 0.5
  });

  const scrollToBunRef = React.useRef();
  const scrollToSauceRef = React.useRef();
  const scrollToMainRef = React.useRef();

  const scrollToBun = (id) => {
    setCurrentTab(id);
    scrollToBunRef.current.scrollIntoView({behavior: 'smooth'});
  };
  const scrollToSauce = (id) => {
    setCurrentTab(id);
    scrollToSauceRef.current.scrollIntoView({behavior: 'smooth'});
  };
  const scrollToMain = (id) => {
    setCurrentTab(id);
    scrollToMainRef.current.scrollIntoView({behavior: 'smooth'});
  };

  const handleIngredientScroll = () => {
    switch (true) {
      case bunInView:
        setCurrentTab('bun');
        break;
      case sauceInView:
        setCurrentTab('sauce');
        break;
      case mainInView:
        setCurrentTab('main');
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
        <Tab value='bun' active={currentTab === 'bun'} onClick={scrollToBun}>Булки</Tab>
        <Tab value='sauce' active={currentTab === 'sauce'} onClick={scrollToSauce}>Соусы</Tab>
        <Tab value='main' active={currentTab === 'main'} onClick={scrollToMain}>Начинки</Tab>
      </div>
      <div className={biStyles.ingredients}>
        <div className={`pt-10 pb-5`}>
          <h2 className='text text_type_main-medium' ref={mergeRefs([bunRef, scrollToBunRef])}>Булки</h2>
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
          <h2 className='text text_type_main-medium' ref={mergeRefs([sauceRef, scrollToSauceRef])}>Соусы</h2>
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
          <h2 className='text text_type_main-medium' ref={mergeRefs([mainRef, scrollToMainRef])}>Начинки</h2>
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
  );
}

export default BurgerIngredients;
