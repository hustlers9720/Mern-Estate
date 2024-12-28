import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js'
import path from 'path';

// "dev" :"nodemon api/index.js",
//"start" :"node api/index.js",
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to Mongo db");
    
}).catch((err)=>{
        console.log(err);
        
})

const __dirname = path.resolve()

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.listen(3000 , ()=>{
    console.log("server is running ....");
    
})
// req will get from client
// res will get from server side 
app.use("/api/user" , userRouter)
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);


app.use(express.static(path.join(__dirname, '/src/dist')));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'src' ,'dist' ,'index.html'));
  });


app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500 ;
    const message = err.message || 'Internal Server error';
    return res.status(statusCode).json({
        success: false,
        statusCode ,
        message,
    
    })
})