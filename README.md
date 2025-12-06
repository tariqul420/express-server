# Vehicle Rental System - Express Server

A robust RESTful API built with Express.js and TypeScript for managing a vehicle rental system. This system handles user authentication, vehicle management, and booking operations with PostgreSQL database integration.

## 🔗 Live URL

**API Base URL:** [https://ex.tariqul.dev](https://ex.tariqul.dev)

## ✨ Features

- **User Authentication**

  - User registration with secure password hashing
  - JWT-based login system
  - Role-based access control (Admin & Customer)

- **Vehicle Management**

  - Create, read, update, and delete vehicles
  - Dynamic filtering and availability tracking
  - Support for multiple vehicle types (car, bike, van, SUV)

- **Booking System**

  - Create and manage vehicle bookings
  - Track booking status (active, cancelled, returned)
  - Date range validation for rentals

- **Security**
  - Password encryption using bcrypt
  - JWT token authentication
  - Input validation and sanitization
  - Global error handling

## 🛠️ Technology Stack

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js 5.x
- **Language:** TypeScript
- **Database:** PostgreSQL
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcryptjs

### Development Tools

- **Dev Server:** ts-node-dev
- **Type Checking:** TypeScript 5.x
- **Environment Variables:** dotenv

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/tariqul420/express-server.git
cd express-server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL=postgres://username:password@localhost:5432/database_name

# Server Configuration
PORT=5000

# Authentication
JWT_SECRET=your_secure_jwt_secret_key
```

**Note:** Replace the values with your actual database credentials and generate a secure JWT secret.

### 4. Database Setup

The application will automatically create the required tables on startup:

- `Users` - Store user information
- `Vehicles` - Store vehicle details
- `Bookings` - Store booking records

### 5. Run the Application

**Development Mode:**

```bash
npm run dev
```

**Production Build:**

```bash
npm run build
npm start
```

The server will start at `http://localhost:3000`

## 📚 API Endpoints

### Authentication

- `POST /api/v1/auth/signup` - Register a new user
- `POST /api/v1/auth/signin` - Login user

### Vehicles

- `GET /api/v1/vehicles` - Get all vehicles
- `GET /api/v1/vehicles/:id` - Get vehicle by ID
- `POST /api/v1/vehicles` - Create new vehicle (Admin only)
- `PUT /api/v1/vehicles/:id` - Update vehicle (Admin only)
- `DELETE /api/v1/vehicles/:id` - Delete vehicle (Admin only)

### Users

- `GET /api/v1/users` - Get all users (Admin only)
- `GET /api/v1/users/:id` - Get user by ID
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

### Bookings

- `GET /api/v1/bookings` - Get all bookings
- `GET /api/v1/bookings/:id` - Get booking by ID
- `POST /api/v1/bookings` - Create new booking
- `PUT /api/v1/bookings/:id` - Update booking
- `DELETE /api/v1/bookings/:id` - Delete booking

## 📁 Project Structure

```
express-server/
├── src/
│   ├── config/
│   │   ├── db.ts              # Database configuration & table schemas
│   │   └── env.ts             # Environment variables configuration
│   ├── features/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.route.ts
│   │   │   └── auth.service.ts
│   │   ├── booking/
│   │   │   ├── booking.controller.ts
│   │   │   ├── booking.route.ts
│   │   │   └── booking.service.ts
│   │   ├── user/
│   │   │   ├── user.controller.ts
│   │   │   ├── user.route.ts
│   │   │   └── user.service.ts
│   │   └── vehicle/
│   │       ├── vehicle.controller.ts
│   │       ├── vehicle.route.ts
│   │       └── vehicle.service.ts
│   ├── middlewares/
│   │   └── error.middleware.ts
│   ├── app.ts                 # Express app configuration
│   └── server.ts              # Server entry point
├── .env.example               # Environment variables template
├── package.json
├── tsconfig.json
└── README.md
```

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- Email uniqueness validation
- Password length validation (minimum 6 characters)
- SQL injection prevention with parameterized queries
- Global error handling middleware

## 👨‍💻 Author

**Tariqul Islam**

- GitHub: [@tariqul420](https://github.com/tariqul420)
- Live API: [https://ex.tariqul.dev](https://ex.tariqul.dev)

## 📝 License

This project is licensed under the ISC License.

---

**Made with ❤️ by Tariqul Islam**
