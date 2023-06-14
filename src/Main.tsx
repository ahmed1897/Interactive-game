import React, { useState, useEffect } from "react";
import axios from "axios";
import PracticeScreen from "./PracticeScreen.tsx";
import RankScreen from "./RankScreen.tsx";

interface Word {
  id: number;
  word: string;
  pos: string;
}

interface RankResponse {
  rank: number;
}

const Main: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [showRankScreen, setShowRankScreen] = useState<boolean>(false);
  const [rank, setRank] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const response = await axios.get<{ wordList: Word[] }>(
        "http://localhost:5000/words"
      );
      const wordList = response.data.wordList.map((item) => ({
        id: item.id,
        word: item.word,
        pos: item.pos,
      }));
      setWords(wordList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);

    if (option === words[currentIndex].pos) {
      setFeedback("Correct!");
      setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
    } else {
      setFeedback("Incorrect!");
    }

    const newProgress = ((currentIndex + 1) / words.length) * 100;
    setProgress(parseFloat(newProgress.toFixed(2)));

    if (currentIndex === words.length - 1) {
      setShowRankScreen(true);
      calculateRank();
    } else {
      setTimeout(() => {
        setSelectedOption("");
        setFeedback("");
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 1500);
    }
  };

  const handleTryAgain = () => {
    setCurrentIndex(0);
    setSelectedOption("");
    setFeedback("");
    setProgress(0);
    setShowRankScreen(false);
    setRank(null);
    setCorrectAnswers(0);
    fetchWords();
  };

  const calculateRank = async () => {
    try {
      const score = (correctAnswers / words.length) * 100;
      const response = await axios.post<RankResponse>("http://localhost:5000/rank", {
        score: score,
      });
      setRank(response.data.rank);
    } catch (error) {
      console.log(error);
      setRank(null);
    }
  };

  if (words.length === 0) {
    return <div>Loading...</div>;
  }

  if (showRankScreen) {
    return <RankScreen rank={rank} handleTryAgain={handleTryAgain} />;
  }

  return (
    <PracticeScreen
      progress={progress}
      words={words}
      currentIndex={currentIndex}
      selectedOption={selectedOption}
      feedback={feedback}
      handleOptionSelect={handleOptionSelect}
    />
  );
};

export default Main;
