import React from 'react'
import LabelArea from '../_Label/TextArea/LabelArea'


interface TextArea__Inter {
    label: string
    rows?: number
    editValue?: string
}

const TextArea = ({ label, rows = 0, editValue = "" }: TextArea__Inter) => {
    return (

        <LabelArea htmlFor={"Area " + label} label={label} >
            <textarea rows={rows}
                spellCheck="false"
                id={"Area " + label}
                placeholder={``}
                name={label}
                defaultValue={editValue}
                required
            >
                {/* {editValue} */}
            </textarea>
        </LabelArea>
    )
}

export default TextArea
