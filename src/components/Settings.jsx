import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import useCart from './hooks/useCart'
import { useSelector } from 'react-redux'

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        color: 'black',
        backgroundColor: state.isSelected ? '#d3d3d9' : 'white',
    }),
}

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

    const closeOnEsc = (e) => {
        if (e.key === 'Escape') {
            setSettings(false)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', closeOnEsc)
        return () => document.removeEventListener('keydown', closeOnEsc)
    }, [])

    return (
        <div className="modal-wrapper">
            <div className="modal-content">
                <h3>Settings</h3>
                <div>
                    <h3>Board size:</h3>
                    <Select
                        options={options}
                        value={selectedOption}
                        onChange={onChangeHandler}
                        styles={customStyles}
                    />
                </div>
                <h4 onClick={() => setSettings(false)}>Back</h4>
            </div>
        </div>
    )
}
