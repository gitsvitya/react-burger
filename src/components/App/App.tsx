import React from 'react';
import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';

function App() {
  return (
    <div className={appStyles.page}>
      <AppHeader/>
      <main className={appStyles.main}>
        <BurgerIngredients/>
      </main>
    </div>
  );
}

export default App;
