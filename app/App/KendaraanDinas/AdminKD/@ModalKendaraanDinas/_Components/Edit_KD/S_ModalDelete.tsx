import React from 'react'
import SMD from './S_modalDelete.module.css'

interface S_ModalDelete__inter {
    batal: React.ReactNode, hapus: React.ReactNode, mobil: string
}

export default function S_ModalDelete({ batal, hapus, mobil }: S_ModalDelete__inter) {
    return (
        <>
            <div className={SMD['Position']}>
                <div className={SMD['Modal__Container']}>
                    <div className={SMD['LogoWarning']}>⚠️</div>


                    <h2 className={SMD['Container__Question']}>
                        Hapus Mobil ? <b>{mobil}</b>
                    </h2>

                    <div className={SMD['Container__Caution']}>
                        <div className={SMD['Caution']}>
                            Mobil yang dihapus tidak dapat kembali
                        </div>
                    </div>

                    <div className={SMD['Container__Selection']}>

                        {batal}
                        {hapus}
                    </div>
                </div>
            </div>
        </>
    )
}
