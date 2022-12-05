import React from 'react';
import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'

function App() {
  return (
    <div className={appStyles.page}>
      <AppHeader/>
      <main className={appStyles.main}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </main>
    </div>
  );
}

export default App;
