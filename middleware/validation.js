// Validation middleware for school APIs
export const validateAddSchool = (req, res, next) => {
  const { name, address, latitude, longitude } = req.body
  const errors = []

  // Validate name
  if (!name || name.trim() === "") {
    errors.push("School name is required")
  }

  // Validate address
  if (!address || address.trim() === "") {
    errors.push("School address is required")
  }

  // Validate latitude
  if (latitude === undefined || latitude === null) {
    errors.push("Latitude is required")
  } else {
    const lat = Number.parseFloat(latitude)
    if (isNaN(lat) || lat < -90 || lat > 90) {
      errors.push("Latitude must be a valid number between -90 and 90")
    }
  }

  // Validate longitude
  if (longitude === undefined || longitude === null) {
    errors.push("Longitude is required")
  } else {
    const lng = Number.parseFloat(longitude)
    if (isNaN(lng) || lng < -180 || lng > 180) {
      errors.push("Longitude must be a valid number between -180 and 180")
    }
  }

  // Return errors if any
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    })
  }

  next()
}

export const validateListSchools = (req, res, next) => {
  const { latitude, longitude } = req.query
  const errors = []

  // Validate latitude
  if (!latitude) {
    errors.push("Latitude is required")
  } else {
    const lat = Number.parseFloat(latitude)
    if (isNaN(lat) || lat < -90 || lat > 90) {
      errors.push("Latitude must be a valid number between -90 and 90")
    }
  }

  // Validate longitude
  if (!longitude) {
    errors.push("Longitude is required")
  } else {
    const lng = Number.parseFloat(longitude)
    if (isNaN(lng) || lng < -180 || lng > 180) {
      errors.push("Longitude must be a valid number between -180 and 180")
    }
  }

  // Return errors if any
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    })
  }

  next()
}
