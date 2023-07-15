import mysql from "mysql";
import bcrypt from "bcryptjs";
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
    createTableIfNotExists('Revues', `
        (
          id INT PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(255),
          commentaire VARCHAR(255),
          note INT,
          approuve BOOLEAN
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

const checkIfExistInTable = (username, table) => {
  return new Promise((resolve, reject) => {
    const q = `SELECT * FROM ${table} WHERE username=?`;
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
  const adminHash = bcrypt.hashSync("admin", salt);
  const adminQuery = "INSERT INTO admin(`nom`,`username`,`password`) VALUES (?)";
  const adminValues = ["Vincent Parrot", "admin", adminHash];
  try {
    const adminExist = await checkIfExistInTable("admin", "admin");
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
    const employeExist = await checkIfExistInTable("employe", "employe");
    if (!employeExist) {
      insertIntoTable(employeQuery, employeValues);
    }
  } catch (err) {
    console.error(err);
  }

  //Insert into voiture
  //Insert into revues

}

