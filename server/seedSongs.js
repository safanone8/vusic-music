const fs = require("fs");
const path = require("path");
require("dotenv").config();
const db = require("./db");

const seedPath = path.join(__dirname, "data", "musicSeed.json");
if (!fs.existsSync(seedPath)) {
  console.error("Seed file not found at", seedPath);
  process.exit(1);
}
const raw = fs.readFileSync(seedPath, "utf-8");
let data = [];
try {
  data = JSON.parse(raw);
} catch (e) {
  console.error("Invalid JSON", e);
  process.exit(1);
}

const insertSql = `INSERT INTO songs (name, author_name, img, lang, type, music_file, times_played, attribution)
VALUES (?,?,?,?,?,?,?,?)`;

let inserted = 0;
function next(i) {
  if (i >= data.length) {
    console.log(`Seeding complete. Inserted ${inserted} records.`);
    db.end();
    return;
  }
  const s = data[i];
  db.query(
    "SELECT id FROM songs WHERE name = ? AND music_file = ? LIMIT 1",
    [s.name, s.musicName],
    (err, rows) => {
      if (err) {
        console.error("Lookup error", err);
        return next(i + 1);
      }
      if (rows.length) {
        return next(i + 1); // duplicate
      }
      db.query(
        insertSql,
        [
          s.name,
          s.author_name || null,
          s.img || null,
          s.lang || null,
          s.type || null,
          s.musicName,
          s.timesPlayed || 0,
          s.attribution ? JSON.stringify(s.attribution) : null,
        ],
        (e) => {
          if (e) {
            console.error("Insert error", e);
          } else {
            inserted++;
          }
          next(i + 1);
        }
      );
    }
  );
}

next(0);
