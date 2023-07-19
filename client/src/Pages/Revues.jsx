import { useContext, useEffect, useState } from "react";
import { proxy } from "../App.jsx";
import { AuthContext } from "../context/AuthContex.jsx";
import axios from "axios";
import AddRevue from "../Components/Revues/AddRevue.jsx";

export default function Revue() {
    const [revues, setRevues] = useState([]);
    const [isEmployeChecked, setIsEmployeCheked] = useState(false)
    const [notification, setNotification] = useState(null)

    const { currentUser, isEmploye } = useContext(AuthContext);


    useEffect(() => {
        const fetchData = async () => {
            const isEmployed = await isEmploye();
            setIsEmployeCheked(true);
            if (isEmployed) {
                try {
                    const res = await axios.get(`${proxy}/revues/all`);
                    setRevues(res.data);
                } catch (err) {
                    console.log(err);
                }
            } else {
                try {
                    const res = await axios.get(`${proxy}/revues`);
                    setRevues(res.data);
                } catch (err) {
                    console.log(err);
                }
            }
        };
        fetchData();
    }, [currentUser, notification]);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${proxy}/revues/${id}`);
            setNotification(res.data);
        } catch (err) {
            console.log(err);
        }

    }

    const handleApprouve = async (id) => {
        try {
            const res = await axios.put(`${proxy}/revues/${id}`);
            setNotification(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    return <>
        <section className="revues">
            <AddRevue />
            {isEmployeChecked && revues.length && revues.map((item) => {
                return <>
                    <div key={item.id}>
                        <h1>
                            {item.nom}
                        </h1>
                        {
                            isEmploye && <div>
                                <span onClick={() => handleDelete(item.id)}>
                                    delete
                                </span>
                                {
                                    item.approuve == 0 && <span onClick={() => handleApprouve(item.id)}>
                                        approuve
                                    </span>
                                }
                            </div>
                        }
                        {notification && <span>{notification}</span>}
                        <p>
                            {item.commentaire}
                        </p>
                        <p>
                            {item.note}
                        </p>
                    </div>
                </>
            })
            }
        </section>
    </>
}