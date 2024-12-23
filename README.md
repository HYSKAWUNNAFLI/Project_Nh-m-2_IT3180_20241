# E-commerce Management System

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
  - [Admin](#admin)
  - [User](#user)
- [Technologies Used](#technologies-used)
- [System Requirements](#system-requirements)
- [Installation Guide](#installation-guide)
- [Run the Application](#run-the-application)
- [Folder Structure](#folder-structure)
- [Future Development](#future-development)

## Introduction
This is a full-stack E-commerce management system designed to facilitate seamless product browsing, user account management, and administrative controls. The system supports various functionalities such as product management, order handling, and user authentication.

## Features

### Admin
1. **Product Management**:
   - Add new products with details such as title, description, image, price, category, and brand.
   - Update existing product information.
   - Delete products from the database.

2. **Category and Brand Management**:
   - Add, update, and delete categories and brands.

3. **Order Management**:
   - View and manage customer orders.
   - Update the status of orders.

### User
1. **Account Management**:
   - User registration and login with secure authentication.
   - Update personal details.

2. **Product Browsing**:
   - View all products.
   - Search products by category or brand.
   - View detailed information for each product.

3. **Shopping Cart**:
   - Add products to the cart.
   - Update quantities or remove items.

4. **Order Management**:
   - Place orders.
   - View order history.

## Technologies Used
- Backend: Node.js, Express.js
- Frontend: Handlebars.js, HTML, CSS, JavaScript
- Database: PostgreSQL
- Others: Express-session, pg-pool, dotenv, nodemon

## System Requirements
- Node.js (v16.0 or later)
- PostgreSQL (v13.0 or later)
- A terminal or command-line interface
- A web browser

## Installation Guide

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/HYSKAWUNNAFLI/Project_Nhom-2_IT3180_20241.git
   cd Project_Nhom-2_IT3180_20241
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Setup Database**:
   - Create a PostgreSQL database.
   - Import the database schema provided in `src/models/db/schema.sql`.

4. **Configure Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     PGUSER=<your_postgres_user>
     PGPASSWORD=<your_postgres_password>
     PGDATABASE=<your_database_name>
     PGHOST=localhost
     PGPORT=5432
     PORT=3000
     ```

## Run the Application

1. **Start the Server**:
   ```bash
   npm start
   ```

2. **Access the Application**:
   - Open your browser and navigate to `http://localhost:3000`.

## Folder Structure
```
Project_Nhom-2_IT3180_20241/
│
├── src/
|   ├──admin/
|   |   ├──middleware
|   |   ├──models
|   |   ├──public
|   |   ├──routes
|   |
|   |
│   ├── config/
│   │   ├── db.js          # Database connection setup
│   │   └── env/           # Environment configuration (if any)
│   │
│   ├── controllers/
│   │   ├── productController.js     # Logic for product-related operations
│   │   ├── viewdetailController.js  # Logic for product detail views
│   │   └── ...                      # Other controllers
│   │
│   ├── models/
│   │   ├── db.js          # Database pool configuration
│   │   └── ...            # Other models
│   │
│   ├── routes/
│   │   ├── productRouters.js        # Routes for product management
│   │   ├── viewdetailRouters.js     # Routes for viewing details
│   │   ├── defaultRouters.js        # Routes for home or default pages
│   │   └── ...                      # Other routes
│   │
│   ├── views/
│   │   ├── layouts/
│   │   │   └── main.handlebars      # Main layout file
│   │   ├── partials/
│   │   │   ├── header.handlebars    # Header partial
│   │   │   ├── footer.handlebars    # Footer partial
│   │   │   └── ...                  # Other partials
│   │   ├── products.handlebars      # Product listing page
│   │   ├── product_detail.handlebars # Product detail page
│   │   ├── cart.handlebars          # Cart page
│   │   └── ...                      # Other views
│   │
│   ├── public/
│   │   ├── css/
│   │   │   └── style.css            # Main stylesheet
│   │   ├── js/
│   │   │   ├── app.js               # Main JavaScript file
│   │   │   └── image_scripts.js     # Scripts for handling images
│   │   ├── assets/
│   │   │   ├── Ecommerce/
│   │   │   │   ├── Products/        # Product images
│   │   │   │   └── ...              # Other assets
│   │   │   └── ...                  # Additional asset directories
│   │   └── images/                  # Additional images
│   │
│   └── index.js                     # Main entry point of the application
│
├── .env                             # Environment variables
├── package.json                     # Project dependencies and scripts
├── package-lock.json                # Lock file for dependencies
├── README.md                        # Project documentation and setup instructions
└── ...                              # Other files (e.g., .gitignore)

```

## Future Development
1. **Enhanced Admin Panel**:
   - Real-time analytics and sales reports.
   - Role-based access control for administrators.

2. **User Experience Improvements**:
   - Add product reviews and ratings.
   - Implement wishlists and saved items.

3. **Scalability**:
   - Optimize database queries for better performance.
   - Deploy on cloud platforms such as AWS or Azure.

4. **Mobile Responsiveness**:
   - Ensure seamless functionality across all device sizes.

---

For any queries or contributions, please contact the repository owner or open an issue in the repository.