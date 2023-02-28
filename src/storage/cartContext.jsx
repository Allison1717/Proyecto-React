const { createContext, useState } = require("react");

export const cartContext = createContext();

export function CartContextProvider({children}) {
  let [cart, setCart] = useState([]);

  const addItem = (libroToAdd) => {
    if(!isInCart(libroToAdd.id)){
    setCart(prev => {
        return [...prev, libroToAdd]
    })
    }else{
        console.error('YA ESTA AGREGADO')
    }
}
const isInCart = (id) => cart.some(libros => id === libros.id)
const getTotalQuantity = () =>{
    let accu = 0
    
    cart.forEach(libros =>{
        accu+=libros.count
    })
    return accu
}
const totalQuantity = getTotalQuantity()

const clearCart = () => setCart([])

const removeItem = (id) => setCart(cart.filter(libros => libros.id !== id))

const totalPrice = () => { return cart.reduce((prev,act) => prev + act.count*act.price,0)}

return(

    <cartContext.Provider value={{addItem,isInCart,totalQuantity,clearCart,removeItem,totalPrice,cart}}>
        {children}
    </cartContext.Provider>
)
}