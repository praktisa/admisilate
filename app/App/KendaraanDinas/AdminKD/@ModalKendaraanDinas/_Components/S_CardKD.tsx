import React from 'react'
import ImageFill from '../../../Daftar/Components/Image/ImageFill'
import DKN from './CardDataKendaraanDinas.module.css'

interface S_CardKD__inter {
    src: any, STR_NAMA: string, Display?: string
}

export default function S_CardKD({ src, STR_NAMA, Display }: S_CardKD__inter) {

    if (STR_NAMA != "Tambah") {
        return (
            <>
                <div className={DKN['CardKD__Container']} >
                    <div className={DKN['CardKD__img']} >
                        <ImageFill
                            src={src}
                            animated={false}
                            quality={100}
                            hover={false}
                        />
                        <div className={`${DKN['CardKD__name']} ${Display === STR_NAMA && DKN['CardKD__Active']} `} >
                            {STR_NAMA}
                        </div>
                    </div>

                </div>
            </>
        )
    } else if (STR_NAMA === "Tambah") {
        return (

            <div className={DKN['CardKD__img']} >
                <div className={DKN['CardKD__img__add']} >
                    &#x2b;
                </div>
            </div>

        )
    }

}
