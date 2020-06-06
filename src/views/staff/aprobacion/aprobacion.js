import React from 'react'
import Ingresar from "views/ingresar-caso/ingresarCaso";
import { Button, Container, Row, Col } from 'reactstrap';
export default function Aprobacion() {
    function gestionar(estado) {

    }
    return (
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
