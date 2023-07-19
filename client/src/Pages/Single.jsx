import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { proxy } from "../App.jsx";
import { AuthContext } from "../context/AuthContex.jsx";
import UpdateCar from "../Components/Cars/UpdateCar.jsx";



export default function Single() {
    const [voiture, setVoiture] = useState({});

    const location = useLocation();
    const navigate = useNavigate();

    const voitureId = location.pathname.split("/")[2];
    const [isAdminChecked, setIsAdminCheked] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);


    const { currentUser, isAdmin } = useContext(AuthContext);

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

    const CheckIfIsAdmin = async () => {
        const admin = await isAdmin()
        setIsAdminCheked(admin);
    }

    useEffect(() => {
        CheckIfIsAdmin()
    }, [currentUser])

    const handleDelete = async () => {
        try {
            await axios.delete(`${proxy}/voitures/${voitureId}`);
            navigate("/")
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdate = () => {
        setIsUpdating(!isUpdating);
    }

    return <>
        <section className="single">
        <div className="single__voiture" key={voiture.id}>
                    <div className="img">
                        <img src={voiture.photo} alt="" />
                    </div>
                    {
                        isAdminChecked && <>
                            <span onClick={handleDelete}>
                                Delete
                            </span>
                            <span onClick={handleUpdate}>
                                Update 
                            </span>
                        </>
                    }
                    {
                        isUpdating && <div className="updating">
                            <UpdateCar carDetails={voiture} voitureId={voitureId} isAdmin={isAdmin}/>
                        </div>
                    }
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
