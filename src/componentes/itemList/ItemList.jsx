import React from "react";
import FlexWrapper from "../flexWrapper/FlexWrapper";
import Item from "../Item/Item";

function ItemList(props) {
  return (
    <FlexWrapper>
      {props.libros.map((item) => (
        <Item
          key={item.id}
          title={item.title}
          price={item.price}
          gender={item.gender}
          author={item.author}
          imgurl={item.imgurl}
        />
      ))}
    </FlexWrapper>
  );
}

export default ItemList;