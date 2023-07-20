import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContex.jsx";
import axios from "axios";
import { proxy } from "../App.jsx";

export default function Header() {
    const { currentUser, logout } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(null);

    const myFunction = async () => {
        // run asynchronous tasks here
        if(currentUser){
            try{
                const isAdmin = await axios.get(`${proxy}/users/isAdmin`);
                setIsAdmin(isAdmin.data.isAdmin)
            } catch(err){
                console.log(err)
            }
        } else {
            setIsAdmin(null)
        }
    };
    
    useEffect(() => {
        myFunction();
    }, [currentUser]); // Note the curly braces around myFunction!
    return <>

        <nav className="header">
            <div className="header__logo">
                LOGO
            </div>
            <ul className="header__links">
                {
                    isAdmin && <li className="header__link">
                    <Link to={"/register"} >
                        Register
                    </Link>
                </li>
                }
                {
                    isAdmin && <li className="header__link">
                    <Link to={"/addCar"} >
                        Ajouter une voiture
                    </Link>
                </li>
                }
                <li className="header__link">
                    <Link to={"/"} >
                        Home
                    </Link>
                </li>
                <li className="header__link">
                    <Link to={"/revues"} >
                        Revues
                    </Link>
                </li>
                <li className="header__link">
                    <Link to={"/horaires"} >
                        Horaires d'ouverture
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