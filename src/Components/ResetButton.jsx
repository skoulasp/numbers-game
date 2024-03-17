import PropTypes from "prop-types";

export default function ResetButton({
    toggleGame,
    gameStarted,
    cancelHandlePauseToggle,
    isAnimationActive,
    removeNotificationText,
    handleAnimationEnd,
    pauseDisabled,
    setNumbersWereGenerated,
}) {
    function handleClick() {
        if (isAnimationActive) {
            handleAnimationEnd();
            removeNotificationText();
        }
        if (pauseDisabled) {
            setNumbersWereGenerated(true);
        }

        toggleGame();
        cancelHandlePauseToggle();
    }

    return (
        <button onClick={handleClick} className="reset-btn">
            {gameStarted ? "Reset" : "Start"}
        </button>
    );
}

ResetButton.propTypes = {
    toggleGame: PropTypes.func.isRequired,
    gameStarted: PropTypes.bool.isRequired,
    pauseDisabled: PropTypes.bool.isRequired,
    cancelHandlePauseToggle: PropTypes.func.isRequired,
    isAnimationActive: PropTypes.bool.isRequired,
    removeNotificationText: PropTypes.func.isRequired,
    handleAnimationEnd: PropTypes.func.isRequired,
    setNumbersWereGenerated: PropTypes.func.isRequired,
};
