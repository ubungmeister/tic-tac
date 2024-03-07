const init = {
    game: [null, null, null, null, null, null, null, null, null],
    step: 0,
    gameHistory: [Array(9).fill(null)],
    xIsNext: true,
    winnings: {
        xWins: 0,
        oWins: 0,
    },
}

const reducer = (state = init, action) => {
    switch (action.type) {
        case 'SET_GAME_INFO':
            return {
                ...state,
                game: action.payload,
            }
        case 'SET_STEP':
            return {
                ...state,
                step: action.payload,
            }
        case 'SET_HISTORY':
            return {
                ...state,
                gameHistory: action.payload,
            }
        case 'SET_PLAYER':
            return {
                ...state,
                xIsNext: action.payload,
            }
        case 'SET_X_WINS':
            return {
                ...state,
                winnings: {
                    ...state.winnings,
                    xWins: state.winnings.xWins + 1,
                },
            }
        case 'SET_O_WINS':
            return {
                ...state,
                winnings: {
                    ...state.winnings,
                    oWins: state.winnings.oWins + 1,
                },
            }
        case 'RESET_WINS':
            return {
                ...state,
                winnings: {
                    xWins: 0,
                    oWins: 0,
                },
            }

        default:
            return state
    }
}

export default reducer
