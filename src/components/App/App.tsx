import React from 'react';
import appStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader.jsx';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.jsx';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
const api = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch(api)
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject('Ошибка: ${res.status}')
        })
      .then(json => setData(json.data))
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
    }, []
  )

  return (
    <div className={appStyles.page}>
      <AppHeader/>
      <main className={appStyles.main}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor data={data}/>
      </main>
    </div>
  );
}

export default App;
