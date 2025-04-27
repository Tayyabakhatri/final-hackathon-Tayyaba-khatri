import express from "express"
import cors from "cors"
import path from "path"
import connectedToDb from "./db/db.js"
import userRoutes from "./Routes/userRoutes.js"
import taskRoutes from "./Routes/taskRoutes.js"
import "dotenv/config"

const baseUrl = process.env.BASE_URL
console.log("Base URL:", baseUrl); // Log the base URL for debugging


const app = express()
app.use(express.json())
const port = process.env.PORT || 3000


app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', "https://final-hackathon-tayyaba-khatri-production.up.railway.app"],
    methods: ["GET", "PUT", 'POST', "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}))

const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, "/dist")))

connectedToDb()

app.use('/api/auth', userRoutes)
app.use('/api/tasks',taskRoutes)


// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

