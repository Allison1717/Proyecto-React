import React from 'react'
import FlexWrapper from "../flexWrapper/FlexWrapper";
import "./itemListContainerGreeting.css"

function ItemListContainerGreeting(props) {
    const {greeting} =props;
  return (
    <>
      <FlexWrapper>
         <h2 className="p-3 bg-color bg-opacity-5 border rounded-pill">"{greeting}."</h2>
      </FlexWrapper>
    </>
    
  )
}

export default ItemListContainerGreeting;