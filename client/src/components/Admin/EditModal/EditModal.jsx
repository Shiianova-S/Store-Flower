import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateBouquet } from "../../../redux/actionCreate/bouquetActionCreate";

function EditModal({ setOpen, bouquet, setErrorAdmin }) {
  const { categories } = useSelector((state) => state);
  const dispatch = useDispatch();
  // const [title, setTitle] = useState(bouquet.title);
  // const [price, setPrice] = useState(bouquet.price);
  // const [description, setDescription] = useState(bouquet.description);
  // const [file, setFile] = useState("");

  async function handleSubmit(event) {
    console.log(1, event.target.img.files);

    event.preventDefault();
    const formData = new FormData(event.target);

    // formData.append("file", file);
    axios
      .post(`/bouquets/edit/${bouquet.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        dispatch(updateBouquet(data));
        setOpen(false);
      })
      .catch((error) => {
        setErrorAdmin("Не удалось обновить!");
        console.log("Error: ", error.response.data);
      });
    // setTitle("");
    // setPrice("");
    // event.target.reset()
  }

  return (
    <div>
      <div className="modal-order">
        <div className="modal-order-dialog">
          <div className="modal-order-close">
            <button
              className="modal-order-button"
              onClick={() => setOpen(false)}
            >
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="30px"
                height="30px"
              >
                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
              </svg>
            </button>
          </div>
          <p className="modal-order-text">Редактировать {bouquet.title}</p>
          <form onSubmit={handleSubmit}>
            <div className="card-input">
              <label className="card-input__label">Название</label>
              <input
                // value={title}
                defaultValue={bouquet.title}
                // onChange={(e) => setTitle(e.target.value)}
                className="card-input__input"
                type="text"
                name="title"
                required
              />
            </div>
            <div className="card-input">
              <label className="card-input__label">Описание</label>
              <textarea
                // value={description}
                defaultValue={bouquet.description}

                // onChange={(e) => setDescription(e.target.value)}
                type="text"
                name="description"
                id=""
                className="card-input__input"
              ></textarea>
            </div>
            <div className="card-input">
              <label className="card-input__label">Стоимость</label>
              <input
                // value={price}
                defaultValue={bouquet.price}

                // onChange={(e) => setPrice(e.target.value)}
                className="card-input__input"
                type="number"
                name="price"
                required
              />
            </div>

            <div className="card-input">
              <label className="card-input__label">Фото букета</label>
              <input
                // onChange={(e) => {
                //   setFile(e.target.files[0]);
                // }}
                type="file"
                accept="image/*"
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
            <button className="btn">Отправить</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
