import React from "react";

import FlexWrapper from "../flexWrapper/FlexWrapper";
import Item from "../Item/Item";


function ItemListContainer() {

  const LibroA = {
    title: "Dímelo Bajito",
    price: 89,
    gender: "Libros juveniles",
    author: "Mercedes Ron, 2020",
    imgurl:
      "/assets/dimeloBajito.webp",
  };
  const LibroB = {
    title: "Manual del Terror",
    price: 41,
    gender: "Terror",
    author: "Paul Van Loon, 2018",
    imgurl:
      "/assets/manualDelTerror.webp",
  };
  const LibroC = {
    title: "Aoha Ride",
    price: 52,
    gender: "Manga",
    author: "Ao Sakisaka, 2015",
    imgurl:
      "/assets/aohaRide.webp",
  };
  const LibroD = {
    title: "Crisis Infinita (3er Edición)",
    price: 197,
    gender: "Cómic",
    author: "Geoff Johns , 2021",
    imgurl:
      "/assets/crisisInfinita.webp",
  };
  return (
    <>
      <FlexWrapper>
        <Item
          title={LibroA.title}
          price={LibroA.price}
          author={LibroA.author}
          gender={LibroA.gender}
          imgurl={LibroA.imgurl}
        />
        <Item
          title={LibroB.title}
          price={LibroB.price}
          author={LibroB.author}
          gender={LibroB.gender}
          imgurl={LibroB.imgurl}
        />
        <Item
         title={LibroC.title}
         price={LibroC.price}
         author={LibroC.author}
         gender={LibroC.gender}
         imgurl={LibroC.imgurl}
        />
        <Item
         title={LibroD.title}
         price={LibroD.price}
         author={LibroD.author}
         gender={LibroD.gender}
         imgurl={LibroD.imgurl}
        />
      </FlexWrapper>
    </>
  );
}

export default ItemListContainer;