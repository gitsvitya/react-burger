import React from 'react';
import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import { BurgerConstructorContext } from "../../services/burgerCunstructorContext";
import { BurgerIngredientsContext } from "../../services/burgerIngredientsContext";
import {getIngredientsData} from "../../utils/api";

function App() {

  const [dataFromApi, setData] = React.useState([]);

  React.useEffect(() => {
    getIngredientsData(setData);
    }, []
  )

  return (
    <div className={appStyles.page}>
      <AppHeader/>
      <main className={appStyles.main}>
        <BurgerIngredientsContext.Provider value={ dataFromApi }>
            <BurgerIngredients />
        </BurgerIngredientsContext.Provider>
        <BurgerConstructorContext.Provider value={ dataFromApi }>
            <BurgerConstructor />
        </BurgerConstructorContext.Provider>
      </main>
    </div>
  );
}

export default App;
