const express = require("express");
const router = express.Router();
const db = require("../db");

function mapSong(row, baseUrl) {
  let attribution = null;
  if (row.attribution !== null && row.attribution !== undefined) {
    if (typeof row.attribution === "string") {
      try {
        attribution = JSON.parse(row.attribution);
      } catch {
        attribution = row.attribution;
      }
    } else {
      // mysql2 may already return JSON columns as objects
      attribution = row.attribution;
    }
  }
  return {
    id: row.id,
    name: row.name,
    author_name: row.author_name,
    img: row.img,
    lang: row.lang,
    timesPlayed: row.times_played,
    type: row.type,
    musicName: row.music_file,
    audioUrl: row.music_file ? `${baseUrl}/media/${row.music_file}` : null,
    attribution,
  };
}

// GET /songs with optional filtering, search, pagination
// Query params:
//   lang=ENGLISH,HINDI      (comma separated)
//   q=keyword               (matches in name or author_name)
//   limit=20 offset=0       (pagination)
router.get("/", (req, res) => {
  const { lang, q } = req.query;
  let { limit, offset } = req.query;
  const where = [];
  const params = [];

  if (lang && lang !== "any") {
    const langs = lang
      .split(",")
      .map((l) => l.trim().toUpperCase())
      .filter(Boolean);
    if (langs.length) {
      where.push(
        'UPPER(IFNULL(lang, "")) IN (' + langs.map(() => "?").join(",") + ")"
      );
      params.push(...langs);
    }
  }
  if (q) {
    where.push("(UPPER(name) LIKE ? OR UPPER(IFNULL(author_name,'')) LIKE ?)");
    const like = `%${q.trim().toUpperCase()}%`;
    params.push(like, like);
  }

  let sql = "SELECT * FROM songs";
  if (where.length) sql += " WHERE " + where.join(" AND ");

  // Pagination (defaults)
  limit = parseInt(limit, 10);
  offset = parseInt(offset, 10);
  if (isNaN(limit) || limit <= 0 || limit > 100) limit = 50;
  if (isNaN(offset) || offset < 0) offset = 0;

  const paginatedSql = sql + " ORDER BY id ASC LIMIT ? OFFSET ?";
  const paginatedParams = [...params, limit, offset];

  // Count total without limit/offset for client pagination; send via header
  const countSql = "SELECT COUNT(*) AS total FROM (" + sql + ") AS base";

  db.query(countSql, params, (countErr, countRows) => {
    if (countErr) {
      console.error(countErr);
      return res.status(500).json({ error: "DB_ERROR" });
    }
    const total = countRows[0].total;
    db.query(paginatedSql, paginatedParams, (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "DB_ERROR" });
      }
      res.setHeader("X-Total-Count", total);
      // Backward compatibility: if client did not request pagination (no limit/offset/q/lang) and total == rows.length, just send array
      const usedFilters =
        (lang && lang !== "any") || q || req.query.limit || req.query.offset;
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      if (!usedFilters) {
        return res.json(rows.map((r) => mapSong(r, baseUrl)));
      }
      res.json({
        data: rows.map((r) => mapSong(r, baseUrl)),
        total,
        limit,
        offset,
      });
    });
  });
});

router.post("/", (req, res) => {
  const { name, author_name, img, lang, type, musicName, attribution } =
    req.body || {};
  // Basic validation
  if (!name || !musicName) {
    return res.status(400).json({ error: "NAME_AND_MUSICNAME_REQUIRED" });
  }
  if (name.length > 255) {
    return res.status(400).json({ error: "NAME_TOO_LONG" });
  }
  const sql = `INSERT INTO songs (name, author_name, img, lang, type, music_file, attribution) VALUES (?,?,?,?,?,?,?)`;
  db.query(
    sql,
    [
      name.trim(),
      author_name ? author_name.trim() : null,
      img || null,
      lang || null,
      type || null,
      musicName.trim(),
      attribution ? JSON.stringify(attribution) : null,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "DB_ERROR" });
      }
      db.query(
        "SELECT * FROM songs WHERE id = ?",
        [result.insertId],
        (e, rows) => {
          if (e) {
            console.error(e);
            return res.status(500).json({ error: "DB_ERROR" });
          }
          const baseUrl = `${req.protocol}://${req.get("host")}`;
          res.status(201).json(mapSong(rows[0], baseUrl));
        }
      );
    }
  );
});

// (Optional) Delete song - soft delete pattern could be used; for now hard delete
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM songs WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "DB_ERROR" });
    }
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "NOT_FOUND" });
    res.status(204).send();
  });
});

router.patch("/:id/play", (req, res) => {
  const { id } = req.params;
  db.query(
    "UPDATE songs SET times_played = times_played + 1 WHERE id = ?",
    [id],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "DB_ERROR" });
      }
      db.query("SELECT * FROM songs WHERE id = ?", [id], (e, rows) => {
        if (e) {
          console.error(e);
          return res.status(500).json({ error: "DB_ERROR" });
        }
        if (!rows.length) return res.status(404).json({ error: "NOT_FOUND" });
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        res.json(mapSong(rows[0], baseUrl));
      });
    }
  );
});

module.exports = router;
