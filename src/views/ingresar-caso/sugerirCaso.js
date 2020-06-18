import React from 'react'
import TemplateNoLosOlvides from "views/template/templateNoLosOlvides";
import { Button, Label, FormGroup, Input, NavItem, NavLink, Nav, TabContent, TabPane, Container, Row, Col } from "reactstrap";
import Sugerencia from "model/sugerencia";

function ingresarSugerencia(evt) {
    var valor = document.getElementById(evt.target.name).value;
    if (validarIngreso(valor)) {
        var sugerenciaJson = {
            FechaIngreso: new Date(),
            Titulo: valor
        }
        Sugerencia.ingresarSugerencia(sugerenciaJson);
    }
}
function validarIngreso(valor) {
    return valor == null;
}
export default function SugerirCaso() {
    return (
        <Container>
            <Row>
                <Col>
                    <Input id="sugerencia" />
                </Col>
                <Col>
                    <Button name="sugerencia" onClick={(e) => { ingresarSugerencia(e); }}>Ingresar sugerencia</Button>
                </Col>
            </Row>
        </Container>
    )
}
