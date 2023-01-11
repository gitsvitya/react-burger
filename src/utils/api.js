import React from "react";
import {checkResponse} from "./checkResponse.js";

const BASE_URL = 'https://norma.nomoreparties.space/api';

function request(url, options) {
  return fetch(url, options).then(checkResponse)
}

export const getIngredientsData = (setData) => {
  request(`${BASE_URL}/ingredients`)
    .then(json => setData(json.data))
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
}

export const getOrderData = (orderSentData, setOrderData) => {
  request(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(orderSentData)
  })
    .then(res => {
      setOrderData(res);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
}
