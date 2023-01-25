import React, { useState, useEffect } from "react";

import getItems, {getItemsByGender} from "../../services/mockAsyncService";
import ItemList from "../itemList/ItemList";
import { useParams } from "react-router-dom";

function ItemListContainer() {
  const [libros, setLibros] = useState([]);
  let idgender = useParams();
  useEffect(() => {
    if (idgender) {
      getItemsByGender(idgender).then((respuesta) => {
        console.log(respuesta);
        setLibros(respuesta);
      });
    } else {
      getItems().then((respuesta) => {
        console.log(respuesta);
        setLibros(respuesta);
      });
    }
  }, [idgender]);

  return (
    <>
      <ItemList libros={libros} />
    </>
  );
}

export default ItemListContainer;
