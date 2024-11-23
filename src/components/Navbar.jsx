import { Link } from "react-router-dom";
import "../style/Navbar.css";
import { useAuth } from "../Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
function Navbar() {
  const { isAutheticated, ExitSignin } = useAuth();
  return (
    <div>
      {isAutheticated ? (
        <>
          <nav className="navbar">
            <div className="title-navbar">
              <Link to="/home" className="link">
                <h2>GYMBUNKER</h2>
              </Link>
            </div>
            <div className="navbar-content">
              <ul className="list-navbar-content">
                <li className="lista-navbar">
                  <Link to="/home" className="link">
                    Home
                  </Link>
                </li>
                <li className="lista-navbar">
                  <Link to="/search" className="link">
                    Buscar
                  </Link>
                </li>
                <li className="lista-navbar">
                  <Link to="/register" className="link">
                    Registrar
                  </Link>
                </li>
                <li className="lista-navbar">
                  <Link
                    to="/"
                    onClick={() => {
                      ExitSignin();
                    }}
                    className="link"
                  >
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      className="icons-navbar"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
export default Navbar;
