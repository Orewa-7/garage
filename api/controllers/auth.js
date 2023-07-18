import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //CHECK EXISTING USER in Admin
  const q = "SELECT * FROM admin WHERE nom = ? OR username = ?"
  db.query(q, [req.body.name, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User Exist as Admin!");

    //Check existing user in employe
    const q = "SELECT * FROM employe WHERE nom = ? OR username = ?";
    db.query(q, [req.body.name, req.body.username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("User already exists!");

      //Hash the password and create a user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const q = "INSERT INTO employe(`nom`,`username`,`password`) VALUES (?)";
      const values = [req.body.name, req.body.username, hash];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User has been created.");
      });
    });
  })

};

export const login = (req, res) => {
  

  const q = "SELECT * FROM admin WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      //CHECK employe
      const q = "SELECT * FROM employe WHERE username = ?";
      db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        //Check password
        const isPasswordCorrect = bcrypt.compareSync(
          req.body.password,
          data[0].password
        );

        if (!isPasswordCorrect)
          return res.status(400).json("Wrong username or password!");

        const token = jwt.sign({ id: data[0].id, isAdmin: false }, "employe");
        const { password, ...other } = data[0];
        const informations = {
          infos: other,
          isAdmin: false
        }

        return res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json(informations);
      });
    } else {
      //CHECK Admin
      //Check password
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
  
      if (!isPasswordCorrect)
        return res.status(400).json("Wrong username or password!");
  
      const token = jwt.sign({ id: data[0].id, isAdmin: true }, "admin");
      const { password, ...other } = data[0];
      const informations = {
        infos: other,
        isAdmin: true
      }
  
      return res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(informations);
    }
  });

};

export const logout = (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true
  }).status(200).json("User has been logged out.")
};
