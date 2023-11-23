
import ActionLogout from "@/app/Auth/components/ActionLogout/ActionLogout";
import C_NavContainer from "./v1/C_NavContainer";
import S_NavContainer from "./v1/S_NavContainer";


export default function Navigator({ }) {

    let Menu: any = [
        {

            display: "Dashboard",
            link: "/App/Dashoard"
        },
        {

            display: "Kepegawaian",
            link: "/App/Kepegawaian"
        },
        {

            display: "Kendaraan Dinas",
            link: "/App/KendaraanDinas"
        },
        {

            display: "Barang Milik Negara",
            link: "/App/Dashoard"
        },
        {

            display: "Keuangan",
            link: "/App/Dashoard"
        },
        {

            display: "Kepatuhan",
            link: "/App/Dashoard"
        },
    ]

    return (
        <>

            <S_NavContainer logout={<ActionLogout />} >
                <C_NavContainer Menu={Menu} />
            </S_NavContainer>
        </>
    )
}
