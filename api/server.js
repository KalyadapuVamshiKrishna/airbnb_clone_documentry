import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import helmet from "helmet"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

import auth from "./routes/auth"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        credentials: true,
        origin: process.env.CLIENT_URL
    }
));


app.use("/api", auth);



// app.listen(3000,()=> console.log("Server is running on Port 3000"))
async function StartServer(){
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected");
        const PORT = process.env.PORT ||  3000;
        app.listen(PORT,  ()=> console.log(`Server is running on ${PORT}`));
    }
    catch(err){
        console.error("Failed to connect to MongoDB", err);
    }
}

StartServer();