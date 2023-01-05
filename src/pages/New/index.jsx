import { Link } from "react-router-dom";
import { Container, Form } from "./styles";

import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Textarea } from "../../components/TextArea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'

export function New(){
    return (
        <Container>
            <Header/>
            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <Link to="/">voltar</Link>
                    </header>
                    <Input placeholder="Título"/>
                    <Textarea placeholder="Observações"/>

                    <Section  title="Links Úteis">
                        <NoteItem value="https://rocketseat.com.br"/>
                        <NoteItem value="" isNew placeholder="Novo link"/>
                    </Section>

                    <Section  title="Marcadores">
                        <div className="tags">
                            <NoteItem value="react"/>
                            <NoteItem value="" isNew placeholder="Nova tag"/>
                        </div>
                    </Section>
                    <Button title="Salvar"/>
                </Form>
            </main>
        </Container>
    )
}