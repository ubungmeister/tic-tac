import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['game', 'step', 'gameHistory', 'xIsNext', 'winnings'],
}
const persistedReducer = persistReducer(persistConfig, reducer)

const middleware = [thunk]
const store = createStore(persistedReducer, applyMiddleware(...middleware))
let persistor = persistStore(store)

const StateProvider = ({ children }) => {
    return (
        <Provider store={store}>
            <PersistGate
                loading={'<div>Loading...</div>'}
                persistor={persistor}
            >
                {children}
            </PersistGate>
        </Provider>
    )
}

export { StateProvider, store, persistor }
