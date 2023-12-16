const express= require ("express");
const morgan= require("morgan");
const cors= require("cors");
const bodyParser= require("body-parser");
const colors= require("colors");
const dotenv= require("dotenv");
const connectDB=require("./config/db");
//routes path
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorMiddleware");

//dotenv
dotenv.config()
connectDB();
//rest object

const app=express();

//middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use(errorHandler)

//api routes
app.use("/api/v1/auth",authRoutes);
//listen server by npm run server
app.listen(8080,()=>{
    console.log("Server Running on in dev mode in port number 8080");
})