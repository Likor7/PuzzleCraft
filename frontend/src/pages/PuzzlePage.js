import React, { useState, useEffect } from 'react';

const PuzzlePage = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [puzzlePieces, setPuzzlePieces] = useState([]);
    const [puzzleBoard, setPuzzleBoard] = useState([]);
    const [gridDimensions, setGridDimensions] = useState({ horizontal: 0, vertical: 0 });
    const [boardSize, setBoardSize] = useState({ width: 0, height: 0 });
    const [pieceSize, setPieceSize] = useState({ width: 0, height: 0 });

    const [isGameActive, setIsGameActive] = useState(false);
    const [timer, setTimer] = useState(0);

    const [showOriginal, setShowOriginal] = useState(false);

    useEffect(() => {
        const originalImageUrl = sessionStorage.getItem('originalImageUrl');
        const puzzlePieceUrls = JSON.parse(sessionStorage.getItem('puzzlePieceUrls'));
        const piecesHorizontal = sessionStorage.getItem('piecesHorizontal');
        const piecesVertical = sessionStorage.getItem('piecesVertical');
        const imageWidth = parseInt(sessionStorage.getItem('imageWidth'), 10);
        const imageHeight = parseInt(sessionStorage.getItem('imageHeight'), 10);

        if (originalImageUrl && puzzlePieceUrls && piecesHorizontal && piecesVertical) {
            setOriginalImage(originalImageUrl);
            setPuzzlePieces(puzzlePieceUrls);
            setGridDimensions({ horizontal: piecesHorizontal, vertical: piecesVertical });
            setPuzzleBoard(Array(puzzlePieces.length).fill(null));

            const ratio = 0.5;
            const maxWidth = window.innerWidth * ratio;
            const maxHeight = window.innerHeight * ratio;

            const aspectRatio = imageWidth / imageHeight;
            let boardWidth = maxWidth;
            let boardHeight = maxWidth / aspectRatio;

            if (boardHeight > maxHeight) {
                boardHeight = maxHeight;
                boardWidth = maxHeight * aspectRatio;
            }

            const pieceWidth = boardWidth / piecesHorizontal;
            const pieceHeight = boardHeight / piecesVertical;

            setPieceSize({ width: pieceWidth, height: pieceHeight });
            setBoardSize({ width: boardWidth, height: boardHeight });
        }

    }, [puzzlePieces.length]);

    useEffect(() => {
        let intervalId;

        if (isGameActive) {
            intervalId = setInterval(() => {
                setTimer((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isGameActive, puzzlePieces.length]);

    const startGame = () => {
        setIsGameActive(true);
    };

    const stopGame = () => {
        setIsGameActive(false);
        console.log(puzzlePieces);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleDragStart = (e, index) => {
        if (isGameActive) {
            e.dataTransfer.setData('text/plain', index + puzzleBoard.length);
        } else {
            e.preventDefault();
        }
    };

    const handleDragStartBoard = (e, index) => {
        if (isGameActive) {
            console.log("Another index: " + index);
            e.dataTransfer.setData('text/plain', index);
        } else {
            e.preventDefault();
        }
    };

    const handleDrop = (e, targetIndex) => {
        const sourceIndex = parseInt(e.dataTransfer.getData('text'), 10);
        let updatedBoard = [...puzzleBoard];
        let updatedPieces = [...puzzlePieces];
        if (sourceIndex < updatedBoard.length) {
            if (targetIndex !== sourceIndex) {
                const draggedPiece = updatedBoard[sourceIndex];
                const targetPiece = updatedBoard[targetIndex];

                updatedBoard[sourceIndex] = targetPiece ? targetPiece : null;
                updatedBoard[targetIndex] = draggedPiece;
            }
        } else {
            const pieceIndex = sourceIndex - updatedBoard.length;
            const draggedPiece = updatedPieces[pieceIndex];

            if (!updatedBoard[targetIndex]) {
                updatedBoard[targetIndex] = draggedPiece;
                updatedPieces[pieceIndex] = null;
            } else {
                updatedPieces[pieceIndex] = updatedBoard[targetIndex];
                updatedBoard[targetIndex] = draggedPiece;
            }
        }

        setPuzzleBoard(updatedBoard);
        setPuzzlePieces(updatedPieces);
    };

    const handleDropBack = (e) => {
        const sourceIndex = parseInt(e.dataTransfer.getData('text'), 10);
        let updatedBoard = [...puzzleBoard];
        let updatedPieces = [...puzzlePieces];

        if (sourceIndex >= 0 && sourceIndex < updatedBoard.length) {
            const emptyIndex = updatedPieces.findIndex((piece) => piece === null);
            if (emptyIndex !== -1) {
                updatedPieces[emptyIndex] = updatedBoard[sourceIndex];
            } else {
                updatedPieces.push(updatedBoard[sourceIndex]);
            }
            updatedBoard[sourceIndex] = null;
        }

        setPuzzleBoard(updatedBoard);
        setPuzzlePieces(updatedPieces);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const toggleShowOriginal = () => {
        setShowOriginal(!showOriginal);
    };

    const handleReset = () => {
        window.location.reload();
    };

    return (
        <div className="puzzle-page">
            <div className="puzzle-board" style={{
                gridTemplateColumns: `repeat(${gridDimensions.horizontal}, 1fr)`,
                gridTemplateRows: `repeat(${gridDimensions.vertical}, 1fr)`,
                width: `${boardSize.width}px`,
                height: `${boardSize.height}px`,
                position: 'relative',
            }}>
                {showOriginal && (
                    <img
                        src={originalImage}
                        alt="Original"
                        className="original-image"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: 0.5,
                        }}
                    />
                )}
                {puzzleBoard.map((pieceUrl, index) => (
                    <div
                        key={index}
                        onDrop={(e) => handleDrop(e, index)}
                        onDragOver={handleDragOver}
                        className={`puzzle-slot ${!pieceUrl ? 'is-empty' : ''}`}
                    >
                        {pieceUrl && <img
                            src={pieceUrl}
                            alt={`Puzzle piece`}
                            draggable
                            onDragStart={(e) => handleDragStartBoard(e, index)}
                            style={{
                                width: `${pieceSize.width}px`,
                                height: `${pieceSize.height}px`,
                            }}
                        />}
                    </div>
                ))}
            </div>

            <div className="puzzle-controls">
                <button onClick={startGame} disabled={isGameActive}>Start</button>
                <span>Time: {formatTime(timer)}</span>
                <button onClick={stopGame} disabled={!isGameActive}>Stop</button>
                <button onClick={handleReset}>Reset</button>
                <button onClick={toggleShowOriginal}>{showOriginal ? 'Hide' : 'Show'} Original</button>
            </div>

            <div className="puzzle-pieces"
                onDrop={handleDropBack}
                onDragOver={handleDragOver}
                style={{
                    justifyContent: puzzlePieces.every(piece => piece === null) ? 'center' : 'flex-start',
                }}>

                {puzzlePieces.every(piece => piece === null) ? (
                    <span className="drag-back-message">Drag Back Puzzle</span>
                ) : (
                    puzzlePieces.map((pieceUrl, index) => (
                        pieceUrl && (
                            <img
                                key={index}
                                src={pieceUrl}
                                alt={`Puzzle piece`}
                                className='puzzle-piece'
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                style={{
                                    width: `${pieceSize.width}px`,
                                    height: `${pieceSize.height}px`,
                                }}
                            />
                        )
                    ))
                )}
            </div>
        </div>
    );
};
export default PuzzlePage;