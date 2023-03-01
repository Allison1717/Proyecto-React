import React, { useState, useEffect, useContext } from "react";
import { getDoc, doc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { cartContext } from "../../storage/cartContext";
import ItemCount from "../itemCount/ItemCount";
import "./itemdetail.css";
import { db } from "../../services/firebase";

function ItemDetailContainer() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
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
    if(count>0){
      alert(`Agregaste ${count} de ${libros.title} al carrito`);
      libros.count = count;
      addItem(libros);
    }else if(count===0){
      alert(`La mínima cantidad de un producto para agregar al carrito es (1)`);
      setIsInCart(false);
    }
    
  }

  useEffect(() => {
    const docRef = doc(db, "products", itemid);
    getDoc(docRef)
      .then((doc) => {
        console.log(doc);
        const data = doc.data();
        const libroAdapted = { id: doc.id, ...data };
        console.log(libroAdapted);
        setLibros(libroAdapted);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [itemid]);
  if (loading) {
    return (
      <>
        <div className="contenedor">
          <div className="contenedor-loader">
            <div className="rueda"></div>
          </div>
          <div className="cargando">Cargando...</div>
        </div>
      </>
    );
  }
  return (
    <div class="card mb-5">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            src={libros.imgurl}
            class="img-fluid rounded-start px-5 pt-5"
            alt="imagen"
          ></img>
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
            <h5 className="fst-italic text-danger">
              Stock: {libros.stock}
            </h5>
          </div>
          {isInCart ? (
            <Link to="/carroCompra">
              <div className="itemcount_container">
                <button class="bg px-3">
                  <img
                    src="/assets/carroCompra.png"
                    alt="carroCompra"
                    width="60"
                    height="60"
                  />
                  Ir al carrito
                </button>
              </div>
            </Link>
          ) : (
            <>
              <ItemCount stock={stockUpdated} onAddToCart={handleAddToCart} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemDetailContainer;
