import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function PauseButton({ pause, onToggle, disabled, gameStarted, openInfoModal }) {
    const [countdown, setCountdown] = useState(120);

    useEffect(() => {
        if (disabled) {
            setCountdown(120);
            const interval = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown > 0) {
                        return prevCountdown - 1;
                    } else {
                        clearInterval(interval);
                        return 0;
                    }
                });
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [disabled]);

    const isButtonDisabled = disabled;

    const handleInfoClick = () => {
        if (!gameStarted) {
            openInfoModal();
        }
    };

    return (
        <button
            className={`pause-btn ${isButtonDisabled && gameStarted ? "disabled" : ""}${
                isButtonDisabled && !gameStarted ? "inactive" : ""
            }`}
            onClick={!gameStarted ? handleInfoClick : onToggle}
            disabled={isButtonDisabled}
        >
            {isButtonDisabled && gameStarted ? (
                <>
                    DISABLED <br />
                    {`${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, "0")}`}
                </>
            ) : !gameStarted ? (
                "INFO"
            ) : pause ? (
                "Resume"
            ) : (
                "Pause"
            )}
        </button>
    );
}

PauseButton.propTypes = {
    pause: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    gameStarted: PropTypes.bool.isRequired,
    openInfoModal: PropTypes.func.isRequired,
};
