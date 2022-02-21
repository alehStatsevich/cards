import React, {useState} from 'react'
import SuperInputText from '../../n4-common/components/Elements/e3-SuperInputText/SuperInputText'
import SuperButton from '../../n4-common/components/Elements/e1-SuperButton/SuperButton'
import SuperCheckbox from '../../n4-common/components/Elements/e2-SuperCheckboxe/SuperCheckbox'


export const Tests = () => {
    const [text, setText] = useState('')
    const [disabled, setDisabled] = useState(false)

    const style = {margin: '10px'}

    return (
        <div style={style}>
            <SuperInputText value={text} onChangeText={setText} style={style}/> <br/>
            <SuperCheckbox checked={disabled} onChangeChecked={setDisabled} style={style}>
                disable
            </SuperCheckbox><br/>
            <SuperButton onClick={() => alert(`You've printed: ${text}`)} disabled={disabled} style={style}>
                Send
            </SuperButton>
        </div>
    )
}


