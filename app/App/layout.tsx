import Navigator from "@/Global/Components/Navigator/Navigator"
import AR from './AppLayout.module.css'
import GET_USER from "../Auth/action/function/GET_USER"

interface children {
    children: React.ReactNode

}

export default async function Applayout({ children }: children) {

    let User = await GET_USER()

    // console.log("GET_USER Applayout", User)

    return (
        <div className={AR['AppRoot']} >
            <div className={AR['AppRoot__Nav']}>
                <Navigator role={User} />
            </div>
            <div className={AR['AppRoot__Content']}>
                {children}
            </div>

        </div>

    )
}
