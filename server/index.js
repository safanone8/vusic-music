const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const db = require("./db");
const songsRouter = require("./routes/songs");

const app = express();

app.use(express.json());
app.use(cors());

// Expose media files (audio) moved to server/media
app.use("/media", express.static(path.join(__dirname, "media")));

// Root route to confirm API is reachable
app.get("/", (req, res) => {
  res.json({
    status: "api-root",
    healthEndpoint: "/health",
    songsEndpoint: "/songs",
  });
});

app.get("/health", (req, res) => {
  db.query("SELECT 1 AS ok", (err, rows) => {
    if (err) {
      console.error("Health check DB error:", err.code, err.message);
      return res
        .status(500)
        .json({ status: "error", db: err.code || "DB_ERROR" });
    }
    res.json({ status: "up", db: "ok" });
  });
});

app.post("/register", (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).json({ message: "ENTER CORRECT ASKED DETAILS!" });
  }
  db.query(
    "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
    [email, username, password],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "DB_ERROR" });
      }
      res.send(result);
    }
  );
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "MISSING_CREDENTIALS" });
  }
  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "DB_ERROR" });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "WRONG USERNAME OR PASSWORD!" });
      }
    }
  );
});

app.use("/songs", songsRouter);

const PORT = process.env.PORT || 3001;

// Test initial DB connection explicitly for clearer diagnostics
db.query("SELECT DATABASE() AS db", (err, rows) => {
  if (err) {
    console.error(
      "\n[Startup] Cannot query database. Check that MySQL is running and credentials are correct."
    );
    console.error("Host:", process.env.DB_HOST || "localhost");
    console.error("DB User:", process.env.DB_USER || "root");
    console.error("DB Name:", process.env.DB_NAME || "register");
    console.error("Error:", err.code, err.message, "\n");
  } else {
    console.log(`[Startup] Connected to MySQL database: ${rows[0].db}`);
  }
  app.listen(PORT, () => {
    console.log(
      `Backend server running on port ${PORT}. Try: http://localhost:${PORT}/health`
    );
  });
});
