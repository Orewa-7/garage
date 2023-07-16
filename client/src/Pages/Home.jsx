import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { proxy } from "../App.jsx";

export default function Home() {
    const [voitures, setVoitures] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${proxy}/voitures`);
                setVoitures(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return <>
        <section className="home">
            {voitures.map((voiture) => (
                <div className="home__voiture" key={voiture.id}>
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
                        <button>Read More</button>
                    </div>
                </div>
            ))}
        </section>
    </>
}
