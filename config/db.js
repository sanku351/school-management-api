import mysql from "mysql2/promise"
import dotenv from "dotenv"

dotenv.config()

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "school_management",
}

// Database connection pool
let pool

// Connect to database
export const connectDB = async () => {
  try {
    pool = mysql.createPool(dbConfig)

    // Test connection
    const connection = await pool.getConnection()
    console.log("MySQL database connected successfully")

    // Create schools table if it doesn't exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log("Schools table initialized")

    connection.release()
    return pool
  } catch (error) {
    console.error("Database connection failed:", error)
    throw error
  }
}

// Get database connection
export const getDB = () => {
  if (!pool) {
    throw new Error("Database not initialized. Call connectDB first.")
  }
  return pool
}
