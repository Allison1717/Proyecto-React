import "./App.css";

import ItemListContainer from "./componentes/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./componentes/itemDetailContainer/ItemDetailContainer";
import NavBar from "./componentes/navBar/NavBar.jsx";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage"
//componente App
function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar clicOnChart="10" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gender/:genderid" element={<HomePage />} />
          <Route path="/item/:itemid" element={<ItemDetailContainer />} />
          <Route path="/carroCompra" element={<ItemListContainer />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
       
export default App;
