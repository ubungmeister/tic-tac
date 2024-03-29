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

    //store winnings to redux
    useEffect(() => {
        if (winner === 'X') {
            addXWins()
        }
        if (winner === 'O') {
            addOWins()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [winner])

    const xO = xIsNext ? 'X' : 'O'

    const handleClick = (i) => {
        console.log('i', i)
        const historyPoint =
            gameHistory.length > 0
                ? gameHistory.slice(0, step + 1)
                : history.slice(0, step + 1)

        console.log('historyPoint', historyPoint)

        const current = historyPoint[step]
        console.log('current', current)
        const squares = [...current]

        if (winner || squares[i]) return
        // select square
        squares[i] = xO

        // store game data to redux
        console.log('squares', squares)
        addItemToStorage(squares)
        // store game step history to redux
        addHistory([...historyPoint, squares])
        // store step count to redux
        addStepCount(historyPoint.length)
        // store next player history
        addPlayer(!xIsNext)
    }

    const handleSettingsClick = () => {
        if (gameHistory.length <= 1 || winner) {
            setIsSettingsOpen(true)
        }
    }

    return (
        <>
            <h1>Tic Tac Tao with React-Redux</h1>
            <div className="headerMenu-wrapper">
                <h4
                    style={{
                        cursor: 'pointer',
                        color: gameHistory.length > 1 && !winner && 'gray',
                    }}
                    onClick={handleSettingsClick}
                >
                    Settings
                </h4>
                {isSettingsOpen && <Settings setSettings={setIsSettingsOpen} />}
                <h4
                    onClick={() => {
                        resetGame()
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    Reset
                </h4>
            </div>
            <Board onClick={handleClick} />
            <div className="info-wrapper">
                <div className="info-win-wrapper">
                    <h3>
                        {winner ? 'Winner: ' + winner : 'Next Player: ' + xO}
                    </h3>
                    <h3>X player wins {winnings.xWins}</h3>
                    <h3>O player wins {winnings.oWins}</h3>
                </div>
                <h4 style={{ cursor: 'pointer' }} onClick={() => newGame(game)}>
                    New Game
                </h4>
            </div>
        </>
    )
}

export default Game
