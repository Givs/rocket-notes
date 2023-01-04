import { Container } from "./styles";

export function Button({ title, loading = false, ...rest }){
    return (
        <Container 
            Container 
            type="button" 
            disabled={loading} 
            {...rest}
        >
            { loading ? 'Carregando...' : title }
        </Container>
    )
}