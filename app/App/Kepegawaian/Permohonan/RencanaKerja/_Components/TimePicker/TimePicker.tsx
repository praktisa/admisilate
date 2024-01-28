'use client'
import React from 'react'
import TP from './TimePicker.module.css'

interface TimePicker {
    dj: string, dm: string, sj: string, sm: string, OnChange: any
}

export default function TimePicker({ dj, dm, sj, sm, OnChange }: TimePicker) {

    function OnChangeInput(e: any) {
        let x = e.keyCode

        console.log("e.keyCode", e)
        if (!(
            x >= 48 && x <= 57 ||
            x >= 96 && x <= 105 ||
            x === 8 ||
            x === 9 ||
            x === 46 ||
            x === 13 ||
            x === 37 ||
            x === 39 ||
            x === 86 && e.ctrlKey === true ||
            x === 65 && e.ctrlKey === true
        )) {
            e.preventDefault();
        }
    }

    function CustomInput({ def, name, index }: { def: string, name: string, index: number }) {
        return (
            <>
                <input
                    required
                    server-form="primary"
                    minLength={2}
                    maxLength={2}

                    tabIndex={index}
                    type='text'
                    pattern="[0-9]{2}"
                    name={name}
                    defaultValue={def}
                    onKeyDown={(e: any) => OnChangeInput(e)}
                    className={TP['TimePicker__Input']}
                    onChange={() => OnChange(false)}
                />
            </>
        )
    }

    return (


        <div className={TP['TimePicker__container']} >

            <div className={TP['TimePicker']}>
                <CustomInput def={dj} name="Dari_Jam" index={0} />
                <div>:</div>
                <CustomInput def={dm} name="Dari_Menit" index={0} />
            </div>
            <div>-</div>
            <div className={TP['TimePicker']}>
                <CustomInput def={sj} name="Sampai_Jam" index={0} />
                <div>:</div>
                <CustomInput def={sm} name="Sampai_Menit" index={0} />
            </div>


        </div>


    )
}


