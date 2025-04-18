import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
// import "dotenv/config"
const MONGODB_URL="mongodb+srv://Tayyabakhatri:1234567890@cluster0.4piwx.mongodb.net/finalHackathonDB?retryWrites=true&w=majority&appName=Cluster0"
// const url = process.env.MONGODB_URL
// console.log(typeof url);

// console.log("mongo db url",url);
import chalk from "chalk";
const connectedToDb = async () => {
    mongoose.connection.on("connected", () => console.log("✅ DB Connected"));

    try {
        await mongoose.connect(MONGODB_URL, { dbname: "finalHackathonDB" });
        console.log(chalk.bgBlue.white("✅ Connected to MongoDB finalHackathonDB"));
    } catch (error) {
        console.error(chalk.bgRed.white("❌ Error connecting to MongoDB:"), error.message);
        process.exit(1); // Exit the process on connection failure
    }
};
export default connectedToDb;