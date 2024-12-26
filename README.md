Here’s the updated `README.md` with the new folder structure:

---

# Backend-API-Movie-Lobby

This is a simple Movies Lobby API built using Node.js, Express, and MongoDB. It allows users to interact with a movie database, including fetching a list of movies, searching, and more.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (local or MongoDB Atlas)

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/kprasannamahesh/Backend-API-Movie-Lobby.git
cd Backend-API-Movie-Lobby
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file and define the following variables:

```env
MONGO_URI=mongodb://localhost:27017
ADMIN_USER=your_admin_user
ADMIN_PASSWORD=your_admin_password
```

### 4. Run the Application

```bash
npm start
```

### 5. Run Tests

```bash
npm test
```

## Folder Structure

```
/src
|-- /connection        # MongoDB connection logic
|-- db.ts              # Database configuration and connection
|-- /routes            # API route definitions
|-- express_router.test.ts # Test cases for API routes
|-- express_router.ts  # Express routes for API
|-- envVaraibles.ts    # Environment variable configuration
|-- index.ts           # Main application entry point
/.env                  # Environment variables
/.gitignore            # Git ignore file
/jest.config.js        # Jest testing configuration
/load_data.json        # Sample data for database seeding
/nodemon.json          # Configuration for Nodemon
/package-lock.json     # NPM lock file
/package.json          # Project dependencies and scripts
/tsconfig.json         # TypeScript configuration
```

## License

This project is licensed under the MIT License.

---

This README includes the updated folder structure and setup instructions.
