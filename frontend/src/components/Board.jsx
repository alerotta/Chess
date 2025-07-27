import { ToggleButton, Box } from "@mui/material";
import { useState } from "react";

function Board({ isFlipped }) {

    const [selectedSquare, setSelectedSquare] = useState(null)
    const [firstClicked, setFirstClicked] = useState(null)
    const [pieces, setPieces] = useState([

        //black pieces 
        { position: '0-0', img: './assets/rook-black.png', color: 'balck', type: 'rook' },
        { position: '0-1', img: './assets/knight-black.png', color: 'black', type: 'knight' },
        { position: '0-2', img: './assets/bishop-black.png', color: 'black', type: 'bishop' },
        { position: '0-3', img: './assets/queen-black.png', color: 'black', type: 'queen' },
        { position: '0-4', img: './assets/king-black.png', color: 'black', type: 'king' },
        { position: '0-5', img: './assets/bishop-black.png', color: 'black', type: 'bishop' },
        { position: '0-6', img: './assets/knight-black.png', color: 'black', type: 'knight' },
        //black pawns
        { position: '0-7', img: './assets/rook-black.png', color: 'black', type: 'rook' },
        { position: '1-0', img: './assets/pawn-black.png', color: 'black', type: 'pawn' },
        { position: '1-1', img: './assets/pawn-black.png', color: 'black', type: 'pawn' },
        { position: '1-2', img: './assets/pawn-black.png', color: 'black', type: 'pawn' },
        { position: '1-3', img: './assets/pawn-black.png', color: 'black', type: 'pawn' },
        { position: '1-4', img: './assets/pawn-black.png', color: 'black', type: 'pawn' },
        { position: '1-5', img: './assets/pawn-black.png', color: 'black', type: 'pawn' },
        { position: '1-6', img: './assets/pawn-black.png', color: 'black', type: 'pawn' },
        { position: '1-7', img: './assets/pawn-black.png', color: 'black', type: 'pawn' },
        //white pawns
        { position: '6-0', img: './assets/pawn.png', color: 'white', type: 'pawn' },
        { position: '6-1', img: './assets/pawn.png', color: 'white', type: 'pawn' },
        { position: '6-2', img: './assets/pawn.png', color: 'white', type: 'pawn' },
        { position: '6-3', img: './assets/pawn.png', color: 'white', type: 'pawn' },
        { position: '6-4', img: './assets/pawn.png', color: 'white', type: 'pawn' },
        { position: '6-5', img: './assets/pawn.png', color: 'white', type: 'pawn' },
        { position: '6-6', img: './assets/pawn.png', color: 'white', type: 'pawn' },
        { position: '6-7', img: './assets/pawn.png', color: 'white', type: 'pawn' },
        { position: '7-0', img: './assets/rook.png', color: 'white', type: 'rook' },
        //white pieces 
        { position: '7-1', img: './assets/knight.png', color: 'white', type: 'knight' },
        { position: '7-2', img: './assets/bishop.png', color: 'white', type: 'bishop' },
        { position: '7-3', img: './assets/queen.png', color: 'white', type: 'queen' },
        { position: '7-4', img: './assets/king.png', color: 'white', type: 'king' },
        { position: '7-5', img: './assets/bishop.png', color: 'white', type: 'bishop' },
        { position: '7-6', img: './assets/knight.png', color: 'white', type: 'knight' },
        { position: '7-7', img: './assets/rook.png', color: 'white', type: 'rook' },
    ]);


    const getPieceAtPosition = (position) => {
        return pieces.find(piece => piece.position === position);
    };



    const handleSquareClick = (squareId) => {

        if (firstClicked == null) {
            if (getPieceAtPosition(squareId) == null) {
                setSelectedSquare(null)
                return
            }
            if (selectedSquare === squareId) {
                setSelectedSquare(null)
            }
            else {
                setSelectedSquare(squareId)
                setFirstClicked(squareId)
            }
        }
        else {

            setPieces()
            setSelectedSquare(null)
            setFirstClicked(null)
        }


    }





    const renderBoard = () => {
        const squares = [];

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {

                const squareId = `${row}-${col}`;
                const piece = getPieceAtPosition(squareId)
                const isLight = (row + col) % 2 === 0;


                squares.push(
                    <ToggleButton
                        key={squareId}
                        value={squareId}
                        selected={selectedSquare === squareId}
                        onChange={() => handleSquareClick(squareId)}
                        sx={{
                            width: 60,
                            height: 60,

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
                        {piece && (
                            <img
                                src={piece.img}
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