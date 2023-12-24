'use client'
import Structure from '@/Global/Components/CTA/Structure'
import Shimerloading from '@/Global/Components/Loading/Shimerloading'
import React from 'react'

interface C_FormSubmit__inter {
    placeholder: string, loadingstate: string, isLoad: boolean
}

export default function C_FormSubmit({ placeholder, loadingstate, isLoad }: C_FormSubmit__inter) {


    let ButtonMsg = isLoad === false ? placeholder : loadingstate



    return (
        <>


            <label htmlFor='SubmitForm'>
                <Structure style={"containedCenter"}>
                    {
                        isLoad === true && <Shimerloading loop={0} />
                    }
                    {ButtonMsg}
                </Structure>
            </label>

            <input
                id="SubmitForm"
                type="submit"
                input-type="hidden"
                value={ButtonMsg}
                placeholder={placeholder}
                disabled={isLoad}
            />

        </>
    )
}
