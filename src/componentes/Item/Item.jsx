import React from "react";
import "./item.css";
import { ButtonChild } from "../button/Button";
import ToggleButton from "../toggleButton/ToggleButton";
import { Link } from "react-router-dom";


function Item({ id, title, price, author, imgurl ,gender}) {
   const urlDetail = `/item/${id}`;
   return (
    <div className="item-card" >
       <ToggleButton icon="⭐" />
      <div className="item-card_header">
        <h2>{title}</h2>
      </div>
      <Link to={urlDetail}>
        <div className="item-card_img pb-4">
          <img src={imgurl} alt="imagen"></img>
        </div>  
      </Link>
      
      <div className="item-card_detail">
        <h4 className="fst-italic text-info"> {gender}</h4>
        <h4>S/. {price}</h4>
        <p className="fw-bold text-success">{author}</p>
        <Link to={urlDetail}>
        <ButtonChild color="black">Ver Detalle</ButtonChild>
        </Link>
      </div>
    </div>
  );
}

export default Item;
