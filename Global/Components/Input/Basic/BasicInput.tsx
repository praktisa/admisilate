import React, { forwardRef } from 'react'
import In from '../Input.module.css'

interface BasicInput_inter {
    type: string
    label: string
    inputMode: any
    placeholder: string
    maxLength: any
    ref: HTMLInputElement
    onKeyDown: any
    disabled: boolean
}

const BasicInput = forwardRef<HTMLInputElement, BasicInput_inter>(
    ({ type, label, placeholder, inputMode, maxLength, onKeyDown, disabled }, ref) => {

        function Enter(e: React.KeyboardEvent<HTMLInputElement>) {
            if (e.code === "Enter" || e.code === "NumpadEnter") {
                console.log("di Enter", (e.target as HTMLInputElement).value)
                onKeyDown()
            }


        }

        function FullType(e: React.KeyboardEvent<HTMLInputElement>) {
            if ((e.target as HTMLInputElement).value.length === 9) {
                onKeyDown()
            }
        }


        return (
            <>
                <label className={In['label']} htmlFor="basic">
                    <input
                        id="basic"
                        type={type}
                        ref={ref}
                        placeholder={placeholder}
                        inputMode={inputMode}
                        maxLength={maxLength}
                        onKeyDown={(e) => { Enter(e); }}
                        onKeyUp={(e) => { FullType(e); }}
                        autoComplete="off"
                        disabled={disabled}
                    />
                    <span className={In['span']} > {label}</span>
                </label>
            </>
        )

    });

BasicInput.displayName = "BasicInput"
export default BasicInput