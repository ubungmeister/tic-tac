import React from 'react'
import Square from './Square'
import { useSelector } from 'react-redux'

const Board = ({ onClick }) => {
    const { game } = useSelector((state) => state)

    console.log('game', game)
    return (
        <>
            <div
                className="board"
                style={{
                    display: 'grid',
                    gridTemplate: `repeat(${Math.sqrt(game.length)}, 1fr) / repeat(${Math.sqrt(game.length)}, 1fr)`,
                }}
            >
                {game.map((square, i) => (
                    <Square key={i} value={square} onClick={() => onClick(i)} />
                ))}
            </div>
        </>
    )
}

export default Board
