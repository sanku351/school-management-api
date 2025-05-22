import { getDB } from "../config/db.js"
import { calculateDistance } from "../utils/distance.js"

// Add a new school
export const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body

    const db = getDB()
    const [result] = await db.query("INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)", [
      name,
      address,
      latitude,
      longitude,
    ])

    res.status(201).json({
      success: true,
      message: "School added successfully",
      data: {
        id: result.insertId,
        name,
        address,
        latitude,
        longitude,
      },
    })
  } catch (error) {
    console.error("Error adding school:", error)
    res.status(500).json({
      success: false,
      message: "Failed to add school",
      error: error.message,
    })
  }
}

// List all schools sorted by proximity
export const listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query
    const userLat = Number.parseFloat(latitude)
    const userLng = Number.parseFloat(longitude)

    const db = getDB()
    const [schools] = await db.query("SELECT * FROM schools")

    // Calculate distance for each school and add it as a property
    const schoolsWithDistance = schools.map((school) => {
      const distance = calculateDistance(userLat, userLng, school.latitude, school.longitude)

      return {
        ...school,
        distance: Number.parseFloat(distance.toFixed(2)), // Round to 2 decimal places
      }
    })

    // Sort schools by distance (closest first)
    schoolsWithDistance.sort((a, b) => a.distance - b.distance)

    res.status(200).json({
      success: true,
      count: schoolsWithDistance.length,
      data: schoolsWithDistance,
    })
  } catch (error) {
    console.error("Error listing schools:", error)
    res.status(500).json({
      success: false,
      message: "Failed to list schools",
      error: error.message,
    })
  }
}
