import React from "react";
import "./item.css";
import { ButtonChild } from "../button/Button";


function Item({ title, price, author, imgurl ,gender}) {
   return (
    <div className="item-card" >
      <div className="item-card_header">
        <h2>{title}</h2>
      </div>
      <div className="item-card_img pb-4">
        <img src={imgurl} alt="imagen"></img>
      </div>
      <div className="item-card_detail">
        <h4 className="fst-italic text-info"> {gender}</h4>
        <h4>S/. {price}</h4>
        <p className="fw-bold text-success">{author}</p>
        <ButtonChild color="black">Ver Sinopsis</ButtonChild>
      </div>
    </div>
  );
}

export default Item;
