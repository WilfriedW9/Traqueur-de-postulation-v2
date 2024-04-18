// Ce fichier sert a établir une connexion entre mySql et Node
import mysql from "mysql2"
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path, { dirname } from "path"
import { fileURLToPath } from 'url';
dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connection au serveur MySQL
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
})




const app = express()
app.use(cors())
app.use(express.json())


// API
app.use(express.static(path.join(__dirname, "..", "client")))

app.get("/candidatures", (req, res) => {
    const query = "SELECT * FROM ctracker.candidatures;"
    db.query(query,(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})



app.listen(process.env.PORT, ()=> {
    console.log("App running at http://localhost:"+ process.env.PORT)
})


