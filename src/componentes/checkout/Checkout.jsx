import {
  collection,
  query,
  where,
  documentId,
  getDocs,
  writeBatch,
  addDoc,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../../storage/cartContext";
import { db } from "../../services/firebase";
import "./checkout.css";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const { cart, totalPrice, clearCart } = useContext(cartContext);
  const navigate = useNavigate();
  const [buyer, setBuyer] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const createOrder = async () => {
    setLoading(true);
    try {
      const objOrder = {
        buyer,
        items: cart,
        total: totalPrice(),
      };

      const batch = writeBatch(db);

      const ids = cart.map((libros) => libros.id);
      const librosRef = query(
        collection(db, "products"),
        where(documentId(), "in", ids)
      );
      const librosAddredToCartFromFirestore = await getDocs(librosRef);
      const { docs } = librosAddredToCartFromFirestore;

      const outOfStock = [];

      docs.forEach((doc) => {
        const dataDoc = doc.data();
        console.log("dataDoc: ", dataDoc);
        const stockDb = dataDoc.stock;
        const librosAddedToCart = cart.find((libros) => libros.id === doc.id);
        const librosQuantity = librosAddedToCart.count;

        if (stockDb >= librosQuantity) {
          batch.update(doc.ref, { stock: stockDb - librosQuantity });
        } else {
          outOfStock.push({ id: doc.id, ...dataDoc });
        }
      });
      console.log("outOfStock", outOfStock);
      if (outOfStock.length === 0) {
        await batch.commit();

        const orderRef = collection(db, "orders");

        const orderAddred = await addDoc(orderRef, objOrder);

        const { id } = orderAddred;
        setOrderId(id);
        clearCart();
        setTimeout(() => {
          navigate("/");
        }, 10000);
        console.log(id);
        console.log("compra: ", objOrder);
      } else {
        console.error("Hay LIBROS fuera de stock");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <div className="contenedor">
          <div className="contenedor-loader">
            <div className="rueda"></div>
          </div>
          <div className="cargando">Generando Orden...</div>
        </div>
      </>
    );
    
  }

  if ( orderId) {
    return (
      <>
        <div className="container rounded-4 my-5 pt-3 pb-2 px-2 bg-color text-align-center text-center">
          <h1 className="py-3">¡¡¡ Gracias por tu compra {buyer.name}!!!</h1>
          <img
            src="/assets/cart.png"
            alt="compra"
            width="150"
            height="150"
          />
          <div className="d-flex justify-content-center">
          <h2 className="py-3">El id de su compra es: <h3 className="text-danger">{orderId}</h3></h2>
          </div>
        </div>
      </>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container bg-color text-align-center text-center rounded-4 mt-5 pt-3 pb-2 px-4">
        <h1 className="cargando text-dark">
          No hay productos en el carrito
        </h1>
        <img
            src="/assets/carroVacio.png"
            alt="limpiar"
            width="150"
            height="150"
          />
      </div>
    );
  }

  console.log(buyer);
  const handleInputChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="text-center">
        <div className="container bg-color p-3 my-5">
          <div className="d-flex justify-content-center align-content-center">
            <h1 className="px-5">Checkout</h1>
          </div>
        </div>
        <div className="card pt-5">
          <form onSubmit={handleSubmit} >
            <div className="justify-content-center align-content-center d-flex">
              <div className="px-5">
                <img src="/assets/datosCliente.png" alt="cdatosCliente" width="250" height="250"/>
              </div>
              <div>
                <div className="form-group ">
                    <label className="form-label">Nombre Completo</label>
                    <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={buyer.name}
                    onChange={handleInputChange}
                    ></input>
                </div>
                <div className="form-group">
                    <label className="form-label">Telefono</label>
                    <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={buyer.phone}
                    onChange={handleInputChange}
                    ></input>
                </div>
                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={buyer.email}
                    onChange={handleInputChange}
                    ></input>
                </div>
              </div>
            </div>

            <div className="text-center m-2 ">
              <button
                className="shadow-lg p-3 mb-5 bg-body-tertiary rounded bg-color"
                onClick={createOrder}
              >
                <img
                  src="/assets/generarOrden.png"
                  alt="carroCompra"
                  width="60"
                  height="40"
                />
                Generar Orden
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
