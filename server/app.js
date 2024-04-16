import express from "express";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
dotenv.config();

import dbService from "./dbService"

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// create
app.post("/insert", (req, res) => {

})






// read
app.get("/getAll", (request, response) => {
    console.log("test");
    response.json({
        success: true
    })
})




// update






// delete


app.listen(process.env.PORT, () => console.log(`app is running on port http://localhost:${process.env.PORT}`))