import React from 'react'
import { Button, Label, FormGroup, Input, NavItem, NavLink, Nav, TabContent, TabPane, Container, Row, Col } from "reactstrap";
import TemplateNoLosOlvides from "views/template/templateNoLosOlvides";
import Cargo from "model/cargos";
import Categoria from "model/categoria";
import CategoriaEvidencia from "model/categoriaEvidencia";

function insertarCargo(evt) {
    var valor = document.getElementById(evt.target.name).value;
    if (validar(valor)) {

        Cargo.insertarCargo({ Titulo: valor });
    }
}
function insertarCategoria(evt) {
    var valor = document.getElementById(evt.target.name).value;
    if (validar(valor)) {
        Categoria.insertarCategoria({ Titulo: valor });
    }
}
function insertarCategoriaEvidencia(evt) {
    var valor = document.getElementById(evt.target.name).value;
    if (validar(valor)) {
        CategoriaEvidencia.insertarCategoriaEvidencia({ Titulo: valor });
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
                        <Col md="12"><Input id="cargo" /></Col>
                        <Col md="12"><Button name="cargo" onClick={(e) => { insertarCargo(e); }}>Agregar cargo</Button></Col>
                    </Row>
                </Row>
                <Row>
                    <Row className="col-md-12">
                        <Col md="12"><h1>Mantenedor Categoría</h1></Col>
                    </Row>
                    <Row className="col-md-12">
                        <Col md="12"><Input id="categoria" /></Col>
                        <Col md="12"><Button name="categoria" onClick={(e) => { insertarCategoria(e); }}>Agregar categoría</Button></Col>
                    </Row>
                </Row>
                <Row>
                    <Row className="col-md-12">
                        <Col md="12"><h1>Mantenedor Categoría evidencia</h1></Col>
                    </Row>
                    <Row className="col-md-12">
                        <Col md="12"><Input id="categoriaEvidencia" /></Col>
                        <Col md="12"><Button name="categoriaEvidencia" onClick={(e) => { insertarCategoriaEvidencia(e); }}>Agregar categoría evidencia</Button></Col>
                    </Row>
                </Row>
            </Container>
        </TemplateNoLosOlvides>
    )
}
