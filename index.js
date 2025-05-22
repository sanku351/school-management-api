import express from "express"
import dotenv from "dotenv"
import schoolRoutes from "./routes/schools.js"
import { connectDB } from "./config/db.js"

// Load environment variables
dotenv.config()

// Initialize express app
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api", schoolRoutes)

// Root route
app.get("/", (req, res) => {
  res.send("School Management API is running")
})

// Connect to database and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err)
    process.exit(1)
  })

export default app
