# MERN E-Commerce App

A full-stack E-Commerce web application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User Authentication (Register/Login)
- JWT Authorization
- Product Listing
- Add to Cart
- Cart Management
- Checkout System
- Order History
- Responsive UI using Tailwind CSS
- REST API Integration
- MongoDB Database

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

## Project Structure

```bash
frontend/
backend/
```

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## API Endpoints

### Authentication
- POST `/api/auth/register`
- POST `/api/auth/login`

### Products
- GET `/api/products`

### Cart
- POST `/api/cart`
- GET `/api/cart`
- DELETE `/api/cart/:id`

### Orders
- POST `/api/orders`
- GET `/api/orders`

---

## Future Improvements

- Admin Dashboard
- Payment Gateway
- Product Search
- Product Filters
- Wishlist
- Image Upload
- Deployment

---

## Author

Manish Kumar

GitHub:
https://github.com/Manish-kumar05
