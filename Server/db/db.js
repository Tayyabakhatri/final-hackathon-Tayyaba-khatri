import mongoose from "mongoose";
import "dotenv/config"
// const url = process.env.MONGODB_URL
// console.log(url);
import chalk from "chalk";
const connectedToDb = async () => {
    // mongoose.connection.on("connected", () => console.log("✅ DB Connected"));

    try {
        await mongoose.connect(process.env.MONGODB_URL, { dbname: "finalHackathonDB" });
        console.log(chalk.bgBlue.white("✅ Connected to MongoDB finalHackathonDB"));
    } catch (error) {
        console.error(chalk.bgRed.white("❌ Error connecting to MongoDB:"), error.message);
        process.exit(1); // Exit the process on connection failure
    }
};
export default connectedToDb;