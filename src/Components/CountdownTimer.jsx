import { useEffect } from "react";
import PropTypes from "prop-types";

function CountdownTimer({ gameStarted, onTimeout, paused, timeLeft, setTimeLeft }) {
    useEffect(() => {
        let timerId;
        if (!paused && gameStarted && timeLeft > 0) {
            timerId = setInterval(() => {
                setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
            }, 1000);
        } else if (timeLeft <= 0) {
            onTimeout();
            setTimeLeft(30);
        }

        return () => {
            clearInterval(timerId);
        };
    }, [gameStarted, timeLeft, setTimeLeft, paused, onTimeout]);

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return (
            <span className="timer-values">{`${hours < 10 ? "0" : ""}${hours} : ${minutes < 10 ? "0" : ""}${minutes} : ${
                seconds < 10 ? "0" : ""
            }${seconds}`}</span>
        );
    };

    const timerClassName = `timer ${timeLeft <= 5 ? "red-text" : ""}`;

    return <div className={timerClassName}>{formatTime(timeLeft)}</div>;
}

CountdownTimer.propTypes = {
    gameStarted: PropTypes.bool.isRequired,
    onTimeout: PropTypes.func.isRequired,
    paused: PropTypes.bool.isRequired,
    timeLeft: PropTypes.number.isRequired,
    setTimeLeft: PropTypes.func.isRequired,
};

export default CountdownTimer;
