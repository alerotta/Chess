import { ToggleButton, Box } from "@mui/material";
import { useState } from "react";
import axios from "axios"
import { useEffect } from "react"

function Board({ isFlipped }) {

    const [selectedSquare, setSelectedSquare] = useState(null)
    const [firstClicked, setFirstClicked] = useState(null)
    const [pieces, setPieces] = useState(null)

    const fetchAPI = async () => {

        const response = await axios.get("http://localhost:8080/game")
        const filteredPieces = response.data.flat().filter(piece => piece !== null)
        setPieces(filteredPieces)
        console.log(filteredPieces)
    };

    useEffect(() => {
        fetchAPI();
    }, [])



    const getPieceAtSquareId = (squareId) => {
        if (pieces != null)
            return pieces.find((piece) => piece.square === squareId) || null;
    }



    const getPieceIconPath = (type, color) => {
        let base = "./assets/"
        let ext = ".png"
        return base + type + color + ext
    }







    const handleSquareClick = (squareId) => {

        if (firstClicked == null) {

            //check if sqaure is empty, if yes cannot be selected
            if (getPieceAtSquareId(squareId) == null) {
                setSelectedSquare(null)
                return
            }
            //check if sqaure is selected, if yes cannot deselect
            if (selectedSquare === squareId) {
                setSelectedSquare(null)
            }
            //select square
            else {
                setSelectedSquare(squareId)
                setFirstClicked(squareId)
            }
        }
        else {
            //modify piece position
            setPieces(prevPieces => prevPieces.map(piece => piece.square === firstClicked ? { ...piece, square: squareId } : piece))
            setSelectedSquare(null)
            setFirstClicked(null)
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

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {

                const squareId = `${values[col]}${row + 1}`;
                const piece = getPieceAtSquareId(squareId)
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