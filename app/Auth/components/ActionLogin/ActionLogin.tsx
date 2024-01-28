'use client'
import N9L from './NIP9Login.module.css'
import { useRef, useState, useEffect } from 'react'
import Shimerloading from '@/Global/Components/Loading/Shimerloading'
import { useRouter } from 'next/navigation'

interface ActionLogin__inter {
    ServerAction: any
}

export default function ActionLogin({ ServerAction }: ActionLogin__inter) {

    const [Response, setResponse] = useState<any>({ "status": 0, "user": "", "load": false })
    const InputRef = useRef<HTMLInputElement | null>(null)

    const Router = useRouter()

    function OnChangeInput(e: any) {
        let x = e.keyCode

        // console.log("e.keyCode", e)
        if (!(
            x >= 48 && x <= 57 ||
            x >= 96 && x <= 105 ||
            x === 8 ||
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

    async function LoginProcess(form: FormData, ServerAction: any) {
        // setIsLoad(true)
        setResponse({ "status": 0, "user": "", "load": true })
        await ServerAction(form)
            .then((res: any) => {

                if (res.status === 1) {
                    let Inter = setInterval(() => {
                        setResponse(res)
                        clearInterval(Inter)
                    }, 1500)


                    let Redir = setInterval(() => {
                        Router.push('/App')
                        clearInterval(Redir)
                    }, 3000)
                }

                if (res.status === -1) {
                    let Inter = setInterval(() => {
                        setResponse(res)
                        clearInterval(Inter)
                    }, 500)

                }
            })
            .catch((error: any) => {
                console.log("Error", error)
                setResponse({ "status": -1, "user": "Pegawai Tidak Ditemukan", "load": false })

            })
    }

    useEffect(() => {
        InputRef.current?.focus()
    }, [Response])



    return (
        <>

            <div className={N9L['Position']}>
                <div className={N9L['Container']}>
                    <div className={N9L['Head']}>Atrium</div>
                    <p className={N9L['Paragraph']}>
                        Automasi Administrasi <span className={N9L['text_change']}></span>
                    </p>
                    <form
                        action={(form) => LoginProcess(form, ServerAction)}
                        className={N9L['Form']}
                    >

                        {
                            Response.load === true
                                ?
                                <>
                                    <Shimerloading loop={0} />
                                </>
                                :
                                <>
                                </>
                        }

                        <div
                            className={`
                                ${N9L['NotifStructure']} 
                                ${Response.status === 1 && N9L['Founded']}
                                ${Response.status === -1 && N9L['notFound']} 
                            `}
                        >
                            {Response.user}
                        </div>

                        <input
                            ref={InputRef}
                            autoFocus
                            autoComplete='off'
                            name='NIP9'
                            type="text" pattern="[0-9]{9}" maxLength={9}
                            disabled={Response.load}
                            placeholder='NIP PENDEK'
                            className={N9L['Input']}
                            onKeyDown={(e: any) => OnChangeInput(e)}
                        />

                    </form>

                </div>



            </div>
        </>
    )
}
