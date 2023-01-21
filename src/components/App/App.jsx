import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import {getBurgerIngredientsDataFromApi} from '../../services/actions/BurgerIngredients';
import React from 'react';
import {useDispatch} from 'react-redux';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

function App() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getBurgerIngredientsDataFromApi());
  }, []);

  return (
    <div className={appStyles.page}>
      <AppHeader/>
      <main className={appStyles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
