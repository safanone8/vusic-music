# 🎵 Vusic - Music Streaming Web Application

A modern music streaming web application built with React frontend and Node.js backend, featuring database-driven song management and smooth animations.

## ✨ Features

- **Database-driven**: Songs stored and served from MySQL database
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Music Player**: Full-featured audio player with progress tracking
- **Search & Filter**: Find songs by name, artist, or language
- **Add Music**: Upload and manage your music collection
- **Premium Animations**: Smooth transitions and card animations for enhanced UX
- **RESTful API**: Clean API endpoints for all music operations

## 🛠️ Tech Stack

### Frontend
- **React 16.13.1** - UI framework
- **Redux** - State management
- **Material-UI** - Component library
- **Anime.js** - Smooth animations
- **SCSS** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL 2** - Database connectivity
- **Dotenv** - Environment configuration

## 🚀 Getting Started

### Prerequisites
- Node.js (18+ recommended)
- MySQL Server (8.0+ recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/vusic.git
   cd vusic
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   ```

3. **Configure environment variables**
   Create `.env` file in the server directory:
   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=register
   PORT=3001
   ```

4. **Set up MySQL database**
   ```sql
   CREATE DATABASE register;
   CREATE USER 'your_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON register.* TO 'your_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

5. **Start the backend server**
   ```bash
   npm start
   # or for development
   nodemon index.js
   ```

6. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

7. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

8. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - API Health Check: http://localhost:3001/health

## 📁 Project Structure

```
vusic/
├── frontend/           # React frontend application
│   ├── public/        # Static files
│   ├── src/           # Source code
│   │   ├── components/ # React components
│   │   ├── app/       # Main app component
│   │   ├── actions/   # Redux actions
│   │   ├── reducers/  # Redux reducers
│   │   └── api/       # API configurations
│   └── build/         # Production build
├── server/            # Node.js backend
│   ├── routes/        # API routes
│   ├── data/          # Seed data
│   ├── media/         # Audio files
│   ├── sql/           # Database scripts
│   ├── index.js       # Server entry point
│   ├── db.js          # Database configuration
│   └── seedSongs.js   # Database seeding script
└── README.md
```

## 🎵 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/songs` | Get all songs (with filters) |
| POST | `/songs` | Add new song |
| PATCH | `/songs/:id/play` | Increment play count |
| DELETE | `/songs/:id` | Delete song |

### Query Parameters for `/songs`
- `lang` - Filter by language
- `search` - Search in song name/artist
- `page` - Page number for pagination
- `limit` - Items per page

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🔧 Environment Setup

Make sure to configure your environment variables properly:

- Create `.env` in the server directory with your database credentials
- Update frontend API base URL if deploying to production
- Ensure MySQL server is running and accessible

## 🎯 Future Enhancements

User authentication and profiles
Playlist management
Real-time lyrics display
Social features (sharing, comments)
Mobile app version
Cloud storage integration

---

Made with ❤️ by safan
