import React, { useEffect } from 'react'
import Board from './Board.js'
import { useState } from 'react'
import useCart from './hooks/useCart.js'
import { useSelector } from 'react-redux'
import useHook from './hooks/helper.js'
import { Settings } from './Settings.jsx'

const Game = () => {
    const {
        addItemToStorage,
        addStepCount,
        addHistory,
        addPlayer,
        resetGame,
        addXWins,
        addOWins,
        newGame,
    } = useCart()
    const { calculateWinner } = useHook()
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)

    const { step, gameHistory, xIsNext, winnings, game } = useSelector(
        (state) => state
    )
    const history = [Array(9).fill(null)] // ?
    const winner = calculateWinner()

    console.log('winner', winner)
    console.log('history', history)

    //store winnings to redux
    useEffect(() => {
        if (winner === 'X') {
            addXWins()
        }
        if (winner === 'O') {
            addOWins()
        }
    }, [winner])

    const xO = xIsNext ? 'X' : 'O'

    const handleClick = (i) => {
        const historyPoint =
            gameHistory.length > 0
                ? gameHistory.slice(0, step + 1)
                : history.slice(0, step + 1)

        const current = historyPoint[step]

        const squares = [...current]

        console.log('squares', squares, historyPoint)

        if (winner || squares[i]) return
        // select square
        squares[i] = xO

        // store game data to redux
        addItemToStorage(squares)
        // store game step history to redux
        addHistory([...historyPoint, squares])
        // store step count to redux
        addStepCount(historyPoint.length)
        // store next player history
        addPlayer(!xIsNext)
    }

    console.log('gameHistory', gameHistory.length)

    return (
        <>
            <h1>Tic Tac Tao with React-Redux</h1>
            <div className="headerMenu-wrapper">
                <button
                    disabled={gameHistory.length > 1 && !winner}
                    onClick={() => setIsSettingsOpen(true)}
                >
                    Settings
                </button>
                {isSettingsOpen && <Settings setSettings={setIsSettingsOpen} />}
                <h4
                    onClick={() => {
                        resetGame()
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    Reset Game
                </h4>
            </div>
            <Board onClick={handleClick} />
            <div className="info-wrapper">
                <h3>{winner ? 'Winner: ' + winner : 'Next Player: ' + xO}</h3>
                <button onClick={() => newGame(game)}>New Game</button>

                <div>Winnings </div>
                <div>X wins {winnings.xWins}</div>
                <div>O wins {winnings.oWins}</div>
            </div>
        </>
    )
}

export default Game
