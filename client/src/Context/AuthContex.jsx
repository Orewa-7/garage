import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { proxy } from "../App.jsx";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    axios.defaults.withCredentials = true;

    const login = async (inputs) => {
        const res = await axios.post(`${proxy}/auth/login`, inputs);
        setCurrentUser(res.data);
    };

    const logout = async (inputs) => {
        await axios.post(`${proxy}/auth/logout`);
        setCurrentUser(null);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
