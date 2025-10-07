Order Management Backend
NestJS backend API for an order management system using Prisma ORM and PostgreSQL.
Live URL:
 Backend API: https://ordersbackends.onrender.com
Tech Stack:
NestJS


Prisma ORM


PostgreSQL


TypeScript


Local Setup
Prerequisites:
Node.js version 18 or higher


PostgreSQL database


Installation Steps:
Install dependencies:
 npm install


Create a .env file with the following variables:
 DATABASE_URL="postgresql://user:password@localhost:5433/orderdb"
 PORT=8000


Generate Prisma Client:
 npx prisma generate


Run database migrations:
 npx prisma migrate dev


(Optional) Seed the database:
 npx prisma db seed


Start the development server:
 npm run start:dev


Server will run on: http://localhost:8000
API Endpoints
Create Order:
 POST /orders
 Body:
 {
 "userId": 1,
 "items": [
 { "productId": 1, "quantity": 2 }
 ]
 }
Get Orders:
 GET /orders?page=1&limit=10&search=john
Database Schema:
User: id (Int), email, name


Product: id (Int), name, description, price, stock


Order: id (Int), userId, status, total


OrderItem: id (Int), orderId, productId, quantity, price


Trade-offs & Shortcuts:
No Redis caching: Removed to simplify deployment and focus on core functionality


Mock async queue: Used setTimeout instead of a real SQS/Redis queue for order confirmation


Basic validation: Minimal DTO validation; production version would include stricter rules


No authentication: Skipped for time constraints


Simple error handling: Basic try-catch blocks, could be improved with global exception filters


No product endpoints: Products are seeded via the database; no CRUD API exposed


Stock management: Simple decrement logic, no handling for concurrent orders or negative stock


No tests: Unit tests skipped due to time limits


Environment Variables:
 DATABASE_URL="postgresql://..."
 PORT=8000
Deployment Notes:
 Deployed on Render.com using the following commands:
 Build command: npm install && npx prisma generate && npx prisma migrate deploy
 Start command: npm run start:prod

