import "./App.css";

import ItemListContainer from "./componentes/ItemListContainer/ItemListContainer";
import ItemListContainerGreeting from "./componentes/ItemListContainer/ItemListContainerGreeting";
import NavBar from "./componentes/navBar/NavBar.jsx";

//componente App
function App() {
  
  return (  
    <>
    <NavBar clicOnChart='10'/>
    <ItemListContainerGreeting greeting='No dejes para mañana lo que puedes leer hoy'/>
    {/* <cards de libros /> */}
    <ItemListContainer />

  
  </>
    
  );
}

export default App;
