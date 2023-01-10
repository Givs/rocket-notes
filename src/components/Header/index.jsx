import { RiShutDownLine } from 'react-icons/ri';
import { useAuth } from '../../hooks/auth';


import { Container } from "./styles";
import { Profile } from "./styles";
import { Logout } from './styles';

export function Header(){

    const { signOut } = useAuth();

    return (
        <Container>
            <Profile to="Profile">
                <img 
                    src="https://github.com/Givs.png"
                    alt="Foto usuário"
                />

                <div>
                    <span>Bem-vindo,</span>
                    <strong>Givaldo Neto</strong>
                </div>
            </Profile>

            <Logout onClick={signOut}>
                <RiShutDownLine/>
            </Logout>
        </Container>
    )
}