import axios from "axios";
import React from "react";
import OrderList from "./OrderList/OrderList";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import "./Order.css";

function Order() {
  const { user } = useSelector((state) => state);
  const [orders, setOrders] = useState(false);

  useEffect(() => {
    axios(`/order/${user?.user.id}`).then(({ data }) => {
      setOrders(data);
    });
  }, [user?.user.id]);

  return (
    <div className="container-orders">
      <div className='orders-title'>Ваши заказы</div>
        {orders && orders.map(el => (
          <div className='orders' key={uuidv4()}>
            <OrderList order={el}  />
          </div>
        ))}
    </div>
  );
}

export default Order;
