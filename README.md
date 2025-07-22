# VirtualPay
This project is a simplified clone of a digital payment application like Paytm, allowing users to manage virtual money, search for other users, and perform instant money transfers securely. 

✨ **Features**
- **User Authentication**: Secure signup and sign-in with JWT (JSON Web Tokens).

- **Virtual Wallet**: Users get an initial virtual balance upon signup.

- **Balance Management**: View real-time balance updates.

- **User Search**: Search for other registered users by username.

- **Instant Money Transfers**: Send virtual money to other users with real-time balance deductions and credits.

- **Responsive UI**: A clean and responsive user interface built with React and Tailwind CSS.

🚀 **Technologies Used**    
**Frontend**.  
React.js, React router dom, Context API, tailwind CSS

**Backend**.  
Node.js, Express js, MongoDB Atlas, 


⚙️ Setup and Local Development
Follow these steps to set up and run the project on your local machine.

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Hodazia/Paytm-payment
   cd Paytm-payment
   ```

2. **Backend Setup (Node.js)**
Navigate to the backend directory:

```bash
cd backend

npm install
```
Create a .env file:
Create a file named .env in the backend directory and add your MongoDB connection string:

```bash
MONGO_DB_URI=your_mongodb_atlas_connection_string
```

Configure JWT Secret:
Ensure your config.js (or wherever your JWT secret is defined) uses an environment variable for JWT_SECRET:

3. **Start the backend server**:
```bash
npm start # Or npm run dev if you have a nodemon script for development
```

The backend server will typically run on http://localhost:3000.

4. **Frontend Setup (React)**
Navigate to the frontend directory:
```bash
cd ../frontend

npm install
```

Configure Backend URL:
Open frontend/assets/backurl.js and ensure it's configured to point to your local backend for development:

**Start the frontend development server**:

```
npm start
```

The frontend application will typically open in your browser at http://localhost:3001 (or another available port).

🚀 **Deployment**  
The project is designed for separate deployments of the frontend and backend.

**Backend Deployment**.   
The backend is optimized for deployment on:

**Frontend Deployment**  
The React frontend is deployed on Vercel.com.

## Features to add
- Add a transactions schema to check for every transaction who is sending the money to whom, sender-receiver
- Have a details of total transactions done by the user in the dashboard
- Download and share the transaction as a proof of their transaction
- Have a transaction history of the user in the user dashboard, create a new API for that....