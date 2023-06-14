const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"], // Use an array to specify multiple methods
    allowedHeaders: ["Content-Type"], // Use an array to specify multiple headers
  })
);
app.use(express.json());
// Load the TestData.json file
const testData = require("./TestData.json");

// Endpoint to fetch a list of words
app.get("/words", (req, res) => {
  const selectedWords = getRandomWords(10); // Select 10 random words
  res.json({ wordList: selectedWords });
});

// Endpoint to calculate rank based on the final score
app.post("/rank", (req, res) => {
  try {
    const score = req.body.score;
    const scoresList = testData.scoresList.sort((a, b) => a - b);
    const belowScore = scoresList.filter((s) => s < score).length;
    const rank = (belowScore / scoresList.length) * 100;
    const roundedRank = Math.round(rank * 100) / 100; // Round to the nearest hundredth
    res.json({ rank: roundedRank.toFixed(2) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Function to select random words
const getRandomWords = (count) => {
  const wordList = testData.wordList.slice(); // Create a copy of the word list
  const selectedWords = [];

  // Shuffle the word list using Fisher-Yates algorithm
  for (let i = wordList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [wordList[i], wordList[j]] = [wordList[j], wordList[i]];
  }

  // Select the first `count` words from the shuffled list
  for (let i = 0; i < count; i++) {
    const word = wordList[i];
    selectedWords.push({
      id: word.id,
      word: word.word,
      pos: word.pos,
    });
  }

  return selectedWords;
};

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
