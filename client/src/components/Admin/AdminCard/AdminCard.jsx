import React, { useState } from "react";
import "./AdminCard.css";
import { deleteBouquet } from "../../../redux/actionCreate/bouquetActionCreate";
import { useDispatch } from "react-redux";
import axios from "axios";
import EditModal from "../EditModal/EditModal";
import ModalError from "../../Modal/ModalError";

export default function AdminCard({ bouquet }) {
  const [open, setOpen] = useState(false);
  const [errorAdmin, setErrorAdmin] = useState("");

  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    axios
      .delete(`bouquets/${id}`)
      .then(({ data }) => {
        if (data === 1) {
          dispatch(deleteBouquet(id));
        } else {
          setErrorAdmin("Не удалось удалить!");
        }
      })
      .catch((error) => {
        setErrorAdmin("Что-то пошло не так, попробуй позже!");
        console.log("Error: ", error.response.data);
      });
  };

  return (
    <div className="cart-item-card">
      <div className="cartAdmin-item-card-img-box">
        <img
          className="cart-item-card-img"
          src={`${bouquet.img}`}
          alt="bouquet"
        />
      </div>
      {open ? (
        <EditModal
          bouquet={bouquet}
          setOpen={setOpen}
          errorAdmin={errorAdmin}
        />
      ) : (
        <></>
      )}
      <div className="cart-item-card-content">
        <div className="cart-item-card--name">{bouquet.title}</div>
        <div className="cart-item-card--price">{bouquet.price}$</div>

        <div className="box-counter">
          <button className="cart-itemAdmin-btn" onClick={() => setOpen(true)}>
            Редактировать
          </button>
          <button
            className="cart-itemAdmin-btn"
            key={bouquet.id}
            onClick={() => deleteHandler(bouquet.id)}
          >
            Удалить
          </button>
        </div>
        {errorAdmin && (
          <ModalError errorAdmin={errorAdmin} setErrorAdmin={setErrorAdmin} />
        )}
      </div>
    </div>
  );
}
