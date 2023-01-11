import React from "react";

const BASE_URL = 'https://norma.nomoreparties.space/api';

function checkResponse (res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
}

export const getIngredientsData = (setData) => {
fetch(`${BASE_URL}/ingredients`)
  .then(res => checkResponse(res))
  .then(json => setData(json.data))
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  })
}

export const getOrderData = (orderSentData, setOrderData) => {


  fetch (`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(orderSentData)
  })
    .then(res => checkResponse(res))
    .then(receivedData => {
      setOrderData(receivedData);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
}
