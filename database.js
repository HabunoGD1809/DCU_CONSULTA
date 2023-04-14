// Importar las dependencias
const express = require("express");
const fs = require("fs");

// Crear una instancia de Express
const app = express();
const PORT = 3000;

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Ruta para cargar la base de datos
app.get("/database", (req, res) => {
  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error al cargar la base de datos:", err);
      res.status(500).send("Error al cargar la base de datos");
    } else {
      const database = JSON.parse(data);
      res.json(database);
    }
  });
});

// Ruta para guardar la base de datos
app.put("/database", (req, res) => {
  const database = req.body;
  const jsonDatabase = JSON.stringify(database);

  fs.writeFile("database.json", jsonDatabase, "utf8", (err) => {
    if (err) {
      console.error("Error al guardar la base de datos:", err);
      res.status(500).send("Error al guardar la base de datos");
    } else {
      res.json({ message: "Base de datos guardada correctamente" });
    }
  });
});

// Ruta para registrar datos en la base de datos
app.post("/database", (req, res) => {
  const record = req.body;

  fs.readFile("database.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error al cargar la base de datos:", err);
      res.status(500).send("Error al cargar la base de datos");
    } else {
      const database = JSON.parse(data);
      database.push(record);

      const
