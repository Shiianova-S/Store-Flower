import {
  ADD_ITEM_CART,
  DELETE_ITEM_CART,
  INCREMENT_ITEM_COUNT_CART,
  DECREMENT_ITEM_COUNT_CART,
  CLEAR_CART,
} from "../actionType/cartActionType";

//* Добавить товар в корзину
export const addItemToCart = (payload) => ({
  type: ADD_ITEM_CART,
  payload: payload,
});

//* Удалить товар из корзины
export const DeleteItemToCart = (id) => ({
  type: DELETE_ITEM_CART,
  payload: id,
});

//* Увеличить колличество товара в корзине
export const incrementItemToCart = (id) => ({
  type: INCREMENT_ITEM_COUNT_CART,
  payload: id,
});

//* Уменьшить колличество товара в корзине
export const decrementItemToCart = (id) => ({
  type: DECREMENT_ITEM_COUNT_CART,
  payload: id,
});

//* Очистить корзину
export const clearCart = () => ({
  type: CLEAR_CART,
});
