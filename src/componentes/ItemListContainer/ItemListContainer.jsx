import React, { useState, useEffect } from "react";
import FlexWrapper from "../flexWrapper/FlexWrapper";
import Item from "../Item/Item";
import {getItems, getItemsPromise} from "../../services/firebase";
import {getItemsByGender} from "../../services/firebase";
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
  /*
  useEffect(() => {
    if (genderid) {
      getItemsByGender(genderid).then((respuesta)=>{
        setLibros(respuesta);
      });
      
    } else {
      getItems().then((respuesta) => {
        console.log(respuesta);
        setLibros(respuesta);
      });
    }
  }, [genderid]);
  */
  async function getLibros() {
    if (!genderid) {
      try {
        let response = await getItemsPromise();
        setLibros(response);
        setNotification({
          type: "default",
          text: `Se cargaron ${response.length} productos correctamente...`,
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
    } else {
      let response = await getItemsByGender(genderid);
      setLibros(response);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getLibros();
  }, [genderid]);

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
