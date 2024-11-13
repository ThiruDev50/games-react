import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './MatchMatchLanding.module.scss'
import { GameCard } from '../../Common/AppComp/GameCard/GameCard'
import { AppButton, AppButtonWithChild } from '../../Common/AppButton/AppButton'
import Timer, { TimerHandle } from '../../Common/AppComp/Timer/Timer'
import { FaMinus, FaPlay, FaPlus } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const MatchMatchLanding: React.FC = () => {
    const matrixMinLimit: number = 3;
    const matrixMaxLimit: number = 20;
    const defaultMatrixSize: number = 4
    const [matrixSize, setmatrixSize] = useState<number>(defaultMatrixSize)
    const [currMatrixSize, setcurrMatrixSize] = useState<number>(defaultMatrixSize)
    const [boardData, setBoardData] = useState<string[]>([])
    const [gameKey, setGameKey] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true)
    const timerRef = useRef<TimerHandle>(null);

    const handleStart = () => timerRef.current?.start();
    const handlePause = () => timerRef.current?.pause();
    const handleContinue = () => timerRef.current?.continueTimer();
    const handleReset = () => timerRef.current?.reset();

    const prepareAndSetBoardData = useCallback(() => {
        let newBoardData = prepareBoardData()
        setBoardData(newBoardData)
        handleStart()
        setTimeout(() => {
            handleStart()
        }, 100)
    }, [matrixSize])
    const prepareBoardData = () => {
        const squared = matrixSize * matrixSize;

        // Step 2: Divide by 2
        const half = Math.floor(squared / 2);

        // Step 3: Generate 4 random numbers from 1 to 999
        let randoms: string[] = [];
        while (randoms.length < half) {
            let randomNumberStr: string = (Math.floor(Math.random() * 999) + 1) + ''
            if (!randoms.includes(randomNumberStr)) {
                randoms.push(randomNumberStr)
            }
        }

        // Step 4: Double the numbers (so we have 8 elements)
        let doubled = [...randoms, ...randoms];

        // Step 5: Check if total count is odd, if so add "#"
        if (doubled.length % 2 !== 0) {
            doubled.push("#");
        }

        // Step 6: Make sure the final list length matches squared number
        if (doubled.length < squared) {
            doubled.push("#");
        }
        const shuffleArray = (array: string[]): string[] => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
                [array[i], array[j]] = [array[j], array[i]]; // Swap elements
            }
            return array;
        };
        const boardData = shuffleArray(doubled.slice(0, squared));
        return boardData;
    }
    useEffect(() => {
        prepareAndSetBoardData()
    }, [matrixSize, prepareAndSetBoardData,])
    const handleGameComplete = () => {
        // alert("Game Over! All cards matched.");
    };

    const increaseMatrixValue = () => {
        if (currMatrixSize < matrixMaxLimit) {
            let newMatrixSize = currMatrixSize + 1
            setcurrMatrixSize(newMatrixSize)
        }
        else {
            // TODO: Show some snackbar
        }
    }
    const decreaseMatrixValue = () => {
        if (currMatrixSize > matrixMinLimit) {
            let newMatrixSize = currMatrixSize - 1
            setcurrMatrixSize(newMatrixSize)
        }
        else {
            // TODO: Show some snackbar
        }
    }

    const resetGame = () => {
        handleReset()
        setmatrixSize(currMatrixSize)
        prepareAndSetBoardData()
        setGameKey(prevKey => prevKey + 1);
        setIsTimerRunning(true)
    }

    const timerClicked = () => {
        // notify()
        if (isTimerRunning) {
            setIsTimerRunning(false)
            handlePause()

        }
        else {
            setIsTimerRunning(true)
            handleContinue()
        }
    }

    const resetTimerClicked = () => {
        handleReset();
        setIsTimerRunning(true)
        setTimeout(() => {
            handleStart()
        }, 100)
    }
    const notify = () => toast("Wow so easy!");
    return (
        <div className={styles.outer}>
            <div style={{ height: "6vh" }} />
            <GameCard label='Match-Match' />
            <div style={{ height: "2vh" }} />

            <div className={styles.gameSettingsBlock}>
                <div className={styles.matrixInp}>
                    <AppButtonWithChild onClick={decreaseMatrixValue}>
                        <FaMinus size={20} />
                    </AppButtonWithChild>
                    <div className={styles.matrixVal}>
                        {currMatrixSize}
                    </div>
                    <AppButtonWithChild onClick={increaseMatrixValue}>
                        <FaPlus size={20} />
                    </AppButtonWithChild>
                    <div style={{ width: "1.5vw" }}></div>
                    <AppButton style={{ fontWeight: "bold" }} label='Reset Game' onClick={resetGame} />

                </div>
                <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: 'center', gap: "2vw", flexWrap: 'wrap' }}>
                        <AppButtonWithChild onClick={timerClicked}>
                            <div className={styles.timerOuter}>
                                <div style={{ width: "5vw" }}>
                                    <Timer ref={timerRef} />
                                </div>
                                <div style={{ width: "0.3vw" }}></div>
                                {!isTimerRunning ? <FaPlay size={16} className={styles.playPauseIcon} /> : <FaPause size={16} className={styles.playPauseIcon} />}
                            </div>
                        </AppButtonWithChild>

                        <AppButton label='Reset Timer' onClick={resetTimerClicked}>

                        </AppButton>
                    </div>

                </div>
            </div>
            <div style={{ height: "2vh" }} />

            <div>
                <GameBoard key={gameKey} onGameComplete={handleGameComplete} boardData={boardData} matrixSize={matrixSize} />
            </div>
        </div>

    )
}


export const GameBoard: React.FC<GameBoardProps> = ({ boardData, matrixSize, onGameComplete }) => {
    const [flippedCards, setFlippedCards] = useState<number[]>([]); // Track flipped cards by index
    const [matchedCards, setMatchedCards] = useState<Set<number>>(new Set()); // Track matched cards
    useEffect(() => {
        // Total number of cards
        const totalCards = matrixSize * matrixSize;
        const matchedCount = (matchedCards.size / 2);
        const requiredMatchedCards = Math.floor(totalCards / 2);

        // If all cards are matched (or in the case of odd number of cards, all but one), trigger the game complete
        if (matchedCount === requiredMatchedCards) {
            onGameComplete();
        }
    }, [matchedCards, matrixSize, onGameComplete]);

    useEffect(() => {
        if (flippedCards.length === 2) {
            // If we have two cards flipped, check if they match
            const [firstCardIndex, secondCardIndex] = flippedCards;
            if (boardData[firstCardIndex] === boardData[secondCardIndex]) {
                setMatchedCards((prev) => new Set(prev).add(firstCardIndex).add(secondCardIndex));  // Keep the matched cards flipped
                setFlippedCards([]);
            } else {
                // Delay flipping them back
                setTimeout(() => {
                    setFlippedCards([]);
                }, 1000);  // Wait 1 second before resetting
            }
        }
    }, [flippedCards, boardData]);

    const handleCardClick = (cardIndex: number) => {
        // If the card is already matched or is currently flipped, don't flip it again
        if (matchedCards.has(cardIndex) || flippedCards.length === 2 || flippedCards.includes(cardIndex)) return;

        // If fewer than two cards are flipped, flip the card
        setFlippedCards((prev) => [...prev, cardIndex]);
    };

    const renderBoard = () => {
        const rows = [];
        let dataIndex = 0;

        for (let i = 0; i < matrixSize; i++) {
            const columns = [];
            for (let j = 0; j < matrixSize; j++) {
                const cardIndex = i * matrixSize + j;
                columns.push(
                    <GameCell
                        key={cardIndex}
                        cardIndex={cardIndex}
                        rowIndex={i}
                        columnIndex={j}
                        actualData={boardData[dataIndex++]}
                        flipped={flippedCards.includes(cardIndex) || matchedCards.has(cardIndex)} // Flip the card if it's in flippedCards or matchedCards
                        handleClick={handleCardClick}
                    />
                );
            }
            rows.push(
                <div key={i} className={styles.row}>
                    {columns}
                </div>
            );
        }

        return rows;
    };

    return <div className={styles.boardContainer}>{renderBoard()}</div>;
};

interface GameCellProps {
    rowIndex: number;
    columnIndex: number;
    actualData: string;
    cardIndex: number;  // This index is passed from GameBoard to identify the card
    flipped: boolean;   // Whether the card is flipped or not
    handleClick: (cardIndex: number) => void;  // Function to handle card flip
}

export const GameCell: React.FC<GameCellProps> = ({
    rowIndex,
    columnIndex,
    actualData,
    cardIndex,
    flipped,
    handleClick
}) => {
    return (
        <div
            onClick={() => handleClick(cardIndex)} // Call handleClick from GameBoard
            className={`${styles.cell} ${flipped ? styles.flipped : ""}`}
            key={`${rowIndex}-${columnIndex}`}
        >
            <div className={styles.inner}>
                <div className={styles.front}>
                    ✨
                    {/* {actualData} */}
                </div>
                <div className={styles.back}>
                    {actualData}
                    {/* ✨ */}
                </div>
            </div>
        </div>
    );
};
interface GameBoardProps {
    matrixSize: number;
    boardData: string[];
    onGameComplete: () => void;
}

