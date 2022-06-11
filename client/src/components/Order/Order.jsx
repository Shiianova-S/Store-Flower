import axios from 'axios';
import { axiosWithConfig } from '../../utils/axios';
import React from 'react';
import OrderList from './OrderList/OrderList'
import CartOrderList from './CartOrderList/CartOrderList';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Order.css'
import { login } from '../../redux/actionCreate/userActionCreate';

function Order({user}) {
  
  const [order, setOrder] = useState([])
  const [orderCart, setOrderCart] = useState([])

  useEffect(() => {
    //**? Сервер возвращает заказы по id (hardcode id)
    axios(`http://localhost:4000/order/${user?.user.id}`)
    .then(({data}) => setOrder(data))


    //**? Сервер возвращает корзину по id (hardcode id)
    axios(`http://localhost:4000/cart/${user?.user.id}`)
    .then(({data}) => setOrderCart(data))
    
  }, [user])

  return (
    <div className='container-orders'>
      <div className='orders-title'>Ваши заказы</div>
        {order && order?.map(el => (
          <div className='orders'>
            <OrderList order={el} cart={orderCart.filter(cart => cart?.uuid === el?.uuid)} />
          </div>
        ))}
    </div>
  );
}

export default Order;
