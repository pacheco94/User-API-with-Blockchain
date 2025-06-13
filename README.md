# User API with Blockchain

This project is a REST API that combines MongoDB with blockchain technology (Ethereum) for user management.

## Main Features

- MongoDB and Ethereum integration
- Complete user CRUD operations
- Wallet address validation
- Blockchain events for each operation
- RESTful API

## Prerequisites

- Node.js
- MongoDB
- Ethereum account (for testing)
- MetaMask or similar for blockchain interaction

## Installation

1. Clone the repository:
```bash
git clone [REPOSITORY_URL]
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the project root with the following variables:
```
PORT=3000
MONGODB_URI=your_mongodb_uri
ETHEREUM_NETWORK=your_ethereum_network
CONTRACT_ADDRESS=your_contract_address
```

4. Start the server:
```bash
npm start
```

## Project Structure

```
├── abi/              # Smart contracts
├── config/           # Configurations (DB, blockchain)
├── controller/       # Business logic
├── middleware/       # Custom middlewares
├── model/           # MongoDB models
├── routers/         # API routes
├── utils/           # Utilities
└── server.js        # Entry point
```

## API Endpoints

- `GET /api/users/users`: Get all users
- `POST /api/users`: Create new user
- `GET /api/users/:id`: Get user by ID
- `PUT /api/users/:id`: Update user
- `DELETE /api/users/:id`: Delete user

## User Model

```javascript
{
    id: String,          // Unique identifier
    name: String,        // Name (minimum 3 characters)
    email: String,       // Valid email
    addressWallet: String // Ethereum wallet address
}
```

## Blockchain Events

- `UserCreate`: Emitted when creating a user
- `UserUpdated`: Emitted when updating a user
- `UserDeleted`: Emitted when deleting a user

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- Ethers.js
- Solidity (for smart contracts)

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details. 