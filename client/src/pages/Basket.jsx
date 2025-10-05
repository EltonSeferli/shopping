import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
function Basket() {
  let basketArr = JSON.parse(localStorage.getItem("basket"));
  return (
    <>
      <h1>Basket</h1>
      <div className="basket-container">
        {basketArr &&
          basketArr.map((elem) => {
            return (
              <div className="basket-card" key={uuidv4()}>
                <div className="basket-card-img">
                  <img src={elem.image} alt="" />
                </div>

                <div className="basket-card-details">
                  <h5>{elem.title}</h5>
                  <p>{elem.category}</p>
                </div>
                <h3>{elem.price} $</h3>
                <div className="basket-counter">
                  <button
                    className="minus-btn"
                    onClick={() => {
                      console.log(elem.quantity);
                    }}
                  >
                    -
                  </button>
                  <span className="basket-count">{elem.quantity}</span>
                  <button className="plus-btn">+</button>
                </div>

                <h3>
                  {elem.quantity * elem.price}
                  <span style={{ color: "red" }}>$</span>
                </h3>
                <button className="basket-card-remove-btn">Remove</button>
              </div>
            );
          })}{" "}
      </div>

      <button className="checkout-btn">CheckOut</button>
    </>
  );
}

export default Basket;
