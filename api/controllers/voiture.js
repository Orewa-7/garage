import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getVoitures = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM voiture WHERE cat=?"
    : "SELECT * FROM voiture";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getVoiture = (req, res) => {
  const q =
    "SELECT * FROM voiture WHERE id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addVoiture = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "admin", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO voiture(`nom`, `photo`, `km`, `annee`, `prix`,`description`) VALUES (?)";

    const values = [
      req.body.nom,
      req.body.photo,
      req.body.km,
      req.body.annee,
      req.body.prix,
      req.body.description,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Car has been created.");
    });
  });
};

export const deleteVoiture = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "admin", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const voitureId = req.params.id;
    const q = "DELETE FROM voiture WHERE `id` = ?";

    db.query(q, [voitureId], (err, data) => {
      if (err) return res.status(403).json("You can delete only your car!");

      return res.json("Car has been deleted!");
    });
  });
};

export const updateVoiture = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "admin", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const voitureId = req.params.id;
    const q =
      "UPDATE voiture SET `nom`=?,`photo`=?,`km`=?,`annee`=?,`prix`=?,`description`=?  WHERE `id` = ?";

    const values = [req.body.nom, req.body.photo, req.body.km, req.body.anne, req.body.prix, req.body.description];

    db.query(q, [...values, voitureId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("voiture has been updated.");
    });
  });
};
