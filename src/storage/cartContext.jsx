const { createContext, useState } = require("react");

export const cartContext = createContext();

export function CartContextProvider(props) {
  let [cart, setCart] = useState([]);

  function addItem(item, count) {
    // shallow copy - deep copy (JSON)
    //let newCart = cart.map( item => item )
    /* let newCart = [...cart]
    newCart.push(item);
    setCart(newCart) */
  
    const isInCart = cart.some((itemInCart) => itemInCart.id === item.id);

    if (isInCart) {
      let newCart = [...cart];
      let index = cart.findIndex((itemInCart) => itemInCart.id === item.id);
      alert("El libro ya está en el carrito");
    } else {
      setCart([...cart, item]);
    }
  }

  function removeItem(idToDel) {
    setCart(cart.pop());
  }

  function clearCart() {
    /* Vaciar el carrito */
    setCart([])
  }

  function getTotalItems() {
    let total = 0;
    cart.forEach((item) => (total += 1));
    return total;
  }

  function getTotalPriceInCart() {
    return 999;
  }

  const value = {
    cart,
    addItem,
    getTotalItems,
    getTotalPriceInCart,
    removeItem,
  };

  return (
    <cartContext.Provider value={value}>{props.children}</cartContext.Provider>
  );
}