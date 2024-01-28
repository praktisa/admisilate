'use client'
import React, { useState, useRef, Fragment } from 'react'
import MI from './MultipleInput.module.css'
import StyledInput from '@/Global/Components/Input/Styled/StyledInput'

interface MultipleInput__inter {
    ArrayForm: string[]
    NameForm: string,
    SectionNameForm: string
}

interface FormInput__inter {
    [key: string]: string
}

export default function MultipleInput({ ArrayForm, NameForm, SectionNameForm }: MultipleInput__inter) {

    let Into_Initial = {
        "Status": "New"
    }

    let InsertNullForm = [Into_Initial]

    for (var i = 0; i < ArrayForm.length; i++) {
        Object.assign(Into_Initial, { [ArrayForm[i]]: "" })
    }


    const [FormInput, setFormInput] = useState<FormInput__inter[]>(InsertNullForm)

    function CreateMoreFormInput() {
        setFormInput([...UpdateForm(), ...InsertNullForm])
    }

    function RemoveFormInput(index: number) {
        let OldFormInput = UpdateForm()
        OldFormInput.splice(index, 1)
        console.log("RemoveFormInput", OldFormInput)
        setFormInput(OldFormInput)
    }

    const FormRef = useRef<HTMLDivElement | null>(null)

    function UpdateForm() {
        let Returned_Data = []
        let ArrayDOMForm = FormRef.current?.children as HTMLCollection

        for (var i = 0; i < ArrayDOMForm.length; i++) {
            let FormTarget = ArrayDOMForm[i].children[1].children as HTMLCollection

            let DataFromDOM = {}

            for (var o = 0; o < ArrayForm.length; o++) {
                Object.assign(DataFromDOM, { [ArrayForm[o]]: (FormTarget[o].children[0] as HTMLInputElement).value })
            }


            Returned_Data.push(DataFromDOM)
        }

        return Returned_Data
    }


    function CMP_Input({ Name, Index, Value }: { Name: string, Index: number, Value: string }) {
        return (
            <>
                <input
                    spellCheck={false}
                    server-form="primary"
                    type='text'
                    name={Name}
                    id={`${Name}_${Index}`}
                    placeholder=''
                    defaultValue={Value}
                    onKeyDown={() => UpdateForm()}
                />
            </>
        )
    }

    return (
        <>
            <div className={MI['Layout__Grid']} >
                <div className={MI['Grid__Area__Add']} >
                    <div className={MI['Circle__Add']} onClick={() => CreateMoreFormInput()} >
                        +
                    </div>
                </div>
                <div className={MI['Grid__Area__Form']} ref={FormRef} >
                    {
                        FormInput.map((FI: any, i: number) => {
                            let Index = i + 1
                            return (
                                <Fragment key={"MultiForm" + Index}>
                                    <div className={MI['Form__Container']} status-container={FI.Status} >
                                        <h3 className={MI['Form__Head']}>{SectionNameForm} {Index}</h3>
                                        <div className={MI['Form__Grid']} >

                                            {
                                                ArrayForm.map((AF, i) => {
                                                    return (
                                                        <Fragment key={AF + NameForm}>
                                                            <StyledInput label={AF} forId={`${AF}_${Index}`} withBorder>
                                                                <CMP_Input Name={NameForm + AF} Index={Index} Value={FI[AF]} />
                                                            </StyledInput>
                                                        </Fragment>
                                                    )
                                                })
                                            }
                                            {/*                                             
                                            <StyledInput label="Nama" forId={`Nama_${Index}`} withBorder>
                                                <CMP_Input Name={NameForm+"Nama"} Index={Index} Value={FI.Nama} />
                                            </StyledInput>

                                            <StyledInput label="NIP" forId={`NIP_${Index}`} withBorder>
                                                <CMP_Input Name={NameForm + "NIP"} Index={Index} Value={FI.NIP} />
                                            </StyledInput>

                                            <StyledInput label="Pangkat" forId={`Pangkat_${Index}`} withBorder>
                                                <CMP_Input Name={NameForm + "Pangkat"} Index={Index} Value={FI.Pangkat} />
                                            </StyledInput>

                                            <StyledInput label="Jabatan" forId={`Jabatan_${Index}`} withBorder>
                                                <CMP_Input Name={NameForm + "Jabatan"} Index={Index} Value={FI.Jabatan} />
                                            </StyledInput> */}
                                        </div>
                                        <div className={MI['Form__Delete']}>
                                            {
                                                FormInput.length !== 1
                                                    ?
                                                    <>
                                                        <div className={MI['Form__Delete__Button']} onClick={() => RemoveFormInput(i)}>
                                                            &#x2715;
                                                        </div>
                                                    </>
                                                    :
                                                    <></>
                                            }
                                        </div>
                                    </div>
                                </Fragment>
                            )
                        })
                    }


                </div>
            </div>
        </>
    )
}
