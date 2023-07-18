import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { proxy } from "../App.jsx";
import axios from "axios";

export default function Register() {
    const [inputs, setInputs] = useState({
        username: "",
        name: "",
        password: "",
    });

    const [err, setError] = useState(null);

    const navigate = useNavigate();


    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${proxy}/auth/register`, inputs);
            navigate("/");
        } catch (err) {
            setError(err.response.data);
        }
    };
    return <>
        <section className="register">
            <form>
                <input
                    required
                    type="text"
                    placeholder="name"
                    name="name"
                    onChange={handleChange}
                />
                <input
                    required
                    type="text"
                    placeholder="username"
                    name="username"
                    onChange={handleChange}
                />
                <input
                    required
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Register</button>
                {err && <p>{err}</p>}
            </form>
        </section>
    </>
}
