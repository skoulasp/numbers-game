import { useState, useEffect, useRef } from "react";
import Blackboard from "./Blackboard";
import UserInputGroup from "./UserInputGroup";
import ScoreBoard from "./ScoreBoard";
import useRandomNumbers from "../CustomHooks/useRandomNumbers";
import Modal from "./Modal";

export default function Container() {
    const [gameStarted, setGameStarted] = useState(false);
    const [numbersWereGenerated, setNumbersWereGenerated] = useState(true);
    const [isTimerPaused, setIsTimerPaused] = useState(false);
    const numbers = useRandomNumbers();
    console.log(numbers);
    const [results, setResults] = useState(null);
    const [excellence, setExcellence] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalExitAnimation, setModalExitAnimation] = useState(false);
    const [isAnimationActive, setIsAnimationActive] = useState(false);
    const [score, setScore] = useState({
        wins: 0,
        losses: 0,
        total: 0,
    });

    const [timeLeft, setTimeLeft] = useState(30);
    const [longestStreak, setLongestStreak] = useState(() => {
        const storedLongestStreak = localStorage.getItem("longestStreak");
        return storedLongestStreak ? parseInt(storedLongestStreak) : 0;
    });
    const [currentStreak, setCurrentStreak] = useState(0); // Track current streak

    useEffect(() => {
        // Update local storage with longest streak whenever it changes
        localStorage.setItem("longestStreak", longestStreak.toString());
    }, [longestStreak]);

    useEffect(() => {
        if (currentStreak > longestStreak) {
            setLongestStreak(currentStreak);
        }
    }, [currentStreak, longestStreak]);
    console.log(openModal);
    const handleModalToggle = () => {
        if (openModal) {
            setModalExitAnimation(true);
            setTimeout(() => {
                setOpenModal((prev) => {
                    setModalExitAnimation(false);
                    return !prev;
                });
            }, 300);
        } else {
            setOpenModal((prev) => {
                return !prev;
            });
        }
    };

    function continueGame() {
        numbers.regenerateNumbers();
        setNumbersWereGenerated(true);
        setTimeLeft(30);
    }

    const handleAnswerSelected = (selectedAnswer) => {
        let results = null;
        setNumbersWereGenerated(false);
        if (selectedAnswer === numbers.correctAnswer) {
            console.log("WON");
            setScore((prevScore) => ({
                ...prevScore,
                wins: prevScore.wins + 1,
                total: prevScore.total + 1,
            }));
            setCurrentStreak((prevStreak) => prevStreak + 1);
            console.log(currentStreak);
            console.log(longestStreak);
            results = {
                correctAnswer: numbers.correctAnswer,
                selectedAnswer: selectedAnswer,
                won: true,
            };
        } else {
            console.log("LOST");
            setScore((prevScore) => ({
                ...prevScore,
                losses: prevScore.losses + 1,
                total: prevScore.total + 1,
            }));
            setCurrentStreak(0); // Reset current streak
            results = {
                correctAnswer: numbers.correctAnswer,
                selectedAnswer: selectedAnswer,
                won: false,
            };
        }

        return results;
    };

    const toggleGame = () => {
        if (!gameStarted) {
            setScore(() => ({
                wins: 0,
                losses: 0,
                total: 0,
            }));
            numbers.regenerateNumbers();
            setGameStarted(true);
            setTimeLeft(30);
            setIsTimerPaused(false);
        } else {
            setScore(() => ({
                wins: 0,
                losses: 0,
                total: 0,
            }));
            numbers.regenerateNumbers();
            setGameStarted(false);
            setTimeLeft(30);
            setIsTimerPaused(false);
            if (currentStreak > longestStreak) {
                setLongestStreak(currentStreak);
            }
            if (currentStreak > 20 && currentStreak > longestStreak) {
                setExcellence(true);
            }
            setCurrentStreak(0);
        }
    };

    const onTimeout = () => {
        setScore((prevScore) => ({
            ...prevScore,
            losses: prevScore.losses + 1,
            total: prevScore.total + 1,
        }));
        setIsAnimationActive(true);
        setNumbersWereGenerated(true);
        numbers.regenerateNumbers();
        setCurrentStreak(0);
        setTimeout(() => {
            setIsAnimationActive(false);
            setNumbersWereGenerated(false);
        }, 1000);
    };

    const notificationRef = useRef(null);

    function removeNotificationText() {
        if (notificationRef.current) {
            notificationRef.current.textContent = "";
        }
    }

    return (
        <>
            {openModal && (
                <Modal
                    title="Simple Math Practice Game"
                    text={
                        <>
                            Welcome to the Simple Math Practice Game – a tool designed to help you enhance your mental math skills through
                            engaging calculations. This isn&lsquo;t a traditional game with levels or set challenges; rather, it offers a
                            continuous practice experience to sharpen your mathematical prowess. Your progress isn&lsquo;t measured by
                            victories or milestones, but by the streak of correct answers you achieve without a single mistake. This
                            achievement is tracked using the local storage API, ensuring your best performances are recognized.
                            <br />
                            <br />
                            In your case, your current record for consecutive correct rounds stands at:
                            <span className={`magic-number ${longestStreak > 0 ? "" : "zero"}`}> {longestStreak}</span>
                            <br />
                            <br />
                            This web application was crafted using the React library, layered on top of HTML, CSS (leveraging Sass), and
                            JavaScript, all in the year 2023.
                            <br />
                            Sharpen your mind with every calculation and aim to surpass your best performance. Enjoy your math practice
                            journey!
                        </>
                    }
                    openInfoModal={handleModalToggle}
                    modalExitAnimation={modalExitAnimation}
                    setModalExitAnimation={setModalExitAnimation}
                />
            )}
            <main className="main">
                <div className={`container ${excellence ? "excellence" : ""}`}>
                    <Blackboard
                        gameStarted={gameStarted}
                        numbers={numbers}
                        isTimerPaused={isTimerPaused}
                        results={results}
                        notificationRef={notificationRef}
                        numbersWereGenerated={numbersWereGenerated}
                    />
                    <ScoreBoard
                        score={score}
                        numbersWereGenerated={numbersWereGenerated}
                        results={results}
                        isTimerPaused={isTimerPaused}
                        isAnimationActive={isAnimationActive}
                    />
                    <UserInputGroup
                        isTimerPaused={isTimerPaused}
                        setIsTimerPaused={setIsTimerPaused}
                        isAnimationActive={isAnimationActive}
                        setIsAnimationActive={setIsAnimationActive}
                        gameStarted={gameStarted}
                        setGameStarted={setGameStarted}
                        numbers={numbers}
                        onAnswerSelected={handleAnswerSelected}
                        toggleGame={toggleGame}
                        continueGame={continueGame}
                        onTimeout={onTimeout}
                        timeLeft={timeLeft}
                        setTimeLeft={setTimeLeft}
                        results={results}
                        setResults={setResults}
                        openInfoModal={handleModalToggle}
                        removeNotificationText={removeNotificationText}
                        numbersWereGenerated={numbersWereGenerated}
                        setNumbersWereGenerated={setNumbersWereGenerated}
                    />
                </div>
            </main>
        </>
    );
}
