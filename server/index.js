const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3000;
const URI = 'mongodb://root:micontrasenia@database:27017/mibasededatos?authSource=admin'

// Conexión a la base de datos MongoDB
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexión exitosa a MongoDB');
    })
    .catch((error) => {
        console.log('Error al conectar a MongoDB:', error);
    });

//Conexión a la base de datos Mysql
function createConnection() {
    const connection = mysql.createConnection({
        host: process.env.DATABASE_HOST || 'localhost',
        user: process.env.DATABASE_USER || 'root',
        password: process.env.DATABASE_PASSWORD || 'secret',
        database: process.env.DATABASE_NAME || 'test'
        })    

    return connection
};
createConnection();

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});