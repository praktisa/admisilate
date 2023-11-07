
import { Logout } from "../../action/AuthAction"

export default function ActionLogout() {


    // function Logout() {
    //     deleteCookie("session", { path: '/', domain: 'localhost' });
    //     router.push('/Auth')
    // }

    return (
        <>
            <form action={Logout}>
                <input type="submit" value={"⇽ Keluar"} />


            </form>

        </>
    )
}