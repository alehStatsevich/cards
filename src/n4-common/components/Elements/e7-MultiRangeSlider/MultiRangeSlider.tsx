import React, {ChangeEvent, FC, useCallback, useEffect, useRef, useState} from 'react'
import './multiRangeSlider.css'

interface MultiRangeSliderProps {
    min: number;
    max: number;
    currentMin: number;
    currentMax: number;
    disabled?: boolean
    onChange: Function;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({
                                                         min,
                                                         max,
                                                         currentMin,
                                                         currentMax,
                                                         disabled = false,
                                                         onChange
                                                     }) => {

    const [minVal, setMinVal] = useState(min)
    const [maxVal, setMaxVal] = useState(max)
    const minValRef = useRef(currentMin)
    const maxValRef = useRef(currentMax)
    const range = useRef<HTMLDivElement>(null)

    // Convert to percentage
    const getPercent = useCallback(
        (value: number) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    )

    useEffect(() => {
        setMinVal(currentMin)
        setMaxVal(currentMax)
    }, [currentMin, currentMax])
    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal)
        const maxPercent = getPercent(maxValRef.current)

        if (range.current) {
            range.current.style.left = `${minPercent}%`
            range.current.style.width = `${maxPercent - minPercent}%`
        }
    }, [minVal, getPercent])

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current)
        const maxPercent = getPercent(maxVal)

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`
        }
    }, [maxVal, getPercent])

    // Get min and max values when their state changes
    useEffect(() => {
        onChange(minVal, maxVal)
    }, [minVal, maxVal, onChange])

    return (
        <div className="container">
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const value = Math.min(Number(event.target.value), maxVal - 1)
                    setMinVal(value)
                    minValRef.current = value
                }}
                className="thumb thumb--left"
                disabled={disabled}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {

                    const value = Math.max(Number(event.target.value), minVal + 1)
                    setMaxVal(value)
                    maxValRef.current = value
                }}
                className="thumb thumb--right"
                disabled={disabled}
            />

            <div className="slider" aria-disabled={disabled}>
                <div className="slider__track"/>
                <div ref={range} className="slider__range"/>
                <div className="slider__left-value">{minVal}</div>
                <div className="slider__right-value">{maxVal}</div>
            </div>
        </div>
    )
}

export default MultiRangeSlider
