import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

const handleOpen = () => console.log("✅Connted to DB");
const handleError = (error) => console.log(`❌Connecion ${error}`);

db.on("error", handleError);
db.once("open", handleOpen);
