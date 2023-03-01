import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { cartContext } from "../../storage/cartContext";
import { Link, useNavigate } from "react-router-dom";
import { createBuyOrder } from "../../services/firebase";
//import { ButtonChild } from "../button/Button";
import "./cart.css";

function CartContainer() {
  const { cart, totalPrice, removeItem, clearCart } = useContext(cartContext);
  const [orderId, setOrderId] = useState(null);
  const navigateTo = useNavigate();

  async function handleCheckout(userData) {
    const items = cart.map((libros) => ({
      id: libros.id,
      title: libros.title,
      price: libros.price,
      count: libros.count,
    }));

    const order = {
      buyer: userData,
      items: items,
      date: new Date(),
      total: 1000,
    };

    let id = await createBuyOrder(order);
    navigateTo(`/thank-you/${id}`);
  }
  if (orderId !== null)
    return (
      <div>
        <h1>Gracias por tu compra</h1>
        <p>El id de tu compra es: {orderId}</p>
      </div>
    );
   
    if (cart.length === 0) {
      return (
        <div className="container bg-color text-align-center text-center rounded-4 mt-5 pt-3 pb-2 px-4">
          <h1 className="cargando text-dark">
            No hay productos en el carrito
          </h1>
          <img
              src="/assets/carroVacio.png"
              alt="limpiar"
              width="150"
              height="150"
            />
        </div>
      );
    }
  return (
    
    <>
      <div className="container bg-color">
        <h1 className="text-center my-5 py-3">Mi Carrito</h1>
      </div>

      <div className="container text-center">
      <table className="cartList table table-hover border border-dark fs-5">
        <thead className="cartList_head bg">
          <tr className="cartList_row">
            <th>Miniatura</th>
            <th>Titulo</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Remover</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id} className="cartList_row bg-white ">
              <td>
                <img
                  height={150}
                  weight={250}
                  src={item.imgurl}
                  alt={item.title}
                />
              </td>
              <td>{item.title}</td>
              <td>S/. {item.price}</td>
              <td>{item.count}</td>
              <td>
                <button onClick={() => removeItem(item.id)}>
                  <img
                    src="/assets/boton-eliminar.png"
                    alt=""
                    width="60"
                    height="60"
                  />
                </button>
              </td>
              
              <th>S/. {item.count * item.price}</th>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="cartList_detail bg-color container mt-5">
        <h4 className="p-3">El total de tu compra es de S/. {totalPrice()}</h4>
      </div>
      <div className="d-flex justify-content-center align-content-center">
        <Link to="/checkout">
          <button class="bg px-5  my-5">
            {" "}
            <img
              src="/assets/carroCompra.png"
              alt="carroCompra"
              width="60"
              height="60"
            />
            Finalizar Compra
          </button>
        </Link>

        <button class="bg-limpiar px-5 ms-3 my-5" onClick={() => clearCart()}>
          {" "}
          <img
            src="/assets/limpiar.png"
            alt="limpiar"
            width="60"
            height="50"
          />
         Vaciar carrito
        </button>
      </div>
    </>
  );
}

export default CartContainer;
