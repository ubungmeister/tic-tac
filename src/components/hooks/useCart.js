import {
    setGameInfo,
    setStepCount,
    setGameHistory,
    setPlayer,
    setXWins,
    setOWins,
    setResetWins,
} from '../Store/actions'

import { useDispatch } from 'react-redux'

const useCart = () => {
    const dispatch = useDispatch()

    const addItemToStorage = (item) => {
        //setGame(item);
        dispatch(setGameInfo(item))
    }

    const addStepCount = (item) => {
        //setStep(item);
        dispatch(setStepCount(item))
    }

    const addHistory = (item) => {
        //setGameHistoryCount(item);
        dispatch(setGameHistory(item))
    }

    const addPlayer = (item) => {
        dispatch(setPlayer(item))
    }

    const addXWins = () => {
        dispatch(setXWins())
    }

    const addOWins = () => {
        dispatch(setOWins())
    }

    const addResetWins = () => {
        dispatch(setResetWins())
    }

    const resetGame = () => {
        dispatch(
            setGameInfo([null, null, null, null, null, null, null, null, null])
        )
        dispatch(setStepCount(0))
        dispatch(setGameHistory([Array(9).fill(null)]))
        dispatch(setPlayer(true))
        addResetWins()
    }

    const newGame = (item) => {
        const nullArray = Array(item.length).fill(null)

        dispatch(setGameInfo(nullArray))
        dispatch(setStepCount(0))
        dispatch(setGameHistory([Array(item.length).fill(null)]))
        dispatch(setPlayer(true))
    }

    // on select the game size
    const setGame = (item) => {
        dispatch(setGameInfo(item))
        dispatch(setStepCount(0))
        dispatch(setGameHistory([Array(item.length).fill(null)]))
        dispatch(setPlayer(true))
    }

    return {
        addItemToStorage,
        addStepCount,
        addHistory,
        addPlayer,
        resetGame,
        setGame,
        addXWins,
        addOWins,
        newGame,
    }
} //use cart ends

export default useCart
