
import ActionLogout from "@/app/Auth/components/ActionLogout/ActionLogout";
import C_NavContainer from "./v1/C_NavContainer";
import S_NavContainer from "./v1/S_NavContainer";


export default function Navigator({ }) {
    return (
        <>

            <S_NavContainer logout={<ActionLogout />} >
                <C_NavContainer />
            </S_NavContainer>
        </>
    )
}
