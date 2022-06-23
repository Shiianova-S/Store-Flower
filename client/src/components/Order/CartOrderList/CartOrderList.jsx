import React from 'react';
import { Link } from 'react-router-dom'
import './CardOrderList.css'

function CartOrderList({list}) {
  return (
    <div className='order-bouquet'>
      <div className='order-bouquet-box'>
        <p className='order-bouquet-number'>Заказ: <span className='uuid'>jgtxci</span></p> 
        <p className='order-bouquet-title'>{list.title}</p>
        <Link to={`/card/${list.id}`}>
          <img width="100" src={`${list.img}`} alt="dsa" />
        </Link>
        <p className='order-bouquet-count'>{list.count} шт.</p>
      </div>
    </div>
  );
}

export default CartOrderList;
