import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getApprouvedRevue = (req, res) => {
    const q = "SELECT * FROM revue WHERE approuve = 1";

    db.query(q, [req.query.cat], (err, data) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json(data);
    });
};

export const getAllRevue = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "employe", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        const q = "SELECT * FROM revue";

        db.query(q, [req.query.cat], (err, data) => {
            if (err) return res.status(500).send(err);

            return res.status(200).json(data);
        });
    })
};

export const addRevue = (req, res) => {
    const q =
        "INSERT INTO revue(`nom`, `commentaire`, `note`, `approuve`) VALUES (?)";

    const values = [
        req.body.nom,
        req.body.commentaire,
        req.body.note,
        0,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Car has been created.");
    });
};

export const deleteRevue = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "employe", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const revueID = req.params.id;
        const q = "DELETE FROM revue WHERE `id` = ?";

        db.query(q, [revueID], (err, data) => {
            if (err) return res.status(403).json("You have to be an employe!");

            return res.json("revue has been deleted!");
        });
    });
};

export const ApprouveRevue = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "employe", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const revueId = req.params.id;
        const q =
            "UPDATE revue SET `approuve`=1  WHERE `id` = ?";

        const values = [revueId];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("revue has been updated.");
        });
    });
};
