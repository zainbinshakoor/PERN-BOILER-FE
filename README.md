# Full-Stack TypeScript Boilerplate

A professional-grade full-stack application boilerplate with React (TypeScript) frontend.

## 🚀 Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Router** for navigation


## 📁 Project Structure

```
├── frontend/         # React frontend
└── README.md         # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/zainbinshakoor/PERN-BOILER-FE.git
cd pern-boiler-fe

# Install dependencies for both frontend and backend
npm install
```

### 3. Environment Variables

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Development

```bash
# Start both frontend and backend in development mode
npm run dev

# Or start individually:
npm run dev  # Frontend only
```

### 5. Production

```bash
# Build for production
npm run build

# Start production server
npm run start
```


## 📝 Available Scripts

- `npm run dev` - Start frontend
- `npm run build` - Build both applications for production
- `npm run test` - Run all tests
- `npm run lint` - Lint all code
- `npm run format` - Format code with Prettier

## 🏗️ Architecture

### Frontend Architecture
- **Components**: Reusable UI components
- **Pages**: Route-level components
- **Services**: API communication layer
- **Hooks**: Custom React hooks
- **Utils**: Helper functions and utilities

## 🔐 Authentication

The boilerplate includes JWT-based authentication with:
- User registration and login
- Protected routes
- Token refresh mechanism
- Role-based access control

## 🚀 Deployment

### Frontend Deployment
- Build the application
- Serve static files
- Configure environment variables

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.