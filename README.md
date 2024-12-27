# API with Redis Caching

This project demonstrates the implementation of caching in an API to optimize performance. It integrates Redis to cache the results of frequently accessed endpoints, implements cache invalidation strategies, and sets cache expiration to keep data fresh.

## Features

- **User Management**: Create, retrieve, update, and delete users.
- **Caching with Redis**: Cache responses of frequently accessed endpoints to reduce database load and improve response time.
- **Cache Invalidation**: Automatically update or remove cached data when the underlying database changes.
- **Cache Expiration**: Ensures cached data stays fresh by setting an expiration time.
- **Improved Performance**: Measure and compare response times before and after caching.

## Tech Stack

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building the API.
- **MongoDB**: Database for storing user information.
- **Redis**: In-memory data structure store used for caching.
- **Joi**: For request validation.
- **Postman**: For API testing.

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- Node.js installed on your system.
- MongoDB connection string.
- Redis instance running (e.g., via Docker or a managed service).

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file in the root directory:
   ```env
   PORT=8000
   MONGO_URI=<Your_MongoDB_Connection_String>
   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379
   JWT_SECRET=<Your_Secret_Key>
   ```

4. Start the server:
   ```bash
   npm start
   ```

### API Endpoints

#### Authentication
- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Login and receive a JWT token.

#### User Management
- **GET** `/api/users`: Fetch all users (cached).
- **GET** `/api/users/:userId`: Fetch a single user by ID.
- **PUT** `/api/users/:userId`: Update user details.
- **DELETE** `/api/users/:userId`: Delete a user.

### Testing the API

1. Use **Postman** or any REST client.
2. Include the JWT token in the `Authorization` header for protected routes.
3. Observe performance improvements by comparing response times before and after caching.

## Measuring Performance

- Test API response times using tools like Postman or Apache Benchmark.
- Observe database query counts and response times for cached vs. non-cached endpoints.

## Future Improvements

- Implement rate limiting using Redis.
- Add advanced filtering and sorting for user endpoints.
- Enhance role-based access controls.

## License

This project is open source under the MIT License.
