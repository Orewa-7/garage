import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { proxy } from "../../App.jsx";
import axios from "axios";
import { AuthContext } from "../../context/AuthContex.jsx";

export default function AddRevue() {
    const [inputs, setInputs] = useState({
        nom: "",
        commentaire: "",
        note: "",
    });

    const [err, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${proxy}/revues`, inputs);
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
                    placeholder="nom"
                    name="nom"
                    onChange={handleChange}
                />
                <input
                    required
                    type="text"
                    placeholder="commentaire"
                    name="commentaire"
                    onChange={handleChange}
                />
                <input
                    required
                    type="number"
                    min={0}
                    max={5}
                    step={.25}
                    placeholder="note"
                    name="note"
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Register</button>
                {err && <p>{err}</p>}
            </form>
        </section>

    </>
}
