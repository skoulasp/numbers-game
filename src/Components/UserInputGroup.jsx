import { useState } from "react";
import PropTypes from "prop-types";
import ResetButton from "./ResetButton";
import PauseButton from "./PauseButton";
import CountdownTimer from "./CountdownTimer";
import StartGameControlsFiller from "./StartGameControlsFiller";

export default function UserInputGroup({
    isTimerPaused,
    setIsTimerPaused,
    isAnimationActive,
    setIsAnimationActive,
    gameStarted,
    numbers,
    onAnswerSelected,
    toggleGame,
    continueGame,
    onTimeout,
    timeLeft,
    setTimeLeft,
    results,
    setResults,
    openInfoModal,
    removeNotificationText,
    numbersWereGenerated,
    setNumbersWereGenerated,
}) {
    const { answerOptions, regenerateNumbers } = numbers;
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [pauseDisabled, setPauseDisabled] = useState(false);
    console.log(numbersWereGenerated);
    const duration = 5;
    const handlePauseToggle = () => {
        if (!pauseDisabled) {
            setNumbersWereGenerated(false);
            setIsAnimationActive(true);
            setIsTimerPaused((prevIsPaused) => {
                if (prevIsPaused) {
                    regenerateNumbers();
                    setNumbersWereGenerated(true);
                    setIsAnimationActive(false);
                    setTimeLeft(30);
                    setPauseDisabled(true);
                    setTimeout(() => {
                        setPauseDisabled(false);
                    }, 120000);
                }
                return !prevIsPaused;
            });
            setIsAnimationActive(false);
            setNumbersWereGenerated(false);
            console.log("PAUSED");
        }
    };

    const handleAnimationEnd = (event) => {
        if (event.animationName === "fadeIn") {
            event.target.classList.remove("fadeIn");
        }
        if (results) {
            continueGame();
            setResults(null);
            setSelectedAnswer(null);
            setIsAnimationActive(false);
        }
    };

    const cancelHandlePauseToggle = () => {
        setPauseDisabled(false);
    };

    const handleAnswerSelected = (option) => {
        setIsAnimationActive(true);
        setSelectedAnswer(option);
        setResults(onAnswerSelected(option));
    };

    if (!gameStarted) {
        return (
            <div className="user-inputs">
                <PauseButton
                    pause={isTimerPaused}
                    onToggle={handlePauseToggle}
                    disabled={pauseDisabled}
                    gameStarted={gameStarted}
                    openInfoModal={openInfoModal}
                />
                <div className={`answers ${!gameStarted ? "inactive" : ""}`}>
                    <StartGameControlsFiller />
                </div>
                <ResetButton
                    toggleGame={toggleGame}
                    gameStarted={gameStarted}
                    cancelHandlePauseToggle={cancelHandlePauseToggle}
                    isAnimationActive={isAnimationActive}
                    removeNotificationText={removeNotificationText}
                    handleAnimationEnd={handleAnimationEnd}
                    pauseDisabled={!pauseDisabled}
                    setNumbersWereGenerated={setNumbersWereGenerated}
                />
            </div>
        );
    }

    return (
        <div className="user-inputs">
            <PauseButton
                pause={isTimerPaused}
                onToggle={handlePauseToggle}
                disabled={pauseDisabled}
                gameStarted={gameStarted}
                openInfoModal={openInfoModal}
            />
            <div className="answers">
                {answerOptions.map((option, index) => (
                    <button
                        key={index}
                        className={`answer answer-${index + 1}${selectedAnswer === option ? " selected" : ""}${
                            option.toString().length > 5 ? " large-number" : ""
                        }${option === results?.correctAnswer && results.won ? " answered-correctly" : ""}${
                            option === results?.correctAnswer && !results.won ? " correct-answer" : ""
                        }${selectedAnswer === option && option !== results?.correctAnswer ? " wrong-answer" : ""}${
                            isTimerPaused ? " game-paused" : ""
                        } ${numbersWereGenerated ? "fadeIn" : ""}`}
                        onClick={() => handleAnswerSelected(option)}
                        onAnimationEnd={handleAnimationEnd}
                        disabled={selectedAnswer !== null || isTimerPaused}
                    >
                        {option}
                    </button>
                ))}
                <CountdownTimer
                    gameStarted={gameStarted}
                    duration={duration}
                    onTimeout={onTimeout}
                    paused={isTimerPaused}
                    timeLeft={timeLeft}
                    setTimeLeft={setTimeLeft}
                />
            </div>
            <ResetButton
                toggleGame={toggleGame}
                gameStarted={gameStarted}
                cancelHandlePauseToggle={cancelHandlePauseToggle}
                isAnimationActive={isAnimationActive}
                removeNotificationText={removeNotificationText}
                handleAnimationEnd={handleAnimationEnd}
                pauseDisabled={!pauseDisabled}
                setNumbersWereGenerated={setNumbersWereGenerated}
            />
        </div>
    );
}

UserInputGroup.propTypes = {
    gameStarted: PropTypes.bool.isRequired,
    numbers: PropTypes.shape({
        correctAnswer: PropTypes.number.isRequired,
        answerOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
        regenerateNumbers: PropTypes.func.isRequired,
    }).isRequired,
    timeLeft: PropTypes.number.isRequired,
    setTimeLeft: PropTypes.func.isRequired,
    isAnimationActive: PropTypes.bool.isRequired,
    setIsAnimationActive: PropTypes.func.isRequired,
    isTimerPaused: PropTypes.bool.isRequired,
    setIsTimerPaused: PropTypes.func.isRequired,
    onAnswerSelected: PropTypes.func.isRequired,
    toggleGame: PropTypes.func.isRequired,
    continueGame: PropTypes.func.isRequired,
    onTimeout: PropTypes.func.isRequired,
    openInfoModal: PropTypes.func.isRequired,
    results: PropTypes.object,
    setResults: PropTypes.func.isRequired,
    removeNotificationText: PropTypes.func.isRequired,
    numbersWereGenerated: PropTypes.bool.isRequired,
    setNumbersWereGenerated: PropTypes.func.isRequired,
};
