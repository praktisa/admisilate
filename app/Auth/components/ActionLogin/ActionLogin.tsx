
import { Login } from '../../action/AuthAction'
import N9L from './NIP9Login.module.css'
import Notification from '../Notification/Notification'


export default function ActionLogin() {

    return (
        <>
            <div className={N9L['Position']}>
                <div className={N9L['Container']}>
                    <h1>Login Admisi</h1>
                    <form
                        action={Login}
                        className={N9L['Form']}
                    >
                        <Notification />
                        <input
                            autoFocus
                            autoComplete='off'
                            name='NIP9'
                            type="text" pattern="[0-9]{9}" maxLength={9}
                            placeholder='NIP PENDEK'
                            className={N9L['Input']}
                        />

                    </form>

                </div>
            </div>
        </>
    )
}
