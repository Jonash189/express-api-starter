import express from "express";
import cors from "cors";
import boardgames from "./data/boardgames.json";

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// Dokumentation av API
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Jonas boardgames API! Choose from the endpoints below:",
    endpoints: {
      "/boardgames": "Explore all boardgames",
      "/category?category=<category>": "Get all boardgames by category",
      "/maxPlayers?maxPlayers=<number>": "Get all boardgames by maximum number of players",
      "/boardgames/:id": "Get a single boardgame by ID"
    }
  });
});

// Returnera alla spel
app.get("/boardgames", (req, res) => {
  res.json(boardgames);
});

// Returnera alla spel i en viss kategori
app.get("/category", (req, res) => {
  const category = req.query.category;
  const filteredGames = boardgames.filter(game =>
    game.category.toLowerCase() === (category || "").toLowerCase()
  );
  res.json(filteredGames);
});

// Returnera alla spel med max antal spelare
app.get("/maxPlayers", (req, res) => {
  const maxPlayers = parseInt(req.query.maxPlayers, 10);

  if (isNaN(maxPlayers)) {
    return res.json([]);
  }

  const filteredMaxPlayers = boardgames.filter(game =>
    game.maxPlayers === maxPlayers
  );

  res.json(filteredMaxPlayers);
});

// Returnera ett specifikt spel baserat på ID
app.get("/boardgames/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const boardgame = boardgames.find(game => game.id === id);

  if (boardgame) {
    res.json(boardgame);
  } else {
    res.status(404).json({ error: "Boardgame not found" });
  }
});

// Starta servern
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
