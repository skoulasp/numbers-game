import PropTypes from "prop-types";
import StartGameFiller from "./StartGameFiller";

const operationsMap = new Map([
    ["addition", "+"],
    ["subtraction", "−"],
    ["multiplication", "×"],
    ["division", "÷"],
]);

export default function Blackboard({
    gameStarted,
    numbers: { firstNumber, secondNumber, selectedOperation, correctAnswer },
    isTimerPaused,
    results,
    notificationRef,
    numbersWereGenerated,
}) {
    const selectedSymbol = operationsMap.get(selectedOperation);

    let notificationText = "";

    if (results?.won === true) {
        notificationText = "You Won!";
    } else if (results?.won === false) {
        notificationText = "You Lost!";
    }

    if (isTimerPaused) {
        notificationText = "Game is Paused";
    }

    if (!gameStarted) {
        return (
            <div className="calc-box">
                <h2>The Brain Challenge</h2>
                <div className="nums">
                    <StartGameFiller />
                </div>
                <span className="notification-text flashing-text">{notificationText}</span>
            </div>
        );
    }

    return (
        <div className="calc-box">
            <h2 className={numbersWereGenerated ? "fadeIn" : ""}>
                Calculate the <span className={selectedOperation}>{selectedOperation}</span>:
            </h2>
            <div className={`nums ${numbersWereGenerated ? "fadeIn" : ""}`}>
                <span className="num-one">{firstNumber}</span> <span className={`sign ${selectedOperation}`}>{selectedSymbol}</span>{" "}
                <span className="num-two">{secondNumber}</span> <span className="sign">=</span>{" "}
                <span className={`answer-placeholder ${results?.correctAnswer ? "hidden" : "questionmark"}`}>?</span>
                <span className={`num-final ${results?.correctAnswer ? "visible fadeIn" : ""}`}>{correctAnswer}</span>
            </div>
            <span
                ref={notificationRef}
                className={`notification-text flashing-text ${results?.won === true ? "won" : results?.won === false ? "lost" : ""}`}
            >
                {notificationText}
            </span>
            {/* <span className="notification-text flashing-text">{isTimerPaused ? "Game is Paused" : ""}</span> */}
        </div>
    );
}

Blackboard.propTypes = {
    gameStarted: PropTypes.bool.isRequired,
    numbers: PropTypes.shape({
        firstNumber: PropTypes.number.isRequired,
        secondNumber: PropTypes.number.isRequired,
        selectedOperation: PropTypes.string.isRequired,
        correctAnswer: PropTypes.number.isRequired,
    }).isRequired,
    isTimerPaused: PropTypes.bool.isRequired,
    results: PropTypes.shape({
        won: PropTypes.bool,
        correctAnswer: PropTypes.number,
    }),
    notificationRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    numbersWereGenerated: PropTypes.bool.isRequired,
};
