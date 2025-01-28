# Inkspresso Coffee Shop E-Commerce

Welcome to Inkspresso, a cozy and earthy coffee shop e-commerce platform! Inkspresso is a MERN stack-based project designed for managing and selling coffee products, with a focus on seamless user experience and dynamic content. The backend is built with Node.js, Express, and MongoDB, while the frontend leverages Next.js, Tailwind CSS, and DaisyUI.

Live link: [link](https://inkspresso-frontend-demo.vercel.app/)

## Progress

### Current Features:
- **Backend:**
  - RESTful API with CRUD operations for products.
  - User authentication with JWT (JSON Web Token) and role-based access control.
  - File upload handling with Multer and integration with Cloudinary for image storage.
  - Integration with AWS S3/Cloudinary for image hosting.
  - Secure authentication for user and product routes.

- **Frontend:**
  - Dynamic Navbar and Footer.
  - Homepage with a hero section and dynamic image.
  - Product display with category filters, pagination, and dynamic data fetching.
  - Product management for admins, including the ability to add, update, and delete products.
  - Integration of dark and light mode with Tailwind CSS and DaisyUI.
  - Sign-up, login, and checkout forms.

## Components

- [ ] Navbar
- [ ] Footer
- [ ] Hero Section
- [ ] ProductCard
- [ ] ProductMenu
- [ ] CartItem
- [ ] CartSummary
- [ ] LoginForm
- [ ] SignUpForm
- [ ] CheckoutForm

## Screenshots

### Postman: Backend Routes

#### 1. **User Registration**:
![Postman - User Registration](./screenshots/postman-register.png)

#### 2. **Product Retrieval**:
![Postman - Product Retrieval](./screenshots/postman-products.png)

### Frontend: Components

#### 1. **Hero Section**:
![Hero Section](./screenshots/hero-section.png)

#### 2. **Product Menu**:
![Product Menu](./screenshots/product-menu.png)

## Technologies Used

- **Frontend:**
  - Next.js
  - React.js
  - Tailwind CSS
  - DaisyUI
  - JavaScript (ES6+)
  
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - Multer (for file uploads)
  - Cloudinary (for image storage)
  - AWS S3 (for image storage)
  - JSON Web Token (JWT) for authentication
  - dotenv (for environment variables)
  - Postman (for testing APIs)

## Technical Details

- **Backend:**
  - The backend is a RESTful API built with Node.js and Express.js.
  - MongoDB is used as the database for storing user and product data.
  - The backend is connected to Cloudinary (or AWS S3) for image storage.
  - JWT authentication is used to secure routes and provide role-based access (admin for CRUD product routes).
  - All routes are protected with middleware for authentication and authorization.
  
- **Frontend:**
  - The frontend is built with Next.js, enabling fast, server-side rendering.
  - The frontend uses Tailwind CSS for styling and DaisyUI for UI components (such as buttons and forms).
  - Dynamic data from the backend is fetched and displayed in the product menu, allowing for filtering and pagination.
  - Forms for user authentication (sign up and login) and checkout are included.
  - A dynamic hero section changes based on the page content.

## Future Plans (Wish List)

- **Admin Dashboard:**
  - Full-featured admin dashboard for managing users, orders, and products.
  
- **User Features:**
  - Add user profiles and order history.
  - Enable cart and checkout functionality.
  
- **Payment Integration:**
  - Implement payment gateways like Stripe or PayPal.
  
- **Mobile Responsiveness:**
  - Improve responsiveness for mobile users.

## Setup

If you would like to try this project out or contribute, follow these steps:

1. Clone the repository.
    ```bash
    git clone https://github.com/your-username/inkspresso.git
    ```
2. Install dependencies for both the backend and frontend:
    - For the backend:
      ```bash
      cd backend
      npm install
      ```
    - For the frontend:
      ```bash
      cd frontend
      npm install
      ```
3. Set up your environment variables:
    - For the frontend, create a `.env.local` file and add:
      ```
      NEXT_PUBLIC_API_URL=http://localhost:5000
      ```
    - For the backend, create a `.env` file and add:
      ```
      MONGO_URI=your-mongo-db-connection-uri
      JWT_SECRET=your-secret-key
      CLOUDINARY_URL=your-cloudinary-url
      AWS_S3_BUCKET=your-s3-bucket-name
      ```
4. Start the backend server:
    ```bash
    cd backend
    npm start
    ```
5. Start the frontend server:
    ```bash
    cd frontend
    npm run dev
    ```

Your application should now be running on `http://localhost:3000`.

## Contributing

We welcome contributions to Inkspresso! If you're interested in contributing, please fork the repository and submit a pull request with your changes. When submitting a pull request, make sure to:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Ensure all new features are covered by tests (if applicable).
4. Follow the project's coding conventions.

Looking forward to seeing your contributions!

## Screenshots

Add screenshots of the app here (e.g., Postman API tests, frontend components).

## Attribution

- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Cloudinary](https://cloudinary.com/)
- [AWS S3](https://aws.amazon.com/s3/)
- [Postman](https://www.postman.com/)