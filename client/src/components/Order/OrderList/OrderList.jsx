import React from "react";
import CartOrderList from "../CartOrderList/CartOrderList";
import "./OrderList.css";
import { v4 as uuidv4 } from "uuid";

function OrderList({ order }) {
  return (
    <>
      <ul className="order-list">
        <li className="order-item">
          Номер заказа: <span className="uuid">{order.id}</span>
        </li>
        <li className="order-item">
          Дата доставки:{" "}
          {new Date(order.delivery_date).toLocaleDateString("ru")}
        </li>
        {order.delivery_street ? (
          <>
            <li className="order-item">Улица: {order.delivery_street}</li>
            <li className="order-item">Дом: {order.delivery_house}</li>
            <li className="order-item">Квартира: {order.delivery_apartment}</li>
          </>
        ) : (
          "самовывоз"
        )}
      </ul>
      {order.orderList.map((el) => (
        <CartOrderList list={el} key={uuidv4()} />
      ))}
    </>
  );
}

export default OrderList;
