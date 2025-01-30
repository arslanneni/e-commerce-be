# eCommerce Backend

## Description

This is the backend for an eCommerce platform built using **NestJS**. It provides various RESTful API endpoints for handling user authentication, managing products, orders, categories, cart, and shipping. The backend is structured to handle both user and admin functionalities, with role-based access control (guards) and JWT-based authentication.

## Features

- **User Authentication**: 
  - Login, signup, and JWT authentication.
  
- **Product Management**:
  - CRUD operations for products (create, read, update, delete).
  - Managing product details and availability.

- **Category Management**:
  - CRUD operations for categories.
  
- **Order Management**:
  - Create, update, view, and delete orders.
  - Managing order statuses and order items.
  
- **Cart Management**:
  - Add, update, and remove products in the cart.
  
- **Shipping**:
  - Create and manage shipping information.

- **Guards**:
  - Role-based access control to ensure different users (admin, customer) have the appropriate permissions.

## Routes

- **Auth Routes**:
  - `POST /auth/login`: Login and get a JWT token.
  - `POST /auth/signup`: Register a new user.

- **Cart Routes**:
  - `GET /cart`: Get the user's cart.
  - `POST /cart`: Add items to the cart.
  - `DELETE /cart/:id`: Remove an item from the cart.

- **Category Routes**:
  - `GET /categories`: Get all categories.
  - `POST /categories`: Create a new category (Admin only).
  - `PUT /categories/:id`: Update a category (Admin only).
  - `DELETE /categories/:id`: Delete a category (Admin only).

- **Order Routes**:
  - `GET /orders`: Get all orders (Admin) or user's own orders.
  - `POST /orders`: Place an order.
  - `PUT /orders/:id`: Update an order's status (Admin only).

- **Product Routes**:
  - `GET /products`: Get all products.
  - `POST /products`: Create a new product (Admin only).
  - `PUT /products/:id`: Update a product (Admin only).
  - `DELETE /products/:id`: Delete a product (Admin only).

- **Shipping Routes**:
  - `POST /shipping`: Create or update shipping details.

- **User Routes**:
  - `GET /users`: Get all users (Admin only).
  - `GET /users/:id`: Get user details by ID (Admin only).

## Tech Stack

- **Backend Framework**: NestJS
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **ORM**: TypeORM
- **Hashing**: bcrypt
- **Validation**: class-validator
- **Serialization**: class-transformer
- **Routing**: NestJS Routing
- **Testing**: Jest, Supertest
- **Environment Variables**: dotenv

## Installation

 - **git clone**: https://github.com/arslanneni/e-commerce-be.git
 - **cd ecommerce-be**
 - **npm install**
 - **npm run start:dev**