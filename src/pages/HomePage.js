import React from "react";
import ItemListContainer from "../componentes/ItemListContainer/ItemListContainer";
import ItemListContainerGreeting from "../componentes/ItemListContainer/ItemListContainerGreeting";

function HomePage() {
  return (
    <div>
      <ItemListContainerGreeting greeting="No dejes para mañana lo que puedes leer hoy" />
      {/* ....... */}
      <ItemListContainer />
    </div>
  );
}

export default HomePage;