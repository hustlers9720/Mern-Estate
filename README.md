MERN Estate
A full-stack real estate application built using the MERN (MongoDB, Express, React, Node.js) stack. This project allows users to browse, search, and view real estate listings and includes features such as authentication, user-specific listings, and dynamic filtering. It uses Vite for the frontend and Node.js for the backend, with MongoDB as the database.

Features
Frontend: React (using Vite for development) and Tailwind CSS for styling.
Backend: Node.js with Express.js for the API and routing.
Database: MongoDB for storing listings and user data.
Authentication: Includes secure user authentication and authorization.
Search Functionality: Real-time filtering and searching for listings.
Contact Landlord: Allows users to contact landlords directly.
API Integration: Uses a secure API for accessing data.
Deployment: Supports deployment to production environments with build scripts.


Project Structure
MERN Estate
├── api/               # Backend (Node.js/Express)
│   ├── index.js       # Entry point for the backend
│   ├── models/        # MongoDB models
│   ├── routes/        # API routes
│   └── controllers/   # Route handlers
├── client/            # Frontend (React + Vite)
│   ├── src/           # React components and pages
│   ├── public/        # Static files
│   └── dist/          # Production build (generated by Vite)
├── .env               # Environment variables
├── package.json       # Project dependencies and scripts
├── tailwind.config.js # Tailwind CSS configuration
└── vite.config.js     # Vite configuration

Prerequisites
Make sure you have the following installed:

Node.js (v14 or higher)
MongoDB (local or cloud-based)
npm or yarn

Environment Variables
Create a .env file in both the api/ (backend) and client/ (frontend) directories and include the following:

Backend (api/.env):
env

MONGO_URI=<your_mongodb_connection_string> // in the seperate .env file we have store this for security.
JWT_SECRET=<your_jwt_secret>
API_KEY=<your_api_key_if_applicable>
PORT=5000
Frontend (client/.env):
env

VITE_API_URL=http://localhost:5000
Installation

Clone the repository:
git clone https://github.com/your-username/mern-estate.git
cd mern-estate

Install dependencies for both backend and frontend:

npm install
npm install --prefix client
Start the development servers:

Backend:
npm run dev
Frontend:
npm start 
Build for Production
To prepare the application for production:
Run the build command:
npm run build
The frontend build will be generated in the src/dist folder, and the backend will serve it.

Start the production server:

npm start
Scripts
Backend
npm run dev: Starts the backend server in development mode using Nodemon.
npm start: Starts the backend server in production mode.
Frontend
npm start --prefix client: Starts the React development server.
npm run build --prefix client: Builds the React application for production.
Full Build Script
npm run build: Installs dependencies and builds both frontend and backend for production.
API Endpoints

Public Endpoints:
GET /api/listing/get/:id - Get a specific listing by ID.
GET /api/listing/all - Get all listings.

Protected Endpoints:
POST /api/listing/create - Create a new listing (requires authentication).
POST /api/user/login - User login.
POST /api/user/register - User registration.
Dependencies
Backend
express
mongoose
dotenv
jsonwebtoken
bcryptjs
Frontend
react
react-router-dom
react-redux
vite
swiper
tailwindcss
Deployment
Build the project:


npm run build
Deploy the dist folder (frontend) and backend to your preferred platform:

Frontend: Use platforms like Vercel or Netlify.
Backend: Deploy to platforms like Heroku, AWS, or DigitalOcean.
Contributing
Feel free to open issues or create pull requests. Contributions are always welcome!

License
This project is licensed under the MIT License.

 📬 Contact For any queries or suggestions, feel free to reach out: 📧 adityagoyal9720@gmail.com 🌐 https://github.com/hustlers9720












ChatG
