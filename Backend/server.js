const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const Connection = require("./DB/connect.js")
const RouterDemo = require("./Router/Demo.router.js");


dotenv.config();


// Mongodb Connection Pendding
// Connection();



app.use(cors());
app.use(express.json());



// Router Call
app.use("/api", RouterDemo);



app.get("/", (req, res) => {
    try {
        res.status(200).json({
            message: `Server Started At PORT ${process.env.PORT}`
        })
    }
    catch (err) {
        res.status(500).json({
            message: `Server Start Error: ${err.message}`
        })
    }
})


PORT = process.env.PORT || 9000
app.listen(PORT, () => {
    console.log(`Server At Port ${process.env.PORT}`)
})