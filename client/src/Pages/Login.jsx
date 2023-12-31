import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContex.jsx";

export default function Login() {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });
    const [err, setError] = useState(null);

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);


    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(inputs)
            navigate("/");
        } catch (err) {
            setError(err.response.data);
        }
    };

    return <>
    <section className="login">
        <form>
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
            <button onClick={handleSubmit}>Login</button>
            {err && <p>{err}</p>}
        </form>
    </section>
    </>
}
