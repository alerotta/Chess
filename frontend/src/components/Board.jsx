import { ToggleButton, Box } from "@mui/material";
import { useState } from "react";
import axios from "axios"
import { useEffect } from "react"

const API_URL = import.meta.env.VITE_API_URL

function Board({ isFlipped, isPlayerWhite, gameId }) {

    const [selectedSquare, setSelectedSquare] = useState(null)
    const [firstClicked, setFirstClicked] = useState(null)
    const [pieces, setPieces] = useState(null)
    const [possibleMoves, setPossibleMoves] = useState(null)

    useEffect(() => {
        const fetchAPI = async () => {
            const response = await axios.get(`${API_URL}/game/${gameId}`)
            const filteredPieces = response.data.flat().filter(piece => piece !== null)
            setPieces(filteredPieces)
        };
        fetchAPI();
    }, [gameId])

    const handleMove = async (from, to) => {
        try {
            const response = await axios.post(`${API_URL}/game/${gameId}/move`, { from: from, to: to })
            setPieces(prevPieces =>
                prevPieces.map(piece =>
                    piece.square === from ? { ...piece, square: to } : piece
                )
            );
            const isCheckmate = response.data?.isCheckmate === true
            if (isCheckmate) {
                alert('Checkmate!');
            }
            setSelectedSquare(null)
            setFirstClicked(null)
        } catch (error) {
            console.error("Move failed:", error.response?.data?.error || error.message)
            setSelectedSquare(null)
            setFirstClicked(null)
        }

    }


    const getPossibleMoves = async (from) => {

        try {
            const response = await axios.post(`${API_URL}/game/${gameId}/possible-moves`, { square: from, verbose: true })
            const toList = response.data.map(move => move.to);
            setPossibleMoves(toList);

        } catch (error) {
            console.error("Move failed:", error.response?.data?.error || error.message)
            setSelectedSquare(null)
            setFirstClicked(null)
        }

    }





    const getPieceAtSquareId = (squareId) => {
        if (pieces != null)
            return pieces.find((piece) => piece.square === squareId) || null;
    }



    const getPieceIconPath = (type, color) => {
        let base = "../assets/"
        let ext = ".png"
        return base + type + color + ext
    }


    const handleSquareClick = (squareId) => {
        //first click
        if (firstClicked == null) {
            const piece = getPieceAtSquareId(squareId)

            // If square is empty, do nothing
            if (!piece) {
                setSelectedSquare(null)
                return
            }

            // If clicking the same selected square, deselect
            if (selectedSquare === squareId) {
                setSelectedSquare(null)
                return
            }

            // Check if it's the player's piece
            const isPlayerPiece = (piece.color === 'w' && isPlayerWhite) ||
                (piece.color === 'b' && !isPlayerWhite)

            if (isPlayerPiece) {
                setSelectedSquare(squareId)
                setFirstClicked(squareId)
                getPossibleMoves(squareId)
            } else {
                setSelectedSquare(null)
            }
        } else {
            setPossibleMoves(null)
            handleMove(firstClicked, squareId)
        }
    }


    const renderBoard = () => {
        const squares = [];

        let values = {
            0: 'a',
            1: 'b',
            2: 'c',
            3: 'd',
            4: 'e',
            5: 'f',
            6: 'g',
            7: 'h',
        }

        for (let row = 7; row >= 0; row--) {
            for (let col = 0; col < 8; col++) {

                const squareId = `${values[col]}${row + 1}`;
                const piece = getPieceAtSquareId(squareId)
                const isLight = (row + col + 1) % 2 === 0;
                const isPossibleMove = possibleMoves && possibleMoves.includes(squareId);


                squares.push(
                    <ToggleButton
                        key={squareId}
                        value={squareId}
                        selected={selectedSquare === squareId}
                        onChange={() => handleSquareClick(squareId)}
                        sx={{
                            width: 60,
                            height: 60,
                            backgroundColor: isPossibleMove
                                ? '#7ecbff' // highlight color
                                : isLight
                                    ? '#f0d9b5'
                                    : '#b58863',
                            '&:hover': {
                                backgroundColor: isPossibleMove
                                    ? '#5bb8e6'
                                    : isLight
                                        ? '#e6d0a5'
                                        : '#a57853',
                            },
                            '&.Mui-selected': {
                                backgroundColor: isPossibleMove
                                    ? '#00bfff'
                                    : isLight
                                        ? '#ffff00'
                                        : '#ddd000',
                                '&:hover': {
                                    backgroundColor: isPossibleMove
                                        ? '#009acd'
                                        : isLight
                                            ? '#eeee00'
                                            : '#ccc000',
                                },
                            },
                            minWidth: 'unset',
                            padding: 0,
                        }}
                    >
                        {piece && (
                            <img
                                src={getPieceIconPath(piece.type, piece.color)}
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