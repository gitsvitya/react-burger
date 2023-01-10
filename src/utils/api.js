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

export const getOrderData = (orderSentData, setOrderData) => {
  fetch (ordersDataLink, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(orderSentData)
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Ошибка: ${res.status}')
    })
    .then(receivedData => {
      setOrderData(receivedData);
    })
}
