import React from 'react'
import ReactDom from 'react-dom'
import './index.css'
import Game from './components/Game'
import { StateProvider } from './components/Store/store'

ReactDom.render(
    <StateProvider>
        <Game />
    </StateProvider>,
    document.getElementById('root')
)
