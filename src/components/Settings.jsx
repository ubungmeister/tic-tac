import React, { useState } from 'react'
import Select from 'react-select'
import useCart from './hooks/useCart'
import { useSelector } from 'react-redux'

export const Settings = ({ setSettings }) => {
    const { setGame } = useCart()
    const { game } = useSelector((state) => state)

    const options = [
        {
            value: 9,
            label: '3',
            array: [null, null, null, null, null, null, null, null, null],
        },
        {
            value: 16,
            label: '4',
            // prettier-ignore
            array: [null, null, null, null, null, null, null, null, null,null, null, null, null, null, null, null],
        },
        {
            value: 25,
            label: '5',
            // prettier-ignore
            array: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,null, null, null, null, null, null, null],
        },
    ]

    const defaultOption = game
        ? options.find((option) => option.value === game.length)
        : options[0]

    const [selectedOption, setSelectedOption] = useState(defaultOption)

    const onChangeHandler = (selectedOption) => {
        setSelectedOption(selectedOption)
        setGame(selectedOption.array)
    }

    return (
        <div className="modal-wrapper">
            <Select
                options={options}
                value={selectedOption}
                onChange={onChangeHandler}
            />
            <button onClick={() => setSettings(false)}>Close</button>
        </div>
    )
}
