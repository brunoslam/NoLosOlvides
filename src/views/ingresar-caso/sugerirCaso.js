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
    if (valor == "") {
        alert("Debes ingresar un valor");
        return false;
    } else if (valor.trim().split(" ").length < 2) {
        alert("Debes ingresar al menos un nombre y un apellido");
        return false;
    }
    return true;
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
