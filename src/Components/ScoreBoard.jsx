import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";

export default function ScoreBoard({ score, numbersWereGenerated, results, isTimerPaused, isAnimationActive }) {
    const { wins, losses, total } = score;
    const [delayedWins, setDelayedWins] = useState(wins);
    const [delayedLosses, setDelayedLosses] = useState(losses);
    const [delayedTotal, setDelayedTotal] = useState(total);
    const prevScore = useRef(score);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDelayedWins(wins);
            setDelayedLosses(losses);
            setDelayedTotal(total);
            prevScore.current = score;
        }, 500);
        return () => clearTimeout(timeout);
    }, [wins, losses, total, results, numbersWereGenerated, isTimerPaused, score]);

    const handleAnimationEnd = (event) => {
        const { animationName } = event;
        if (animationName === "scoreChange") {
            event.target.classList.add("scoreChange2");
            event.target.removeEventListener("animationend", handleAnimationEnd);
        }
    };

    return (
        <div className="scoreboard">
            <h2>Your Performance 📊</h2>
            <div className="score-num">
                <span className="wins">
                    Won:{" "}
                    <span
                        className={`wins-num ${results?.won && !numbersWereGenerated && !isTimerPaused ? "scoreChange" : ""}`}
                        onAnimationEnd={handleAnimationEnd}
                    >
                        {delayedWins}
                    </span>
                </span>
                <span className="losses">
                    Lost:{" "}
                    <span
                        className={`losses-num ${
                            (!results?.won && !numbersWereGenerated && !isTimerPaused && score.losses !== prevScore.current.losses) ||
                            (isAnimationActive && !results?.won)
                                ? "scoreChange"
                                : ""
                        }`}
                        onAnimationEnd={handleAnimationEnd}
                    >
                        {delayedLosses}
                    </span>
                </span>
                <span className="score-total">
                    Total:{" "}
                    <span
                        className={`total-num ${
                            (!numbersWereGenerated && !isTimerPaused && score.total !== prevScore.current.total) || isAnimationActive
                                ? "scoreChange"
                                : ""
                        }`}
                        onAnimationEnd={handleAnimationEnd}
                    >
                        {delayedTotal}
                    </span>
                </span>
            </div>
        </div>
    );
}

ScoreBoard.propTypes = {
    score: PropTypes.shape({
        wins: PropTypes.number.isRequired,
        losses: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
    }).isRequired,
    numbersWereGenerated: PropTypes.bool.isRequired,
    results: PropTypes.object,
    isTimerPaused: PropTypes.bool.isRequired,
    isAnimationActive: PropTypes.bool.isRequired,
};
