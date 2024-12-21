import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import cookieParser from "cookie-parser";
import userRoute from "./route/userRoute.js";
import productRoute from "./route/productRoute.js";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
const app = express();
  

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  timeout: 6000000,
});

connectDB();
const _dirname = path.resolve();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user', userRoute);
app.use('/api/p', productRoute);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(_dirname, '/Frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(_dirname, 'Frontend', 'dist', 'index.html'));
    })
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`http://localhost:${port}`));
