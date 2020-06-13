import React from 'react'
import Ingresar from "views/ingresar-caso/ingresarCaso";
import { Button, Container, Row, Col } from 'reactstrap';
import SessionNoLosOlvides from "variables/sesiones";
import Personaje from "model/personaje";
export default function Aprobacion() {
    if (sessionStorage.getItem(SessionNoLosOlvides.loginState) != "true") {
        window.location.href = "/#/index";
    }


    async function gestionar(aprobacion) {
        if (window.confirm("¿Deseas gestionar este caso?") == true) {
            const personaje = JSON.parse(sessionStorage.getItem(SessionNoLosOlvides.casoAprobar));
            var personajeJson = await Personaje.getPersonajePorId(personaje.idPersonaje);
            personajeJson.idEstadoAprobacion = aprobacion ? 2 : 3;
            var flag = await Personaje.aprobarPersonaje(personajeJson);
        }
    }
    return (
        sessionStorage.getItem(SessionNoLosOlvides.loginState) != "true" ? <></> :
            <>
                <Container>
                    <Ingresar a={true} />
                    <Row>
                        <Col xs={{ size: 8, offset: 4 }} sm={{ size: 8, offset: 4 }} md={{ size: 8, offset: 4 }}>
                            <Button className="mr-5 btn-success" onClick={() => { gestionar(true); }}>Aprobar</Button>
                            <Button className="btn-danger" onClick={() => { gestionar(false); }}>Rechazar</Button>
                        </Col>
                    </Row>
                </Container>
            </>
    )
}
