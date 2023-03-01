import React from "react";
import "./item.css";
import { ButtonChild } from "../button/Button";
import ToggleButton from "../toggleButton/ToggleButton";
import { Link } from "react-router-dom";


function Item({ item}) {
   const urlDetail = `/item/${item.id}`;
   const classNamePrice = item.discount
   ? "item-card_priceDiscount"
   : "item-card_price";

 const stylesCard = {
   color: item.stock <= 0 ? "#c3c3c3" : "black",
 };
   return (
    <div style={stylesCard} className="item-card" >
       <ToggleButton icon="⭐" />
      <div className="item-card_header">
        <h2>{item.title}</h2>
      </div>
      <Link to={urlDetail}>
        <div className="item-card_img pb-4">
          <img src={item.imgurl} alt="imagen"></img>
        </div>  
      </Link>
      
      <div className="item-card_detail">
        <h4 className="fst-italic text-info"> {item.gender}</h4>
        <h4 className={classNamePrice}>S/. {item.price}</h4>
        {item.discount && <small>{item.discount} %</small>}
        <small>{item.title}</small>
        <p className="fw-bold text-success">{item.author}</p>
        <p className="fw-bold text-warning">Stock : {item.stock}</p>
        {item.stock> 0 ? (
          <Link to={urlDetail}>
            <ButtonChild color="black">Ver Detalle</ButtonChild>
          </Link>
          ) : (
            <p color="red">No hay stock</p>
          )
        }
      </div>
    </div>
  );
}

export default Item;
