import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { proxy } from "../App.jsx";
import axios from "axios";
import { AuthContext } from "../context/AuthContex.jsx";

export default function addCar() {
    const [inputs, setInputs] = useState({
        nom: "",
        photo: "",
        km: "",
        annee: "",
        prix: "",
        description: "",
    });

    const [err, setError] = useState(null);
    const [isAdminChecked, setIsAdminCheked] = useState(false);

    const navigate = useNavigate();

    const { isAdmin } = useContext(AuthContext);

    const CheckIfIsAdmin = async () => {
        const admin = await isAdmin()
        !admin && navigate("/");
        setIsAdminCheked(true);
    }

    useLayoutEffect(() => {
        CheckIfIsAdmin()
    }, [])


    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${proxy}/voitures`, inputs);
            navigate("/");
        } catch (err) {
            setError(err.response.data);
        }
    };
    return <>
        {
            isAdminChecked && <section className="register">
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
                        placeholder="photo"
                        name="photo"
                        onChange={handleChange}
                    />
                    <input
                        required
                        type="text"
                        placeholder="km"
                        name="km"
                        onChange={handleChange}
                    />
                    <input
                        required
                        type="text"
                        placeholder="annee"
                        name="annee"
                        onChange={handleChange}
                    />
                    <input
                        required
                        type="text"
                        placeholder="prix"
                        name="prix"
                        onChange={handleChange}
                    />
                    <input
                        required
                        type="text"
                        placeholder="description"
                        name="description"
                        onChange={handleChange}
                    />
                    <button onClick={handleSubmit}>Register</button>
                    {err && <p>{err}</p>}
                </form>
            </section>
        }
    </>
}
