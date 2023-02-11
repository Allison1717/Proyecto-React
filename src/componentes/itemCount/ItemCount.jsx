
import { useState } from "react";
import "./itemCount.css";

function ItemCount({onAddToCart, stock}) {
  const [count, setCount] = useState(0);

  function handleAdd() {
    // count < stock
    if (count < stock){
      setCount(count + 1);
    }
  }

  function handleSubstract() {
    // validar -1 -2
    if (count > 1){
      setCount(count - 1);
    }
  }

  return (
    <div className="itemcount_container">
      <small>Agrega la cantidad deseada al carrito</small>
      <div className="itemcount_control flex rounded-4">
        <button className="btn" onClick={handleSubstract}>
        <img src="../../assets/minus.png" width={50} height={50}></img>
        </button>
        <span className="itemcount_count">{count}</span>
        <button className="btn" onClick={handleAdd}>
          <img src="../../assets/addition.png" width={50} height={50}></img>
        </button>
        <div className="itemcount_btns">
            <button className="letraNavBar bg rounded-pill p-2 me-3" onClick={() => onAddToCart(count)}>
            Agregar al carrito
            </button>
        </div>
      </div>

      
    </div>
  );
}

export default ItemCount;