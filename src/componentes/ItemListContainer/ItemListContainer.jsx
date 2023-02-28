import React, { useState, useEffect } from "react";
import FlexWrapper from "../flexWrapper/FlexWrapper";
import { getItemsPromise, getItems } from "../../services/firebase";
import ItemList from "../itemList/ItemList";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import Notification from "../notification/Notification";

function ItemListContainer() {
  const [libros, setLibros] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let {genderid} = useParams();
  
  const [notification, setNotification] = useState({
    type: "info",
    text: "Cargando datos",
  });
  let idgender = undefined;
  
  async function getLibros() {
    try {
      let response = await getItemsPromise(genderid);
      setLibros(response);
      setNotification({
        type: "default",
        text: `Se cargaron ${response.length} libros correctamente...`,
      });
    } catch (error) {
      alert(error);
      setNotification({
        type: "danger",
        text: `Error cargando los libros: ${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  
}

  useEffect(() => {
    getLibros();
  }, [idgender]);

  console.log(libros)
  return (
    <>
     <FlexWrapper column>
      {notification.type && <Notification notification={notification} />}

      {isLoading ? (
        <FlexWrapper>
          <Loader color="blue" size={500} />
        </FlexWrapper>
      ) : (
         <ItemList libros={libros} />
        
      )}
    </FlexWrapper>
    </>
  );
}



export default ItemListContainer;
