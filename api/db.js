import mysql from "mysql2";
import bcrypt from "bcryptjs";
import json from "./data.json" assert { type: "json" };
import dotenv from 'dotenv';
dotenv.config()

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_KEY,
  database: "garage"
})

// Create or check if a table exists in the database
const createTableIfNotExists = (tableName, sql) => {

  const createTableSQL = `CREATE TABLE IF NOT EXISTS ${tableName} ${sql}`;
  db.query(createTableSQL, (err, data) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log(`${tableName} table created or already exists`);
    }

  });
};

export const initTables = async () => {
  db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    db.query("CREATE DATABASE IF NOT EXISTS  garage", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  })

  return new Promise(async (resolve, reject) => {

    console.log('Creating tables in database...');

    // Create the "Admin" table
    createTableIfNotExists('Admin', `
        (
          id INT PRIMARY KEY AUTO_INCREMENT,
          nom VARCHAR(255),
          username VARCHAR(255),
          password VARCHAR(255)
        )
      `);

    // Create the "Employe" table
    createTableIfNotExists('Employe', `
        (
          id INT PRIMARY KEY AUTO_INCREMENT,
          nom VARCHAR(255),
          username VARCHAR(255),
          password VARCHAR(255)
        )
      `);

    // Create the "Voiture" table
    createTableIfNotExists('Voiture', `
        (
          id INT PRIMARY KEY AUTO_INCREMENT,
          nom VARCHAR(255),
          photo VARCHAR(255),
          km VARCHAR(255),
          annee VARCHAR(255),
          prix VARCHAR(255),
          description VARCHAR(255)
        )
      `);

    // Create the "Revues" table
    createTableIfNotExists('Revue', `
        (
          id INT PRIMARY KEY AUTO_INCREMENT,
          nom VARCHAR(255),
          commentaire VARCHAR(255),
          note INT,
          approuve BOOLEAN
        )
      `);

    // Create the "Horaires" table
    createTableIfNotExists('Horaires', `
        (
          id INT AUTO_INCREMENT PRIMARY KEY,
          jour_semaine VARCHAR(20) NOT NULL,
          heure_ouverture TIME,
          heure_fermeture TIME
        )
      `);

    resolve(true);
  })

}

const insertIntoTable = (q, value) => {

  db.query(q, [value], (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Data has been inserted.");
  })
}

const checkIfExistInTable = (username, table, column) => {
  return new Promise((resolve, reject) => {
    const q = `SELECT * FROM ${table} WHERE ${column}=?`;
    db.query(q, [username], (err, data) => {
      if (err) {
        console.log('error', err)
        reject(err);
      } else {
        resolve(data.length > 0);
      }
    });
  });
};

export const initData = async () => {
  console.log('Injecting data to tables...');

  const salt = bcrypt.genSaltSync(10);

  // Insert into admin
  const adminHash = bcrypt.hashSync(process.env.ADMIN_PWD, salt);
  const adminQuery = "INSERT INTO admin(`nom`,`username`,`password`) VALUES (?)";
  const adminValues = ["Vincent Parrot", "admin", adminHash];
  try {
    const adminExist = await checkIfExistInTable("admin", "admin", "username");
    if (!adminExist) {
      insertIntoTable(adminQuery, adminValues);
    }
  } catch (err) {
    console.error(err);
  }

  //Insert into employe
  const employeHash = bcrypt.hashSync("employe", salt);
  const employeQuery = "INSERT INTO employe(`nom`,`username`,`password`) VALUES (?)";
  const employeValues = ["Marwan", "employe", employeHash];
  try {
    const employeExist = await checkIfExistInTable("employe", "employe", "username");
    if (!employeExist) {
      insertIntoTable(employeQuery, employeValues);
    }
  } catch (err) {
    console.error(err);
  }

  //Insert into Horaires
  const horairesQuery = "INSERT INTO horaires (jour_semaine, heure_ouverture, heure_fermeture) VALUES (?)";
  const horairesValues = [['Lundi', '08:00:00', '18:00:00'],
  ['Mardi', '08:00:00', '18:00:00'],
  ['Mercredi', '08:00:00', '18:00:00'],
  ['Jeudi', '08:00:00', '18:00:00'],
  ['Vendredi', '08:00:00', '18:00:00'],
  ['Samedi', '09:00:00', '13:00:00'],
  ['Dimanche', null, null]];
  horairesValues.map(async (item, key)=>{
    try {
      const horairesExist = await checkIfExistInTable(item[0], "horaires", "jour_semaine");
      if (!horairesExist) {
        insertIntoTable(horairesQuery, item);
      }
    } catch (err) {
      console.error(err);
    }
  })

  //Insert into voiture
  json.data.voitures.map(async (item, key) => {
    const voitureQuery = "INSERT INTO voiture(`nom`,`photo`,`km`, `annee`,`prix`,`description`) VALUES (?)";
    const voitureValues = [
      item.nom,
      item.photo,
      item.km,
      item.annee,
      item.prix,
      item.description
    ]
    try {
      const voitureExist = await checkIfExistInTable(item.nom, "voiture", "nom");
      if (!voitureExist) {
        insertIntoTable(voitureQuery, voitureValues);
      }
    } catch (err) {
      console.error(err);
    }
  });

  //Insert into revues
  json.data.revues.map(async (item, key) => {
    const commentaireQuery = "INSERT INTO revue(`nom`,`commentaire`,`note`, `approuve`) VALUES (?)";
    const commentaireValues = [
      item.nom,
      item.commentaire,
      item.note,
      item.approuve,
    ]
    try {
      const commentaireExist = await checkIfExistInTable(item.nom, "revue", "nom");
      if (!commentaireExist) {
        insertIntoTable(commentaireQuery, commentaireValues);
      }
    } catch (err) {
      console.error(err);
    }
  });

}

