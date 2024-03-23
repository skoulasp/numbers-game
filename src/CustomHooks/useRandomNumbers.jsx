import { useState } from "react";

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateNewNumbers() {
    const operations = ["addition", "subtraction", "multiplication", "division"];
    const selectedOperation = operations[getRandomNumber(0, 3)];

    let firstNumber = getRandomNumber(1, 999);
    let secondNumber = getRandomNumber(1, 999);
    let correctAnswer;
    let validDivision = false;

    switch (selectedOperation) {
        case "addition":
            correctAnswer = firstNumber + secondNumber;
            break;
        case "subtraction":
            correctAnswer = firstNumber - secondNumber;
            break;
        case "multiplication":
            firstNumber = getRandomNumber(1, 999);
            secondNumber = getRandomNumber(1, 999);
            correctAnswer = firstNumber * secondNumber;
            break;
        case "division":
            while (!validDivision) {
                secondNumber = getRandomNumber(1, 999);
                const maxDivisionResult = Math.floor(999 / secondNumber);
                const divisionResult = getRandomNumber(1, maxDivisionResult);

                if (999 % secondNumber === 0 && secondNumber !== 1) {
                    validDivision = true;
                    firstNumber = divisionResult * secondNumber;
                    correctAnswer = divisionResult;
                }
            }
            break;
        default:
            break;
    }

    const deviation = selectedOperation === "multiplication" ? 300 : selectedOperation === "division" ? 200 : 150;

    const wrongAnswers = new Set();
    while (wrongAnswers.size < 3) {
        const wrongAnswer = getRandomNumber(correctAnswer - deviation, correctAnswer + deviation);
        if (wrongAnswer !== correctAnswer) {
            wrongAnswers.add(wrongAnswer);
        }
    }

    const answerOptions = [correctAnswer, ...Array.from(wrongAnswers)].sort(() => Math.random() - 0.5);

    return {
        firstNumber,
        secondNumber,
        selectedOperation,
        correctAnswer,
        answerOptions,
    };
}

function useRandomNumbers() {
    const [numbers, setNumbers] = useState(generateNewNumbers());

    const regenerateNumbers = () => {
        setNumbers(generateNewNumbers());
    };

    return { ...numbers, regenerateNumbers };
}
export default useRandomNumbers;
