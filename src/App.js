import "./App.css";

import ItemListContainer from "./componentes/ItemListContainer/ItemListContainer";
import ItemListContainerGreeting from "./componentes/ItemListContainer/ItemListContainerGreeting";
import ItemDetailContainer from "./componentes/itemDetailContainer/ItemDetailContainer";
import NavBar from "./componentes/navBar/NavBar.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//componente App
function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar clicOnChart="10" />
        <ItemListContainerGreeting greeting="No dejes para mañana lo que puedes leer hoy" />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:categoryid" element={<ItemListContainer />} />
          <Route path="/item/:itemid" element={<ItemDetailContainer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
       
export default App;
