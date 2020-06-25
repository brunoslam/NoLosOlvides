import React, { useEffect } from 'react'
import TemplateNoLosOlvides from "views/template/templateNoLosOlvides";
import Personaje from "model/personaje";
import {
    Card, CardImg, CardText, CardHeader, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';
export default function Ranking() {
    const [personajeArr, setPersonaje] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    async function fetchState() {
        if (isLoading) {
            var PersonajeJSON = await Personaje.getPersonajes();
            setIsLoading(false);
            setPersonaje(PersonajeJSON);
        }

    }
    useEffect(() => {
        fetchState();
    }, [isLoading]);
    
    return (
        <TemplateNoLosOlvides>
            <p>Ranking</p>
            <Container>
                <Row>


                    {personajeArr.map((personaje, index) => {
                        return (
                            <Col sm="6">
                                <Card>
                                    <CardHeader style={{
                                        maxHeight: "200px",
                                        display: "flex"
                                    }}>
                                        {/* <CardText>#{index + 1}</CardText> */}
                                        <CardImg top width="100%" src={personaje.imagenUrl} alt="Card image cap" />
                                    </CardHeader>
                                    <CardBody>
                                        <CardTitle>{personaje.nombre} {personaje.apellido}</CardTitle>
                                        <CardSubtitle>Card subtitle</CardSubtitle>
                                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                        <Button>Button</Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </TemplateNoLosOlvides>
    )
}
