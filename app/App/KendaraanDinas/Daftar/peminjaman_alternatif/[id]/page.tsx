import React from 'react'
// Schema
import { READ_SESI_ALTERNATIF_BY_ID } from '@SchemaKD/schema_tb_kendaraan_alternatif'

// Fetch
import FETCH_GET_IMG from '../../Action/api/FETCH_GET_IMG/fetch'
import FETCH_GET_DATA_MOBIL_ALTERNATIF from '../../Action/api/FETCH_GET_DATA_MOBIL_ALTERNATIF/fetch'

// Action
import { ActionPinjamMobilAlternate } from '../../@modal/(.)peminjaman/[dk]/Action/ActionPinjamAlternate'

// style
import SA from '../../@modal/(.)peminjaman/[dk]/components/S_AlternateMobil.module.css'

// Component
import PortalNotification from '@/Global/Components/Portal/PortalNotification/PortalNotification'
import C_AlternateMobilForm from '../../@modal/(.)peminjaman/[dk]/components/C_AlternateMobilForm'



export default async function page_alternatif({ params }: { params: { id: string } }) {



    let DataAlternatif = await READ_SESI_ALTERNATIF_BY_ID(params.id)

    let DataAlternatif_KendaraanDinas = await FETCH_GET_DATA_MOBIL_ALTERNATIF((JSON.parse(DataAlternatif.STR_TGL_TERPESAN)))
    let DataAlternatif_IMG = await FETCH_GET_IMG()

    // console.log("DataAlternatif_KendaraanDinas", DataAlternatif_KendaraanDinas)

    return (
        <>
            <div className={SA['Alternate__position']} >
                <div className={SA['Alternate__container']}>
                    <PortalNotification>
                        <C_AlternateMobilForm
                            tgl_terpesan={(JSON.parse(DataAlternatif.STR_TGL_TERPESAN))}
                            str_tujuan={DataAlternatif.STR_TUJUAN}
                            str_lokasi={DataAlternatif.STR_TEMPAT}
                            id_alternatif={params.id}

                            mobil_alternatif={DataAlternatif_KendaraanDinas}
                            mobil_img={DataAlternatif_IMG}
                            ActionPinjamMobilAlternate={ActionPinjamMobilAlternate}
                        />
                    </PortalNotification>

                </div>
            </div >
        </>
    )
}
