import React, { useEffect, useState } from "react";
import { FaBeer } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import axios, { isCancel, AxiosError } from "axios";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
function Home() {
  let loged_user = JSON.parse(localStorage.getItem("logedUser"));
  let api_url_products =
    "https://669f8faab132e2c136fe57d0.mockapi.io/products/";
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios(api_url_products).then((res) => {
      setProducts(res.data);
    });
  }, []);
  const [selectedId, setSelectedId] = useState(0);
  const [truefalse, setTruefalse] = useState(false);
  let wishlistArr;
  let local_wishlist = JSON.parse(localStorage.getItem("wishlist"));
  if (local_wishlist) {
    wishlistArr = local_wishlist;
  } else {
    wishlistArr = [];
  }
  let basketArr;
  let local_basket = JSON.parse(localStorage.getItem("basket"));
  if (local_basket) {
    basketArr = local_basket;
  } else {
    basketArr = [];
  }
  return (
    <>
      <div
        className={
          loged_user
            ? "go-log-in log-in-container none"
            : "go-log-in log-in-container"
        }
      >
        <h2>You are not loged in!</h2>
        <i>Log in or register to use features of site</i>
        <button
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          Log in
        </button>
      </div>

      <div
        className={
          loged_user ? " products-container" : "products-container none"
        }
      >
        {products.map((elem) => {
          return (
            <div key={uuidv4()} className="card" cardid={elem.id}>
              <div className="card-img">
                <img src={elem.image} alt="" />
              </div>
              <div className="card-body">
                <div className="card-details">
                  <h5>
                    {elem.id} | {elem.title}
                  </h5>
                  <h4>{elem.price}</h4>
                  <p>
                    {elem.rating.count} units in stock| Sale:
                    {elem.rating.sale > 0 ? elem.rating.sale : "None"}
                  </p>
                </div>
                <div className="icons">
                  <button
                    className="add-to-cart"
                    onClick={(e) => {
                      let selected_id =
                        e.currentTarget.parentElement.parentElement.parentElement.getAttribute(
                          "cardid"
                        );

                      console.log(selected_id);
                      let selected_elem = products.find(
                        (elem) => elem.id == selected_id
                      );
                      for (let basketElem of basketArr) {
                        if (basketElem.id == selected_id) {
                        } else {
                        }
                      }
                      if (basketArr.find((elem) => elem.id == selected_id)) {
                        selected_elem.quantity++;
                      } else {
                        selected_elem.quantity = 1;
                        basketArr.push(selected_elem);
                      }
                      console.log(basketArr);
                      localStorage.setItem("basket", JSON.stringify(basketArr));
                    }}
                  >
                    <FiShoppingCart />
                  </button>

                  <button
                    className="add-to-fav "
                    style={{ color: "red" }}
                    onClick={(e) => {
                      let selected_id =
                        e.currentTarget.parentElement.parentElement.parentElement.getAttribute(
                          "cardid"
                        );
                      console.log(
                        e.currentTarget.parentElement.parentElement
                          .parentElement
                      );

                      let selected_elem = products.find(
                        (elem) => elem.id == selected_id
                      );
                      let findFav = true;
                      for (let elem of wishlistArr) {
                        if (elem.id == selected_id) {
                          console.log(elem.id, selected_id);
                          findFav = false;
                        }
                      }
                      if (findFav) {
                        wishlistArr.push(selected_elem);
                        setSelectedId(selected_id);
                        console.log(selectedId);
                        localStorage.setItem(
                          "wishlist",
                          JSON.stringify(wishlistArr)
                        );
                        Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: "Product added to wishlist",
                          showConfirmButton: false,
                          timer: 1000,
                        });
                      } else {
                        wishlistArr = wishlistArr.filter(
                          (elem) => elem.id != selected_id
                        );
                        localStorage.setItem(
                          "wishlist",
                          JSON.stringify(wishlistArr)
                        );
                        Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: "Product deleted from wihslist",
                          showConfirmButton: false,
                          timer: 1000,
                        });
                      }
                      for (let fav of wishlistArr) {
                        for (let prod of products) {
                          if (fav.id == prod.id) {
                            setTruefalse(!truefalse);
                          }
                        }
                      }
                    }}
                  >
                    {/* {wishlistArr?.find((elem) => elem.id == selectedId) ? (
                      <FaHeart />
                    ) : (
                      <FaRegHeart />
                    )} */}
                    {truefalse ? <FaHeart /> : <FaRegHeart />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
