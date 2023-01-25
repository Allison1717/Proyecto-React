import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleItem } from "../../services/mockAsyncService";
import "./itemdetail.css";

function ItemDetailContainer() {
  const [libros, setLibros] = useState([]);

  // 1. obtenemos el valor de la URL con useParams
  let { itemid } = useParams();
  console.log(itemid);
  // { itemid: "1" }

  useEffect(() => {
    // 2. Pasamos por parametro al mockService el id
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
            class="img-fluid rounded-start p-5"
            alt="imagen"
          ></img>
        </div>
        <div class="col-md-8">
          <div class="card-body my-4 me-4">
            <h2 class="fst-italic card-title">Título: {libros.title} S/. {libros.price}</h2>  
            <h5 className="fst-italic text-success">Autor y año: {libros.author}</h5>          
            <h5 className="fst-italic text-info">Género: {libros.gender}</h5>
            <h5 className="text-warning">Reseña: </h5>
            <p>{libros.reseña}</p>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailContainer;
