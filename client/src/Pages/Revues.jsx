import { useContext, useEffect, useState } from "react";
import { proxy } from "../App.jsx";
import { AuthContext } from "../context/AuthContex.jsx";
import axios from "axios";

export default function Revue(){
    const [revues, setRevues] = useState([]);
    const [isEmployeChecked, setIsEmployeCheked] = useState(false)

    const { currentUser, isEmploye } = useContext(AuthContext);


    useEffect(() => {
        const fetchData = async () => {
            const isEmployed = await isEmploye();
            setIsEmployeCheked(true);
            if(isEmployed) {
                console.log(isEmployed)
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
    }, [currentUser]);

    return <>
        <section className="revues">
            { isEmployeChecked && revues.map((item) => {
                    return <>
                    <div key={item.id}>
                        <h1>
                            {item.nom}
                        </h1>
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