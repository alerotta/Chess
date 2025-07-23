import { ToggleButton, Box } from "@mui/material";
import { useState } from "react";

function Board({ isFlipped }) {

    const [selectedSquare, setSelectedSquare] = useState(null)
    const piecePositions = {

        '0-0': './assets/rook-black.png',
        '0-1': './assets/knight-black.png',
        '0-2': './assets/bishop-black.png',
        '0-3': './assets/queen-black.png',
        '0-4': './assets/king-black.png',
        '0-5': './assets/bishop-black.png',
        '0-6': './assets/knight-black.png',
        '0-7': './assets/rook-black.png',
        '1-0': './assets/pawn-black.png',
        '1-1': './assets/pawn-black.png',
        '1-2': './assets/pawn-black.png',
        '1-3': './assets/pawn-black.png',
        '1-4': './assets/pawn-black.png',
        '1-5': './assets/pawn-black.png',
        '1-6': './assets/pawn-black.png',
        '1-7': './assets/pawn-black.png',
        '6-0': './assets/pawn.png',
        '6-1': './assets/pawn.png',
        '6-2': './assets/pawn.png',
        '6-3': './assets/pawn.png',
        '6-4': './assets/pawn.png',
        '6-5': './assets/pawn.png',
        '6-6': './assets/pawn.png',
        '6-7': './assets/pawn.png',
        '7-0': './assets/rook.png',
        '7-1': './assets/knight.png',
        '7-2': './assets/bishop.png',
        '7-3': './assets/queen.png',
        '7-4': './assets/king.png',
        '7-5': './assets/bishop.png',
        '7-6': './assets/knight.png',
        '7-7': './assets/rook.png',
    };



    const renderBoard = () => {
        const squares = [];

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {

                const squareId = `${row}-${col}`;
                const isLight = (row + col) % 2 === 0;

                const pieceImage = piecePositions[squareId];

                squares.push(
                    <ToggleButton
                        key={squareId}
                        value={squareId}
                        selected={selectedSquare === squareId}
                        onChange={() => setSelectedSquare(selectedSquare === squareId ? null : squareId)}
                        sx={{
                            width: 60,
                            height: 60,
                            border: '1px solid #333',
                            backgroundColor: isLight ? '#f0d9b5' : '#b58863',
                            '&:hover': {
                                backgroundColor: isLight ? '#e6d0a5' : '#a57853',
                            },
                            '&.Mui-selected': {
                                backgroundColor: isLight ? '#ffff00' : '#ddd000',
                                '&:hover': {
                                    backgroundColor: isLight ? '#eeee00' : '#ccc000',
                                },
                            },
                            minWidth: 'unset',
                            padding: 0,
                        }}
                    >
                        {pieceImage && (
                            <img
                                src={pieceImage}
                                alt="Piece"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                }}
                            />
                        )}
                    </ToggleButton>
                )
            }
        }


        return isFlipped ? squares.reverse() : squares
    }

    return (
        <>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(8, 60px)',
                    gridTemplateRows: 'repeat(8, 60px)',
                    gap: 0,
                    border: '2px solid #333',
                    width: 'fit-content',
                    margin: '0 auto',
                }}
            >
                {renderBoard()}
            </Box>
        </>
    )
}


export default Board 