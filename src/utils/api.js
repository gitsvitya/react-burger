const ingredientsDataLink = 'https://norma.nomoreparties.space/api/ingredients';
const ordersDataLink = 'https://norma.nomoreparties.space/api/orders';

export const getIngredientsData = (setData) => {
fetch(ingredientsDataLink)
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject('Ошибка: ${res.status}')
  })
  .then(json => setData(json.data))
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })
}
