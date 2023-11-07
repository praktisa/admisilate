import Navigator from "@/Global/Components/Navigator/Navigator"
import AR from './AppLayout.module.css'

interface children {
    children: React.ReactNode

}

export default function Applayout({ children }: children) {
    return (
        <div className={AR['AppRoot']} >
            <div className={AR['AppRoot__Nav']}>
                <Navigator />
            </div>
            <div className={AR['AppRoot__Content']}>
                {children}
            </div>

        </div>

    )
}
