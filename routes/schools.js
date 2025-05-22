import express from "express"
import { addSchool, listSchools } from "../controllers/schoolController.js"
import { validateAddSchool, validateListSchools } from "../middleware/validation.js"

const router = express.Router()

// Add school route
router.post("/addSchool", validateAddSchool, addSchool)

// List schools route
router.get("/listSchools", validateListSchools, listSchools)

export default router
