import mongoose from "mongoose";
import app from "./app.js";
import {mongo_url} from './config/mongo.config.js'

mongoose.connect(mongo_url.url).then(()=>console.log('Database connected')).catch((e)=>{
    console.log('Failed to connect database ',e);
})
app.listen(process.env.PORT,()=>console.log('Server running at ',process.env.PORT))