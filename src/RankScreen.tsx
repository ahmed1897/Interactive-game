import React from "react";

interface RankScreenProps {
    rank: number | null;
    handleTryAgain: () => void;
}

const RankScreen: React.FC<RankScreenProps> = ({ rank, handleTryAgain }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6">Rank Screen</h1>
            <div className="flex flex-col items-center justify-center max-w-md w-full bg-white rounded-lg shadow-lg p-6">
                {rank !== null ? (
                    <>
                        <p className="text-lg mb-4">Your rank: {rank}</p>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleTryAgain}
                        >
                            Try Again
                        </button>
                    </>
                ) : (
                    <p>Loading rank...</p>
                )}
            </div>
        </div>
    );
};

export default RankScreen;
