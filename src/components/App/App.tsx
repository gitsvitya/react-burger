import React from 'react';
import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import { BurgerConstructorContext } from "../../services/burgerCunstructorContext";
import { BurgerIngredientsContext } from "../../services/burgerIngredientsContext";
import {getIngredientsData} from "../../utils/api";

function App() {

  const burgerInitialState = {
    bun: [],
    ingredients: []
  };

  function reducer(state: any, action: any) {
    switch (action.type) {
      case 'add':
        if(action.payload.type === 'bun') {
          return {
            ...state,
            bun: action.payload,
          };
        }
          return {
            ...state,
            ingredients: [...state.ingredients, action.payload]
          };
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
        }
    }

  const [burgerState, burgerDispatch] = React.useReducer(reducer, burgerInitialState);

  const [dataFromApi, setDataFromApi] = React.useState([]);

  React.useEffect(() => {
    getIngredientsData(setDataFromApi);
    }, []
  )

  return (
    <div className={appStyles.page}>
      <AppHeader/>
      <main className={appStyles.main}>
        <BurgerIngredientsContext.Provider value={ dataFromApi }>
          <BurgerConstructorContext.Provider value={ {burgerState, burgerDispatch} }>
            <BurgerIngredients />
            <BurgerConstructor />
          </BurgerConstructorContext.Provider>
        </BurgerIngredientsContext.Provider>
      </main>
    </div>
  );
}

export default App;
