import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { proxy } from '../../App.jsx'
import axios from "axios";

export default function UpdateCar({ carDetails, voitureId, isAdmin }) {
    const [inputs, setInputs] = useState({
        nom: carDetails.nom,
        photo: carDetails.photo,
        km: carDetails.km,
        annee: carDetails.annee,
        prix: carDetails.prix,
        description: carDetails.description,
    });

    const [err, setError] = useState(null);
    const [isAdminChecked, setIsAdminCheked] = useState(false);

    const navigate = useNavigate();

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
            await axios.put(`${proxy}/voitures/${voitureId}`, inputs);
            navigate(0);
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
                        value={inputs.nom}
                        />
                    <input
                        required
                        type="text"
                        placeholder="photo"
                        name="photo"
                        onChange={handleChange}
                        value={inputs.photo}
                        />
                    <input
                        required
                        type="text"
                        placeholder="km"
                        name="km"
                        onChange={handleChange}
                        value={inputs.km}
                        />
                    <input
                        required
                        type="text"
                        placeholder="annee"
                        name="annee"
                        onChange={handleChange}
                        value={inputs.annee}
                        />
                    <input
                        required
                        type="text"
                        placeholder="prix"
                        name="prix"
                        onChange={handleChange}
                        value={inputs.prix}
                        />
                    <input
                        required
                        type="text"
                        placeholder="description"
                        name="description"
                        onChange={handleChange}
                        value={inputs.description}
                    />
                    <button onClick={handleSubmit}>Update</button>
                    {err && <p>{err}</p>}
                </form>
            </section>
        }
    </>
}
