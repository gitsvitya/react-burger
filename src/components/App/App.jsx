import React from 'react';
import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import {getBurgerIngredientsData} from '../../services/actions/BurgerIngredients';
import {useDispatch} from 'react-redux';

function App() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getBurgerIngredientsData());
  }, []);

  return (
    <div className={appStyles.page}>
      <AppHeader/>
      <main className={appStyles.main}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </main>
    </div>
  )
}

export default App;
