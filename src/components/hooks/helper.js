import { useSelector } from 'react-redux'

const useHook = () => {
    const { step, gameHistory, game } = useSelector((state) => state)

    const boardSize = Math.sqrt(game.length)

    const generateWinningLines = (size) => {
        let lines = []

        // Horizontal and Vertical
        for (let i = 0; i < size; i++) {
            for (let j = 0; j <= size - 3; j++) {
                console.log(i * size + j)
                // Horizontal
                lines.push([i * size + j, i * size + j + 1, i * size + j + 2])
                // Vertical
                lines.push([
                    j * size + i,
                    (j + 1) * size + i,
                    (j + 2) * size + i,
                ])
            }
        }

        // Diagonal
        for (let i = 0; i <= size - 3; i++) {
            for (let j = 0; j <= size - 3; j++) {
                // Left to Right
                lines.push([
                    i * size + j,
                    (i + 1) * size + j + 1,
                    (i + 2) * size + j + 2,
                ])
                // Right to Left
                lines.push([
                    (i + 2) * size + j,
                    (i + 1) * size + j + 1,
                    i * size + j + 2,
                ])
            }
        }

        return lines
    }

    const calculateWinner = () => {
        let squares = gameHistory[step]
        const lines = generateWinningLines(boardSize)

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i]
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[a] === squares[c]
            ) {
                return squares[a]
            }
        }
        return null
    }

    return {
        calculateWinner,
    }
} //use hook ends

export default useHook
