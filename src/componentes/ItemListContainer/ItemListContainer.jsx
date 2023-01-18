import React, { useState, useEffect } from "react";

import FlexWrapper from "../flexWrapper/FlexWrapper";
import Item from "../Item/Item";
import getItems from "../../services/mockAsyncService";
import ItemList from "../itemList/ItemList";

function ItemListContainer() {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    getItems().then((respuesta) => {
      console.log(respuesta);
      setLibros(respuesta);
    });

  }, []);
  return (
    <>
      <FlexWrapper>
        <ItemList libros={libros} />
      </FlexWrapper>
    </>
  );
}

export default ItemListContainer;
