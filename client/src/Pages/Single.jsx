import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { proxy } from "../App.jsx";
import { AuthContext } from "../context/AuthContex.jsx";



export default function Single() {
    const [voiture, setVoiture] = useState({});

    const location = useLocation();
    const navigate = useNavigate();

    const voitureId = location.pathname.split("/")[2];

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${proxy}/voitures/${voitureId}`);
                setVoiture(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [voitureId]);

    const handleDelete = async () => {
        try {
            await axios.delete(`${proxy}/posts/${voitureId}`);
            navigate("/")
        } catch (err) {
            console.log(err);
        }
    }

    return <>
        <section className="single">
        <div className="single__voiture" key={voiture.id}>
                    <div className="img">
                        <img src={voiture.photo} alt="" />
                    </div>
                    <div className="content">
                        <Link className="link" to={`/voiture/${voiture.id}`}>
                            <h1>{voiture.nom}</h1>
                        </Link>
                        <p>{voiture.description}</p>
                        <p>{voiture.prix}</p>
                        <p>{voiture.annee}</p>
                        <p>{voiture.km}</p>
                    </div>
                </div>
        </section>
    </>
}