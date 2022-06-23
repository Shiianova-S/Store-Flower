import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./Categories.css";

function Categories() {
  const { categories } = useSelector((state) => state);

  return (
    <>
      <div className="category-container">
        <div className="container">
          <div className="category-box">
            {categories &&
              categories.map((category) => (
                <Link
                  key={uuidv4()}
                  className="category-link"
                  to={`/categories/${category?.id}`}
                >
                  <div className="category-cart-wrapper">
                    <img
                      className="category-img"
                      width="30"
                      height="30"
                      src={`${category?.icon}`}
                      alt="icons"
                    />
                    <h3 className="category-name">{category?.name}</h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Categories;
