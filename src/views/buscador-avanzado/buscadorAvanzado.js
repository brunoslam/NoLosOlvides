import React from 'react'
import TemplateNoLosOlvides from "views/template/templateNoLosOlvides";
import {
    Button,
    Label,
    FormGroup,
    Input,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Container,
    Row,
    Col
} from "reactstrap";
export default function BuscadorAvanzado() {
    return (
        <TemplateNoLosOlvides>
            <Container>
                <Row>
                    <Col className="ml-auto mr-auto" md="6">
                        <Row className="my-1">
                            <Col className="ml-auto mr-auto text-dark font-weight-bold" md="6">Nombre:</Col>
                            <Col className="ml-auto mr-auto" md="6">
                                <Input id="txtNombrePersonaje" />
                            </Col>
                        </Row>
                        <Row className="my-1">
                            <Col className="ml-auto mr-auto text-dark font-weight-bold" md="6">Apellido:</Col>
                            <Col className="ml-auto mr-auto" md="6">
                                <Input id="txtApellidoPersonaje" />
                            </Col>
                        </Row>
                        <Row className="my-1">
                            <Col className="ml-auto mr-auto text-dark font-weight-bold" md="6">Cargo:</Col>
                            <Col className="ml-auto mr-auto" md="6">
                                <Input id="txtApellidoPersonaje" />
                            </Col>
                        </Row>
                        <Row className="my-1">
                            <Col className="ml-auto mr-auto text-dark font-weight-bold" md="6">Evidencia contiene:</Col>
                            <Col className="ml-auto mr-auto" md="6">
                                <Input id="txtApellidoPersonaje" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="my-5">
                    <Col className="ml-auto mr-auto " md="6"><Button className="btn btn-lg btn-block">Guardar</Button></Col>
                </Row>
            </Container>
        </TemplateNoLosOlvides>
    )
}
