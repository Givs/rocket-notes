import { RiShutDownLine } from 'react-icons/ri'

import { Container } from "./styles";
import { Profile } from "./styles";
import { Logout } from './styles';

export function Header(){
    return (
        <Container>
            <Profile>
                <img 
                    src="https://github.com/Givs.png"
                    alt="Foto usuário"
                />

                <div>
                    <span>Bem-vindo,</span>
                    <strong>Givaldo Neto</strong>
                </div>
            </Profile>

            <Logout>
                <RiShutDownLine/>
            </Logout>
        </Container>
    )
}