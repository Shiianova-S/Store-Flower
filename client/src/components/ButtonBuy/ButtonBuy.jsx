import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../redux/actionCreate/cartActionCreate";

function ButtonBuy({ bouquet, setSwitchBtn, setSwitchBtnFromCardPage }) {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  const handleCart = () => {
    if (setSwitchBtn) {
      setSwitchBtn((prev) => !prev);
    } 
    if (setSwitchBtnFromCardPage) {
      setSwitchBtnFromCardPage((prev) => !prev);
    }
    dispatch(
      addItemToCart({
        bouquet,
        count: count,
      })
    );
  };

  return (
    <div>
      <div data-min="1" className="counter">
        <button
          className="minus"
          type="button"
          onClick={() => (count >= 2 ? setCount(count - 1) : setCount(count))}
        >
          <svg
            width="16"
            height="1"
            viewBox="0 0 16 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line y1="0.5" x2="16" y2="0.5" stroke="#292929" />
          </svg>
        </button>
        <input
          className="counter_input-fild"
          readOnly
          value={count}
          id="item_count_1579"
        />
        <button
          className="plus"
          type="button"
          onClick={() => setCount(count + 1)}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line y1="7.5" x2="15" y2="7.5" stroke="#292929" />
            <line x1="7.5" y1="2.18557e-08" x2="7.5" y2="15" stroke="#292929" />
          </svg>
        </button>
      </div>
      <button className="card-btns" onClick={handleCart}>
        В корзину
      </button>
    </div>
  );
}

export default ButtonBuy;
