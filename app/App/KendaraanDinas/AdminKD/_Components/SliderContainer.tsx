

import LAKD from '../layoutAdminKD.module.css'


interface CMP_Container__inter {
    children: React.ReactNode, head: string

}

export default function SliderContainer({ children, head }: CMP_Container__inter) {
    return (
        <>
            <div className={LAKD['relative']} >

                <div className={`${LAKD['container']} ${LAKD['draw']}`}>
                    <h4 className={LAKD['container__head']} >{head}</h4>
                    <div className={LAKD['overflow']}>
                        {children}
                    </div>
                </div>

            </div>

        </>
    )
}