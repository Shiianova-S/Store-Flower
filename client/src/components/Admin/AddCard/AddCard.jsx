import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addBouquet } from "./../../../redux/actionCreate/bouquetActionCreate";
import ModalError from "../../Modal/ModalError";

function AddCard() {
  // const [title, setTitle] = useState("")
  // const [price, setPrice] = useState("")
  // const [file, setFile] = useState("");
  const [addError, setAddError] = useState("");

  const { categories } = useSelector((state) => state);
  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    // formData.append('file', file);
    axios
      .post("/bouquets", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        dispatch(addBouquet(data));
      })
      .catch((error) => {
        if (error.response.data === "No file uploaded!") {
          return setAddError("Файл не загружен!");
        }
        setAddError("Не удалось добавить!");
        return console.log("Error: ", error.response.data);
      });
    event.target.reset();
  }

  return (
    <div>
      <h2>Привет, Админ</h2>
      <form onSubmit={handleSubmit}>
        <div className="card-input">
          <label className="card-input__label">Название</label>
          <input
            className="card-input__input"
            type="text"
            name="title"
            required
          />
        </div>
        <div className="card-input">
          <label className="card-input__label">Описание</label>
          <textarea
            type="text"
            name="description"
            id=""
            className="card-input__input"
          ></textarea>
        </div>
        <div className="card-input">
          <label className="card-input__label">Стоимость</label>
          <input
            className="card-input__input"
            type="number"
            name="price"
            required
          />
        </div>

        <div className="card-input">
          <label className="card-input__label">Фото букета</label>
          <input
            type="file"
            name="img"
            id="img"
            className="card-input__input"
          />
        </div>

        <div className="card-input">
          <label className="card-input__label">Категория</label>
          <select name="category_id" id="" className="card-input__input">
            {categories?.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn">Добавить букет</button>
      </form>
      {addError && <ModalError addError={addError} setAddError={setAddError} />}
    </div>
  );
}

export default AddCard;
