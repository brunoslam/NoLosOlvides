import React from 'react'
import { Button, Label, FormGroup, Input, NavItem, NavLink, Nav, TabContent, TabPane, Container, Row, Col } from "reactstrap";
import TemplateNoLosOlvides from "views/template/templateNoLosOlvides";
import Cargo from "model/cargos";
import Categoria from "model/categoria";
import CategoriaEvidencia from "model/categoriaEvidencia";

function insertarCargo(evt) {
    if (validar("xd")) {

        Cargo.insertarCargo({ Titulo: "xDDDDDDDDDDDDDDD" });
    }
}
function insertarCategoria(evt) {
    if (validar("xd")) {

        Categoria.insertarCategoria({ Titulo: "xDDDDDDDDDDDDDDD" });
    }
}
function insertarCategoriaEvidencia(evt) {
    if (validar("xd")) {

        CategoriaEvidencia.insertarCategoriaEvidencia({ Titulo: "xDDDDDDDDDDDDDDD" });
    }
}
function validar(value) {
    return value ?? false;
}

export default function Mantenedores() {
    return (
        <TemplateNoLosOlvides>
            <Container>
                <Row>
                    <Row className="col-md-12">
                        <Col md="12"><h1>Mantenedor Cargo</h1></Col>
                    </Row>
                    <Row className="col-md-12">
                        <Col md="12"><Input /></Col>
                        <Col md="12"><Button onClick={(e) => { insertarCargo(e); }}>Agregar cargo</Button></Col>
                    </Row>
                </Row>
                <Row>
                    <Row className="col-md-12">
                        <Col md="12"><h1>Mantenedor Categoría</h1></Col>
                    </Row>
                    <Row className="col-md-12">
                        <Col md="12"><Input /></Col>
                        <Col md="12"><Button onClick={(e) => { insertarCategoria(e); }}>Agregar categoría</Button></Col>
                    </Row>
                </Row>
                <Row>
                    <Row className="col-md-12">
                        <Col md="12"><h1>Mantenedor Categoría evidencia</h1></Col>
                    </Row>
                    <Row className="col-md-12">
                        <Col md="12"><Input /></Col>
                        <Col md="12"><Button onClick={(e) => { insertarCategoriaEvidencia(e); }}>Agregar categoría evidencia</Button></Col>
                    </Row>
                </Row>
            </Container>
        </TemplateNoLosOlvides>
    )
}
