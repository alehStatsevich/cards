import s from './SelectPage.module.css'
import SuperSelect from '../Elements/e4-SuperSelect/SuperSelect'
import React from 'react'

type TSelectPageProps = {
    description?: string
    defaultValue?: any
    disabled?: boolean
    onChangeOptions?: (option: any) => void
}

export const SelectPage: React.FC<TSelectPageProps> = ({
                                                           onChangeOptions,
                                                           defaultValue,
                                                           disabled = false,
                                                           description
                                                       }) => {
    return (
        <div className={s.selectPage}>
            <span>Show</span>
            <SuperSelect options={[1, 3, 5, 7, 10, 15, 20, 40]}
                         onChangeOption={onChangeOptions}
                         defaultValue={defaultValue}
                         disabled={disabled}/>
            <span>{description}</span>
        </div>
    )
}