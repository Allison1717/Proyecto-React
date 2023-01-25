import { Link } from "react-router-dom";
import "./navBar.css";

function NavBar(props) {
  const {clicOnChart}=props
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
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
          <div className="text-center text-light  ">
            <h1 className="letraNavBar colorGreeting">¡Bienvenidos lectores!</h1>
          </div>
          <div
            className="collapse navbar-collapse justify-content-center "
            id="navbarNav"
          >
            <ul className="navbar-nav align-items-center text-center">
              <li className="nav-item">
                <Link to="/"
                  className="nav-link active letraNavBar fs-5"
                  aria-current="page"
                
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link letraNavBar fs-5" to={"/gender/mangas"}
                  
                >
                  Mangas 
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link letraNavBar fs-5" to={"/gender/comics"}
                  
                >
                  Cómics
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  className="nav-link letraNavBar fs-5" to="/gender/librosJuveniles"
                 
                >
                  Libros Juveniles
                </Link>
              </li>              
              <li className="nav-item">
                <Link
                  className="nav-link letraNavBar fs-5"  to="/gender/terror"
                 
                >
                  Terror
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/carroCompra"
                  className="nav-link letraNavBar fs-5"
                  
                >
                  <div className="position-relative">
                  <img
                    src="/assets/carroCompra.png"
                    alt=""
                    width="70"
                    height="70"
                    className="d-inline-block align-text-top"
                  />
                  <span className="position-absolute text-center bg-danger rounded-circle"><h5>{clicOnChart}</h5></span>
                  </div>
                </Link>
                
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
