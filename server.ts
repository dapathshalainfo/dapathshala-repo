import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import Database from "better-sqlite3";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import multer from "multer";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(process.env.DATABASE_URL || "data.db");

// Initialize Database Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'student', -- student, teacher, admin, parent
    category TEXT DEFAULT 'general', -- general, university, departmental, sas
    points INTEGER DEFAULT 50,
    subscription_plan TEXT DEFAULT 'free', -- free, monthly, yearly
    subscription_expiry DATETIME,
    session_token TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS coaching_centers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    admin_id INTEGER,
    branding_config TEXT, -- JSON for colors, logo
    FOREIGN KEY(admin_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    type TEXT NOT NULL, -- mcq, written, creative
    subject TEXT,
    class_level TEXT,
    topic TEXT,
    answer TEXT,
    explanation TEXT,
    is_premium BOOLEAN DEFAULT 0,
    created_by INTEGER,
    FOREIGN KEY(created_by) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS sas_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER,
    subject TEXT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    explanation TEXT,
    category TEXT -- audit, accounts, manual
  );

  CREATE TABLE IF NOT EXISTS exams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    coaching_id INTEGER,
    duration INTEGER, -- in minutes
    start_time DATETIME,
    security_config TEXT, -- JSON for browser lock, clipboard block
    created_by INTEGER,
    FOREIGN KEY(coaching_id) REFERENCES coaching_centers(id),
    FOREIGN KEY(created_by) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS exam_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    exam_id INTEGER,
    user_id INTEGER,
    score REAL,
    feedback TEXT,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(exam_id) REFERENCES exams(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Auth Routes
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password, category } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const stmt = db.prepare("INSERT INTO users (name, email, password, category, points) VALUES (?, ?, ?, ?, ?)");
    const result = stmt.run(name, email, hashedPassword, category || 'general', 50); // 50 bonus points
    
    const token = jwt.sign({ id: result.lastInsertRowid, email, category: category || 'general' }, process.env.JWT_SECRET || 'secret');
    res.json({ token, user: { id: result.lastInsertRowid, name, email, category: category || 'general', points: 50 } });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as any;
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "ইমেইল বা পাসওয়ার্ড ভুল!" });
    }
    
    const token = jwt.sign({ id: user.id, email, category: user.category }, process.env.JWT_SECRET || 'secret');
    res.json({ token, user: { id: user.id, name: user.name, email, category: user.category, points: user.points } });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Question Generation Route
app.post("/api/questions/generate", async (req, res) => {
  const { subject, classLevel, topic, count, type } = req.body;
  // This would call the Gemini service
  res.json({ message: "Request received", data: { subject, classLevel, topic, count, type } });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }
}

if (process.env.NODE_ENV !== "production") {
  startServer();
}

export default app;
