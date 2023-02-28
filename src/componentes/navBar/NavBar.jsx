import { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../storage/cartContext";
import "./navBar.css";
import CartWidget from "./CartWidget";


function NavBar({ onLogin }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    let username = evt.target.elements[0].value;
    onLogin(username);
  }

  const { totalQuantity } = useContext(cartContext);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
          <Link to="/#" className="navbar-brand">
            <img
              src="/assets/logoLaCasaDelLibro.png"
              alt=""
              width="180"
              height="150"
              className="d-inline-block align-text-top"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="text-center text-light">
            <h1 className="letraNavBar colorGreeting">
              ¡Bienvenidos lectores!
            </h1>
          </div>
          <div
            className="collapse navbar-collapse justify-content-center "
            id="navbarNav"
          >
            <ul className="navbar-nav align-items-center text-center">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link active letraNavBar fs-5"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link letraNavBar fs-5" to="/gender/Mangas">
                  Mangas
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link letraNavBar fs-5" to="/gender/Cómics">
                  Cómics
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link letraNavBar fs-5"
                  to="/gender/Libros-Juveniles"
                >
                  Libros-Juveniles
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link letraNavBar fs-5" to="/gender/Terror">
                  Terror
                </Link>
              </li>
              
                <form onSubmit={handleSubmit}>
                
                    <input
                      className="p-2 mb-3"
                      name="username"
                      placeholder="username"
                    />
               
                  <button
                    type="submit"
                    className="letraNavBar butonLogin py-2 px-5 mb-3"
                  >
                    Login
                  </button>
                </form>
         

              <li className="nav-item">
                <CartWidget totalQuantity={totalQuantity}/>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
