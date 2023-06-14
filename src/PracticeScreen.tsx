import React from "react";

interface Word {
    id: number;
    word: string;
    pos: string;
}

interface PracticeScreenProps {
    progress: number;
    words: Word[];
    currentIndex: number;
    selectedOption: string;
    feedback: string;
    handleOptionSelect: (option: string) => void;
}

const PracticeScreen: React.FC<PracticeScreenProps> = ({
    progress,
    words,
    currentIndex,
    selectedOption,
    feedback,
    handleOptionSelect,
}) => {
    const currentWord = words[currentIndex];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6">Practice Screen</h1>
            <div className="flex flex-col items-center justify-center max-w-md w-full bg-white rounded-lg shadow-lg p-6">
                <p className="text-lg mb-4">Progress: {progress}%</p>
                <p className="text-2xl font-bold mb-6">Word: {currentWord.word}</p>
                <p className="text-lg mb-2">Part of Speech:</p>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${selectedOption !== "" && "opacity-50 cursor-not-allowed"
                            }`}
                        onClick={() => handleOptionSelect("noun")}
                        disabled={selectedOption !== ""}
                    >
                        Noun
                    </button>
                    <button
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${selectedOption !== "" && "opacity-50 cursor-not-allowed"
                            }`}
                        onClick={() => handleOptionSelect("adverb")}
                        disabled={selectedOption !== ""}
                    >
                        Adverb
                    </button>
                    <button
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${selectedOption !== "" && "opacity-50 cursor-not-allowed"
                            }`}
                        onClick={() => handleOptionSelect("adjective")}
                        disabled={selectedOption !== ""}
                    >
                        Adjective
                    </button>
                    <button
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${selectedOption !== "" && "opacity-50 cursor-not-allowed"
                            }`}
                        onClick={() => handleOptionSelect("verb")}
                        disabled={selectedOption !== ""}
                    >
                        Verb
                    </button>
                </div>
                {feedback && (
                    <p
                        className={`mt-4 text-lg text-center font-semibold ${selectedOption === currentWord.pos
                            ? "text-green-600"
                            : "text-red-600"
                            }`}
                    >
                        {feedback}
                    </p>
                )}
            </div>
        </div>
    );
};

export default PracticeScreen;
