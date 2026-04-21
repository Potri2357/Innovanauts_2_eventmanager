# 🎉 Innovanauts Event Manager

A full-stack **Event Management Web Application** built for college/institutional use. It enables **Organizers** to schedule events and manage venues, while **Participants** can browse and explore scheduled events — all through a role-based authentication system.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [API Endpoints](#api-endpoints)
- [User Roles](#user-roles)
- [Data Models](#data-models)
- [Available Scripts](#available-scripts)

---

## ✨ Features

- 🔐 **JWT-based Authentication** — Secure login and registration with bcrypt password hashing
- 👥 **Role-Based Access Control** — Separate dashboards and permissions for `Organizer` and `Participant` roles
- 📅 **Event Scheduling** — Organizers can create and manage events with venue, time, and attendee details
- 🏛️ **Venue Management** — Full CRUD operations for venues with booking status, capacity, noise level, and approval tracking
- 🔍 **Event Exploration** — Participants can browse all available events and view event details
- 👤 **User Profile** — View and manage personal profile information

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| React Router v6 | Client-side routing |
| Redux Toolkit | State management |
| React-Bootstrap | UI components & styling |
| Axios | HTTP requests |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database & ODM |
| bcryptjs | Password hashing |
| JSON Web Token (JWT) | Authentication tokens |
| dotenv | Environment configuration |
| concurrently | Run frontend & backend together |

---

## 📁 Project Structure

```
Innovanauts_2_eventmanager/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection setup
│   ├── controllers/
│   │   ├── userControllers.js     # Auth logic (register, login)
│   │   └── eventController.js     # Event CRUD logic
│   ├── middlewares/
│   │   └── errorMiddleware.js     # Global error handler
│   ├── models/
│   │   ├── userModel.js           # User schema
│   │   ├── Venue.js               # Venue schema
│   │   └── Event.js               # Event schema
│   ├── routes/
│   │   ├── userRoutes.js          # /api/users
│   │   ├── venueRoutes.js         # /api/users/venues
│   │   ├── eventRoutes.js         # /api/users/events
│   │   └── bookingRoutes.js       # Booking routes
│   └── server.js                  # Express app entry point
│
├── frontend/
│   └── src/
│       ├── screens/
│       │   ├── LoginScreen/       # Login page
│       │   ├── ResgisterScreen/   # Registration page
│       │   └── Dashboard/
│       │       ├── Organizer/     # Organizer dashboard
│       │       └── Participant/   # Participant dashboard
│       ├── components/
│       │   ├── ExploreEvents/     # Browse all events
│       │   ├── EventDetails/      # Single event view
│       │   └── Profile/           # User profile
│       ├── pages/
│       │   ├── eventschedule/     # Event scheduling form
│       │   └── venueform/         # Venue creation form
│       ├── store.js               # Redux store configuration
│       └── App.js                 # Root component with routing
│
├── .env                           # Environment variables
├── package.json                   # Root scripts (runs both servers)
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (v8 or higher)
- A [MongoDB](https://www.mongodb.com/) instance (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Innovanauts_2_eventmanager
   ```

2. **Install root dependencies:**
   ```bash
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

### Environment Variables

Create a `.env` file in the **root** of the project with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
```

> ⚠️ **Never commit your `.env` file to version control.** It is already listed in `.gitignore`.

### Running the App

Run both the backend and frontend servers simultaneously from the root directory:

```bash
npm run dev
```

This uses `concurrently` to start:
- 🖥️ **Backend** at `http://localhost:5000`
- 🌐 **Frontend** at `http://localhost:3000`

---

## 📡 API Endpoints

### Auth — `/api/users`
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `POST` | `/api/users/register` | Register a new user | ❌ |
| `POST` | `/api/users/login` | Log in and receive JWT token | ❌ |

### Venues — `/api/users/venues`
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/api/users/venues` | Fetch all venues | ✅ |
| `POST` | `/api/users/venues` | Create a new venue | ✅ |
| `GET` | `/api/users/venues/:id` | Get a specific venue | ✅ |
| `PUT` | `/api/users/venues/:id` | Update a venue | ✅ |
| `DELETE` | `/api/users/venues/:id` | Delete a venue | ✅ |

### Events — `/api/users/events`
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:---:|
| `GET` | `/api/users/events` | Fetch all events | ✅ |
| `POST` | `/api/users/events` | Create a new event | ✅ |
| `GET` | `/api/users/events/:id` | Get a specific event | ✅ |
| `DELETE` | `/api/users/events/:id` | Delete an event | ✅ |

---

## 👥 User Roles

| Role | Capabilities |
|---|---|
| **Organizer** | Access organizer dashboard, schedule events, manage venues, create/delete events |
| **Participant** | Access participant dashboard, browse all events, view event details, manage profile |

---

## 🗄️ Data Models

### User
| Field | Type | Notes |
|---|---|---|
| `name` | String | Required |
| `email` | String | Required, unique |
| `password` | String | Required, hashed with bcrypt |
| `role` | String (enum) | `"Organizer"` or `"Participant"` |
| `department` | String | Optional |
| `yearOfPassing` | String | Optional |

### Event
| Field | Type | Notes |
|---|---|---|
| `eventName` | String | Required |
| `organiser` | String | Required |
| `venue` | String | Required |
| `attendees` | Number | Required |
| `facilities` | [String] | Required |
| `date` | String | Required |
| `startTime` | String | Required |
| `endTime` | String | Required |
| `club` | String | Optional |

### Venue
| Field | Type | Notes |
|---|---|---|
| `venueName` | String | Required |
| `location` | String | Required |
| `capacity` | Number | Required |
| `venueType` | String (enum) | `Auditorium`, `Seminar Hall`, `Classroom`, `Sports Ground` |
| `bookingStatus` | String (enum) | `Available`, `Booked`, `Pending Approval` |
| `bookingPriority` | String (enum) | `Departmental Events`, `Club Events`, `Open to All` |
| `noiseLevel` | String (enum) | `Silent`, `Loud Events Allowed` |
| `requiredApprovals` | String (enum) | `Faculty Approval Needed`, `Admin Approval Needed` |
| `keyNumber` | String | Required |
| `keyAvailability` | String | Required |
| `keyHandler` | String | Required |
| `facilities` | [String] | Optional |
| `description` | String | Optional |

---

## 📜 Available Scripts

From the **root directory:**

| Script | Command | Description |
|--------|---------|-------------|
| Start both servers | `npm run dev` | Runs backend + frontend concurrently |
| Start backend only | `npm start` | Runs Express server on port 5000 |
| Start frontend only | `npm run client` | Runs React dev server on port 3000 |

From the **`frontend/` directory:**

| Script | Command | Description |
|--------|---------|-------------|
| Development | `npm start` | Start React dev server |
| Production build | `npm run build` | Create optimized production build |
| Tests | `npm test` | Run test suite |

---

## 📄 License

This project is licensed under the **ISC License**.

---

> Built with ❤️ by **potrinathan** for Innovanauts
