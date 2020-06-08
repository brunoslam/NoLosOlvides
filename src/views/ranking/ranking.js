import React from 'react'
import TemplateNoLosOlvides from "views/template/templateNoLosOlvides";
import Personaje from "model/personaje";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';
export default function Ranking() {
    const [personajeArr, setPersonaje] = React.useState([]);
    React.useEffect(() => {
        async function fetchState() {
            var PersonajeJSON = await Personaje.getPersonajesPendiente();
            setPersonaje(PersonajeJSON);
        }
        fetchState();

    });
    return (
        <TemplateNoLosOlvides>
            <p>Ranking</p>
            <Container>
                <Row>


                    {personajeArr.map((personaje) => {
                        return (
                            <Col sm="6">
                                <Card>
                                    <CardImg top width="100%" src={personaje.imagenUrl} alt="Card image cap" />
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
