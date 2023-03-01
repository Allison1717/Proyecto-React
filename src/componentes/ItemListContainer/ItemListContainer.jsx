import React, { useState, useEffect } from "react";
import FlexWrapper from "../flexWrapper/FlexWrapper";
//import { getItemsPromise, getItems } from "../../services/firebase";
import ItemList from "../itemList/ItemList";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import Notification from "../notification/Notification";
import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { db } from '../../services/firebase'

function ItemListContainer() {
  const [libros, setLibros] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let {genderid} = useParams();
  const [error] = useState(false);
  const [notification] = useState({
    type: "info",
    text: "Cargando libros ",
  });
    useEffect(() => {
      setIsLoading(true)

      const collectionRef = genderid ? query(collection(db,'products'),where('gender', '==',genderid)) : collection(db,'products')
      console.log(genderid)
      getDocs(collectionRef).then(response =>{
          const librosAdapted = response.docs.map(doc => {
              const data = doc.data()
              console.log(data)
              return {id: doc.id, ...data}
          })
          setLibros(librosAdapted)
          console.log(librosAdapted)
      }).catch(error =>{
          console.log(error)
      }).finally(() =>{
        setIsLoading(false)
      })
      
  },[genderid])
  
    if(isLoading){
      return(
          <>
              <div className='contenedor'>
                  <div className='contenedor-loader'>
                      <div className='rueda'></div>
                  </div>
                  <div className='cargando'>Cargando...</div>
              </div>
          </>
      )
  }
  if(error){
      return <h1 className="bg-color text-dark py-5">Existe un error en la plataforma...</h1>
  }
  return (
    <>
     <FlexWrapper column>
      {notification.type && <Notification notification={notification} />}

      {isLoading ? (
        <FlexWrapper>
          <Loader color="white" size={200} />
        </FlexWrapper>
      ) : (
         <ItemList libros={libros} />
        
      )}
    </FlexWrapper>
    </>
  );
}
export default ItemListContainer;
