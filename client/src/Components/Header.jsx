import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContex.jsx";

export default function Header() {

    const { currentUser, logout } = useContext(AuthContext);


    return <>

        <nav className="header">
            <div className="header__logo">
                LOGO
            </div>
            <ul className="header__links">
                <li className="header__link">
                    <Link to={"/register"} >
                        Register
                    </Link>
                </li>
                <li className="header__link">
                    <Link to={"/"} >
                        Home
                    </Link>
                </li>
                <li className="header__link">
                    {
                        currentUser ?
                            <span onClick={logout}>Logout</span>
                            :
                            <Link to={"/login"} >
                                Login
                            </Link>
                    }
                </li>
            </ul>
        </nav>
    </>
}