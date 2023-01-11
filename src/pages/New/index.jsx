import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Form } from "./styles";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";

import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Textarea } from "../../components/TextArea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'

export function New(){

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState("");

    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    function handleAddLinkAndTag(setx, sety, newz) {
        if (newz){
            setx(prevState => [...prevState, newz]);
            sety("");
        } else {
            alert("Insira um conteúdo!");
        }
 
    }

    function handleRemoveLinkAndTag(deleted, setx, sety) {
        setx(prevState => prevState.filter(sety => sety !== deleted));
    }

    const navigate = useNavigate();

    async function handleNewNote(params) {

        if(newTag || newLink){
            return alert("Clique no botão para adicionar uma tag ou um link!");
        }

        if (!title) {
            return alert("Adicione um título para sua nota.")
        }

        await api.post("/notes", { 
            title,
            description,
            tags,
            links
         });

         alert("Nota criada com sucesso!");
         navigate("/");
    }


    return (
        <Container>
            <Header/>
            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <Link to="/">voltar</Link>
                    </header>
                    <Input 
                        placeholder="Título"
                        onChange={ e => setTitle(e.target.value) }
                    />
                    <Textarea 
                        placeholder="Observações"
                        onChange={ e => setDescription(e.target.value) }
                    />

                    <Section  title="Links Úteis">
                        {
                            links.map((link, index) => (
                                <NoteItem 
                                    key={String(index)}
                                    value={link}
                                    onClick={() => handleRemoveLinkAndTag(link, setLinks, link)} 
                                />
                            ))
                        }
                        <NoteItem 
                            value={newLink}
                            onChange={e => setNewLink(e.target.value)}
                            onClick={() => handleAddLinkAndTag(setLinks, setNewLink, newLink)} 
                            isNew 
                            placeholder="Novo link"
                        />
                    </Section>

                    <Section  title="Marcadores">
                        <div className="tags">
                            {
                                tags.map((tag, index) => (
                                    <NoteItem 
                                        key={String(index)}
                                        value={tag}
                                        onClick={() => handleRemoveLinkAndTag(tag, setTags, tag)}
                                    />
                                ))
                            }
                            <NoteItem 
                                isNew 
                                placeholder="Nova tag"
                                onChange={e => setNewTag(e.target.value)}
                                value={newTag}
                                onClick={() => handleAddLinkAndTag(setTags, setNewTag, newTag)}
                            />
                        </div>
                    </Section>
                    <Button 
                        title="Salvar" 
                        onClick={handleNewNote}
                    />
                </Form>
            </main>
        </Container>
    )
}