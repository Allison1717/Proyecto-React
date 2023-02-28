import React from "react";
import "./cartWidget.css";
import { Link } from "react-router-dom";

const CartWidget =({totalQuantity}) =>{

  return (
    <Link to="/carroCompra">     
      <button class="position-relative bg"><img src="/assets/carroCompra.png" alt="" width="80" height="80"/>
        <span class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2">{totalQuantity}</span>
      </button>
    </Link>
  );
}

export default CartWidget;