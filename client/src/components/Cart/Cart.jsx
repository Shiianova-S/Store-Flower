import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../CartItem/CartItem";
import { clearCart } from "../../redux/actionCreate/cartActionCreate";
import { useRef } from "react";
import ModalOrder from "../Modal/ModalOrder";
import ModalError from "../Modal/ModalError";
import { v4 as uuidv4 } from "uuid";
import "./Cart.css";
import "../Modal/ModalOrder.css";

function Cart() {
  const {
    user,
    cart: { cart },
  } = useSelector((state) => state);

  const [deliveryMethod, setDeliveryMethod] = useState();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const inputDate = useRef();
  const inputStreet = useRef();
  const inputHouse = useRef();
  const inputApartment = useRef();


  //* Подсчет общей стоимости корзины
  const total = cart.reduce((sum, el) => sum + el.bouquet.price * el.count, 0);

  const sentQuery = (deliveryMethod) => {
    axios
      .post(
        `/order`,
        {
          date: inputDate.current.value,
          street: inputStreet.current?.value,
          house: inputHouse.current?.value,
          apartment: inputApartment.current?.value,
          user_id: user.user.id,
          delivery_method: deliveryMethod,
          cart: cart,
        },
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {
        if (data.success) {
          setOpen(true);
        } else {
          console.log(data.message);
          setError("Что-то пошло не так, попробуйте позже!");
        }
      })
      .catch(console.error);
  };

  //* Отправляем в бд сформированный заказ (доставка)
  const sendOrder = () => {
    if (!deliveryMethod) {
      setError("Выберите: доставка или самовывоз?");
    } else if (!inputDate.current.value) {
      setError("Введите дату!");
    } else if (
      (inputStreet.current && !inputStreet.current.value) ||
      (inputApartment.current && !inputApartment.current.value) ||
      (inputHouse.current && !inputHouse.current.value)
    ) {
      setError("Заполните все поля доставки!");
    } else {
      sentQuery(deliveryMethod);
    }
  };

  return (
    <div className="container">
      <h2 className="cart-header">Ваша корзина {!cart.length && "пуста"}</h2>
      <div className="cart-container">
        <div className="cart-list-wrapper">
          <div className="cart_item-list">
            {cart &&
              cart.map((elem) => (
                <CartItem key={elem.bouquet.id} item={elem} />
              ))}
          </div>
          {cart.length > 0 && (
            <button
              className="cart-btn-clear"
              onClick={() => dispatch(clearCart())}
            >
              Очистить корзину
            </button>
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-wrapper">
            <h3 className="cart-delivery-title">Выберите способ доставки</h3>
            <div className="cart-delivery-method-box">
              <div
                className="cart-delivery-method"
                onClick={() => setDeliveryMethod("delivery")}
              >
                Доставка
              </div>
              <div
                className="cart-delivery-method"
                onClick={() => setDeliveryMethod("pickup")}
              >
                Самовывоз
              </div>
            </div>
            {deliveryMethod === "pickup" && (
              <div className="cart-box-delivery">
                <div className="cart-delivery-time-date">
                  <input
                    className="cart-delivery-date"
                    ref={inputDate}
                    type="datetime-local"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
            )}
            {deliveryMethod === "delivery" && (
              <div className="cart-box-delivery">
                <div className="cart-delivery-time-date">
                  <input
                    className="cart-delivery-date"
                    ref={inputDate}
                    type="datetime-local"
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="cart-delivery-fild">
                  <label htmlFor="street" className="cart-delivery-label">
                    Улица
                  </label>
                  <input
                    className="cart-delivery-fild-street"
                    id="street"
                    ref={inputStreet}
                    placeholder=""
                    name="street"
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="cart-delivery-fild">
                  <label htmlFor="house" className="cart-delivery-label">
                    Дом
                  </label>
                  <input
                    className="cart-delivery-fild-house"
                    id="house"
                    ref={inputHouse}
                    placeholder=""
                    name="house"
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="cart-delivery-fild">
                  <label htmlFor="apartment" className="cart-delivery-label">
                    Квартира
                  </label>
                  <input
                    className="cart-delivery-fild-apartment"
                    ref={inputApartment}
                    placeholder=""
                    id="apartment"
                    name="apartment"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
            )}
            <div className="cart-summ-order-title">Сумма заказа</div>

            <h3 className="cart-summ-order">{total} руб.</h3>

            <div className="cart-btns-box">
              <button className="cart-btn-order" onClick={sendOrder}>
                Заказать
              </button>
            </div>
          </div>
        )}
        {open ? <ModalOrder setOpen={setOpen} /> : <></>}
        {error ? <ModalError setError={setError} error={error} /> : <></>}
      </div>
    </div>
  );
}

export default Cart;
