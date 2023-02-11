import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { getSingleItem } from "../../services/firebase";
import { cartContext } from "../../storage/cartContext";
import ItemCount from "../itemCount/ItemCount";
import "./itemdetail.css";

function ItemDetailContainer() {
  const [libros, setLibros] = useState([]);  
  const [isInCart, setIsInCart] = useState(false);
  let { itemid } = useParams();
  const { cart, addItem } = useContext(cartContext);
  const itemInCart = cart.find((item) => item.id === libros.id);

  let stockUpdated;

  if (itemInCart) stockUpdated = libros.stock - itemInCart.count;
  else stockUpdated = libros.stock;
  // onAddtoCart
  function handleAddToCart(count) {
    setIsInCart(true);
    alert(`Agregaste ${count} de ${libros.title} al carrito`);
    libros.count = count;
    addItem(libros);
  }

  useEffect(() => {
    getSingleItem(itemid)
      .then((respuesta) => {
        setLibros(respuesta);
      })
      .catch((error) => alert(`Error: ${error}`));
      }, [itemid]);

  return (
    <div class="card mb-5">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            src={libros.imgurl}
            class="img-fluid rounded-start px-5 pt-5"
            alt="imagen"
          ></img>
          <div className="itemcount_container">
            <button class="bg px-3" href="/carroCompra">
              <img
                src="/assets/carroCompra.png"
                alt=""
                width="60"
                height="60"
              />
              Ir al carrito
            </button>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card-body mt-4 me-4">
            <h2 className="fst-italic card-title">
              Título: {libros.title} S/. {libros.price}
            </h2>
            <h5 className="fst-italic text-success">
              Autor y año: {libros.author}
            </h5>
            <h5 className="fst-italic text-info">Género: {libros.gender}</h5>
            <h5 className="text-warning">Reseña: </h5>
            <p>{libros.reseña}</p>
          </div>
          {isInCart ? (
            <Link to="/carroCompra">
              <button>Ir al carrito</button>
            </Link>
          ): (
            <ItemCount stock={stockUpdated} onAddToCart={handleAddToCart} />
          )}
          
        </div>
      </div>
    </div>
  );
}

export default ItemDetailContainer;
