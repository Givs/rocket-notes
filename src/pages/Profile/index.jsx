import { useState } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera  } from 'react-icons/fi'
import { Container, Form, Avatar } from "./styles";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import avatarPlaceholder from '../../assets/avatar_placeholder.svg';

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

export function Profile(){

    const { user, updateProfile } = useAuth();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [passwordOld, setPasswordOld] = useState();
    const [passwordNew, setPasswordNew] = useState();

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
    const [avatar, setAvatar] = useState(avatarUrl);
    const [avatarFile, setAvatarFile] = useState(null);

    const navigate = useNavigate();
    
    async function handleUpdate(){
        const updated = {
            name,
            email,
            oldPassword: passwordOld,
            password: passwordNew 
        }

        const userUpdated = Object.assign(user, updated);

        await updateProfile({
            user: userUpdated,
            avatarFile
        });

        navigate(-1)
    }

    function handleChangeAvatar(e){
        const file = event.target.files[0];
        setAvatarFile(file);

        const imgPreview = URL.createObjectURL(file);
        setAvatar(imgPreview);
    }

    return (
        <Container>
            <header>
                <Link to="/">
                    <FiArrowLeft/>
                </Link>
            </header>
            <Form>
                <Avatar>
                    <img 
                        src={avatar ? avatar : avatarPlaceholder}
                        alt="Foto do Usuário" 
                    />
                    <label htmlFor="avatar">
                        <FiCamera/>

                        <input 
                            type="file"
                            id="avatar"
                            onChange={handleChangeAvatar}
                        />
                    </label>
                </Avatar>
                <Input
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <Input
                    placeholder="Email"
                    type="text"
                    icon={FiMail}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Input
                    placeholder="Senha Atual"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPasswordOld(e.target.value)}
                />
                <Input
                    placeholder="Senha Nova"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPasswordNew(e.target.value)}
                />

                <Button title="Salvar" onClick={handleUpdate}/>
            </Form>
        </Container>
    )
}