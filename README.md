### School Management API

A comprehensive Node.js API system for managing school data with proximity-based sorting capabilities.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [API Documentation](#api-documentation)
- [Testing with Postman](#testing-with-postman)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)


## Overview

This School Management API allows users to add new schools to a database and retrieve a list of schools sorted by proximity to a user-specified location. The system uses Node.js, Express.js, and MySQL to provide a robust and efficient API solution.

## Features

- Add new schools with name, address, and geographical coordinates
- List all schools sorted by proximity to a user's location
- Input validation for all API endpoints
- Geographical distance calculation using the Haversine formula
- Error handling and appropriate HTTP status codes
- RESTful API design


## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MySQL**: Relational database management system
- **mysql2**: MySQL client for Node.js with promises support
- **dotenv**: Environment variable management
- **nodemon**: Development utility for automatic server restart


## Project Structure

```plaintext
school-management-api/
├── config/
│   └── db.js                 # Database configuration
├── controllers/
│   └── schoolController.js   # API controllers
├── middleware/
│   └── validation.js         # Request validation
├── routes/
│   └── schools.js            # API routes
├── utils/
│   └── distance.js           # Distance calculation utility
├── .env                      # Environment variables (not in repo)
├── .env.example              # Example environment variables
├── package.json              # Project dependencies
├── server.js                 # Application entry point
└── README.md                 # Project documentation
```

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn package manager


## Installation

1. Clone the repository:

```shellscript
git clone https://github.com/sanku351/school-management-api.git
cd school-management-api
```


2. Install dependencies:

```shellscript
npm install
```


3. Create environment variables file:

```shellscript
cp .env.example .env
```


4. Edit the `.env` file with your database credentials and other configuration.
5. Start the server:

```shellscript
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```




## Environment Variables

Create a `.env` file in the root directory with the following variables:

```plaintext
# Server Configuration
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_management
```

## Database Setup

The application will automatically create the required `schools` table when it first connects to the database. However, you need to create the database manually:

```sql
CREATE DATABASE school_management;
```

### Database Schema

The `schools` table has the following structure:

| Column | Type | Description
|-----|-----|-----
| id | INT | Primary key, auto-increment
| name | VARCHAR | School name
| address | VARCHAR | School address
| latitude | FLOAT | Geographical latitude coordinate
| longitude | FLOAT | Geographical longitude coordinate
| created_at | TIMESTAMP | Record creation timestamp


## API Documentation

### 1. Add School API

**Endpoint**: `/api/addSchool`**Method**: POST**Content-Type**: application/json

**Request Body**:

```json
{
  "name": "Example School",
  "address": "123 Education St, City, Country",
  "latitude": 37.7749,
  "longitude": -122.4194
}
```

**Successful Response** (201 Created):

```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Example School",
    "address": "123 Education St, City, Country",
    "latitude": 37.7749,
    "longitude": -122.4194
  }
}
```

**Error Response** (400 Bad Request):

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "School name is required"
  ]
}
```

### 2. List Schools API

**Endpoint**: `/api/listSchools`**Method**: GET**Query Parameters**:

- `latitude`: User's latitude (float)
- `longitude`: User's longitude (float)


**Example Request**: `/api/listSchools?latitude=37.7749&longitude=-122.4194`

**Successful Response** (200 OK):

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Nearby School",
      "address": "456 Learning Ave, City, Country",
      "latitude": 37.7750,
      "longitude": -122.4195,
      "distance": 0.12
    },
    {
      "id": 2,
      "name": "Farther School",
      "address": "789 Knowledge Blvd, City, Country",
      "latitude": 37.7800,
      "longitude": -122.4300,
      "distance": 1.45
    }
  ]
}
```

**Error Response** (400 Bad Request):

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Latitude must be a valid number between -90 and 90"
  ]
}
```

## Testing with Postman

1. Import the provided Postman collection:

1. Download the `school-management-api.postman_collection.json` file
2. Open Postman
3. Click "Import" and select the downloaded file



2. Update the `base_url` variable in the collection to match your deployment URL:

1. Click on the collection name
2. Go to the "Variables" tab
3. Update the "CURRENT VALUE" of `base_url` (e.g., `http://localhost:3000` for local testing)



3. Test the endpoints:

1. Use the "Add School" request to add new schools
2. Use the "List Schools" request to retrieve schools sorted by proximity

## Deployment

### Option 1: Deploy to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure the service:

1. Build Command: `npm install`
2. Start Command: `npm start`


4. Add environment variables in the Render dashboard
5. Deploy the service


### Option 2: Deploy to Railway

1. Create a new project on Railway
2. Connect your GitHub repository
3. Add a MySQL database service
4. Configure environment variables
5. Deploy the service


### Option 3: Deploy to Heroku

1. Create a new app on Heroku
2. Connect your GitHub repository
3. Add a MySQL add-on or connect to an external database
4. Configure environment variables
5. Deploy the application


## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request


## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Additional Information

### Distance Calculation

The application uses the Haversine formula to calculate the distance between two geographical coordinates. This formula determines the great-circle distance between two points on a sphere given their longitudes and latitudes.

### Performance Considerations

For large datasets, consider implementing:

- Pagination for the list endpoint
- Database indexes for faster queries
- Caching for frequently accessed data


### Security Considerations

For production environments, implement:

- Authentication and authorization
- Rate limiting
- HTTPS enforcement
- Input sanitization beyond basic validation


---

Created by Sankirthan Sangarapu - ssangarapu@gmail.com
