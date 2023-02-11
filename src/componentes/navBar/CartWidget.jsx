import React from "react";
import "./cartWidget.css"

function CartWidget() {
  let countInCart = 0;

  return (
      
  <button class="position-relative bg"><img src="/assets/carroCompra.png" alt="" width="80" height="80"/>
    <span class="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2"><span class="visually-hidden">{countInCart !== 0 && countInCart}</span>{countInCart}</span>
  </button>

  );
}

export default CartWidget;