import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getHoraires = (req, res) => {
        const q = "SELECT * FROM horaires";

        db.query(q, [req.query.cat], (err, data) => {
            if (err) return res.status(500).send(err);

            return res.status(200).json(data);
        });
};

export const updatehoraires = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "admin", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const revueId = req.params.id;
        const q =
            "UPDATE revue SET `approuve`=1  WHERE `id` = ?";

        const values = [revueId];

        // db.query(q, [values], (err, data) => {
        //     if (err) return res.status(500).json(err);
        //     return res.json("revue has been updated.");
        // });
    });
};
