
import React from 'react'
import ActionLogin from './components/ActionLogin/ActionLogin'
import { Login } from './action/AuthAction'
import N9L from './components/ActionLogin/NIP9Login.module.css'


export default function Page() {

    return (
        <>

            <ActionLogin ServerAction={Login} />
            {/* <div className={N9L['area']} >
                <ul className={N9L['circles']} >
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div > */}
        </>
    )
}
