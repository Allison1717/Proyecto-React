import React from "react";
import FlexWrapper from "../flexWrapper/FlexWrapper";
import Item from "../Item/Item";

function ItemList(props) {
  return (
    <FlexWrapper>
      {props.libros.map((item) => (
        <Item
          key={item.id}
          item={item}
        />
      ))}
    </FlexWrapper>
  );
}

export default ItemList;