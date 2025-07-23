import { ToggleButton, Box } from "@mui/material";
import { useState } from "react";

function Board() {

    const [selectedSquare, setSelectedSquare] = useState(null)

    const renderBoard = () => {
        const squares = [];

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {

                const sqaureId = `${row}-${col}`;
                const isLight = (row + col) % 2 === 0;

                squares.push(
                    <ToggleButton
                        key={sqaureId}
                        value={sqaureId}
                        selected={selectedSquare === sqaureId}
                        onChange={() => setSelectedSquare(selectedSquare === sqaureId ? null : sqaureId)}
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
                    </ToggleButton>
                )
            }
        }

        return squares
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