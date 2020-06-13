// import React, { useState } from 'react';
import React, { Component } from 'react'
import TemplateNoLosOlvides from "views/template/templateNoLosOlvides";
import NoLosOlvidesInfo from "variables/NoLosOlvidesInfo";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import CloseIcon from '@material-ui/icons/Close';
import ReactDataGrid from 'react-data-grid';
import Categoria from "model/categoria";
import CategoriaEvidencia from "model/categoriaEvidencia";
import Cargos from "model/cargos";
import Personaje from "model/personaje";
import Utils from "model/utils";
import { MentionsInput, Mention } from 'react-mentions'
import SessionNoLosOlvides from "variables/sesiones";

import BusquedaAutoCompleteCategoria from "components/NoLosOlvides/busquedaAutoCompleteCategoria";
import { Button, Label, FormGroup, Input, NavItem, NavLink, Nav, TabContent, TabPane, Container, Row, Col } from "reactstrap";

export default class ingresarCaso extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [
            ],
            categorias: [],
            categoriasEvidencia: [],
            cargos: [],
            casoAprobar: null,
            evidencias: [],
            contadorId: 0,
            mention: "",
            cateriasSeleccionadas: [],
            cargosSeleccionados: [],
            isLoading: true
        };
        this.onGridRowsUpdated.bind(this);
        this.validarFormulario.bind(this);
        this.handleChangeInputEvidencia.bind(this);
        this.handleDeleteRow.bind(this);
        this.handleChangeMention.bind(this);
        this.handleChangeValueAcCargo.bind(this);
        this.handleChangeValueAcCategoria.bind(this);
    }
    renderTagSuggestion = [
        {
            id: 'walter',
            display: 'Walter White',
        },
        {
            id: 'jesse',
            display: 'Jesse Pinkman',
        },
        {
            id: 'gus',
            display: 'Gustavo "Gus" Fring',
        }
    ]

    async componentWillMount() {
        var categoriasJSON = await Categoria.getCategorias();
        var categoriasEvidenciaJSON = await CategoriaEvidencia.getCategoriasEvidencia();
        var cargosJSON = await Cargos.getCargos();
        var casoAprobar = null;
        if (this.props.a) {
            // casoAprobar = JSON.parse(sessionStorage.getItem(SessionNoLosOlvides.casoAprobar));
            const personaje = JSON.parse(sessionStorage.getItem(SessionNoLosOlvides.casoAprobar));
            casoAprobar = await Personaje.getPersonajePorId(personaje.idPersonaje);
        }

        this.setState({ categorias: categoriasJSON, categoriasEvidencia: categoriasEvidenciaJSON, cargos: cargosJSON, casoAprobar: casoAprobar, isLoading: false });
    }

    handleAddRow() {
        var arrEvidencias = this.state.evidencias;
        var id = this.state.contadorId + 1;
        arrEvidencias.push({
            id: id,
            titulo: null,
            descripcion: null,
            fecha: null,
            idCategoriaEvidencia: null,
            url: null,
        });
        this.setState({ evidencias: arrEvidencias, contadorId: id });
    }

    handleChangeInputEvidencia(e, evidenciaChange) {
        var arr = this.state.evidencias;
        arr.map((evidencia) => {
            if (evidencia.id == evidenciaChange.id) {
                if (e.target.id == "selectCargoPersonaje") {
                    evidencia[e.target.name] = parseInt(e.target.value);
                } else {
                    evidencia[e.target.name] = e.target.value;
                }

            }
        });
        this.setState({ evidencias: arr });
    }

    handleDeleteRow(evidenciaDelete) {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("¿Estás seguro de eliminar esta fila?")) {
            var arr = this.state.evidencias.filter((evidencia) => {
                return evidencia.id !== evidenciaDelete.id
            });
            this.setState({ evidencias: arr });
        }
    }
    handleChangeMention(event, newValue, newPlainTextValue, mentions) {
        this.setState({ mention: newValue });
    }
    handleChangeValueAcCargo(event, newValue) {
        this.setState({ cargosSeleccionados: newValue });
    }
    handleChangeValueAcCategoria(event, newValue) {
        this.setState({ cateriasSeleccionadas: newValue });
    }

    async validarFormulario() {
        var flagFormValido = true;

        var nombre = (document.getElementById("txtNombrePersonaje")).value;
        var apellido = (document.getElementById("txtApellidoPersonaje")).value;
        var descripcion = (document.getElementById("txtDescripcionPersonaje")).value;
        var rut = (document.getElementById("txtRutPersonaje")).value;
        var nacionalidad = (document.getElementById("txtNacionalidadPersonaje")).value;
        var cargos = this.state.cargosSeleccionados;
        var categorias = this.state.cateriasSeleccionadas;
        var imagenUrl = (document.getElementById("txtImagenPersonaje")).value;


        if (!nombre || !apellido || !cargos || !categorias) {
            alert("Debes completar los campos obligatorios");
            flagFormValido = false;
        }

        if (this.state.evidencias.length == 0) {
            alert("Debes ingresar al menos una evidencia");
            flagFormValido = false;
        } else {
            this.state.evidencias.map((row) => {
                if (!row.titulo || !row.descripcion || !row.fecha || !row.url || !row.idCategoriaEvidencia) {
                    alert("Debes compeltar todos los datos de las evidencias");
                    flagFormValido = false;
                }
            });
        }

        if (flagFormValido) {
            var personaje = {
                "nombre": nombre,
                "apellido": apellido,
                "descripcion": descripcion,
                "rut": rut,
                "nacionalidad": nacionalidad,
                // "idCargo": parseInt(cargo),
                "arrCargo": cargos,
                "arrCategoria": categorias,
                "imagenUrl": imagenUrl,
                "IdEstadoAprobacion": 1,
                "arrEvidencias": [

                ]
            }
            this.state.evidencias.map((evidencia) => {
                personaje.arrEvidencias.push(evidencia);
            });

            if (Personaje.checkPersonajePorNombre(personaje)) {
                if (window.confirm("¿Estás seguro que deseas ingresar esta información?") == true) {
                    //deshabilitar botón
                    Personaje.insertarPersonaje(personaje);
                }
            }


        }
    }
    onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        this.setState(state => {
            const rows = state.rows.slice();
            for (let i = fromRow; i <= toRow; i++) {
                rows[i] = { ...rows[i], ...updated };
            }
            return { rows };
        });
    };
    render() {
        if (this.state.isLoading) {
            return (<div></div>);
        } else {
            return (
                <TemplateNoLosOlvides>
                    <Container>
                        <Row>
                            <Col className="ml-auto mr-auto" md="6">
                                <Row className="my-1">
                                    <Col className="ml-auto mr-auto text-dark font-weight-bold" md="6">*Nombre:</Col>
                                    <Col className="ml-auto mr-auto" md="6">
                                        <Input id="txtNombrePersonaje" disabled={this.props.a} value={this.props.a ? this.state.casoAprobar.nombre : null} />
                                        {/* <MentionsInput value={this.state.mention} onChange={this.handleChangeMention.bind(this)}>
                                            <Mention
                                                trigger="@"
                                                data={this.props.users}
                                                renderSuggestion={this.renderTagSuggestion}
                                            />
                                            <Mention
                                                trigger="#"
                                                data={this.requestTag}
                                                renderSuggestion={this.renderTagSuggestion}
                                            />
                                        </MentionsInput> */}
                                    </Col>
                                </Row>
                                <Row className="my-1">
                                    <Col className="ml-auto mr-auto text-dark font-weight-bold" md="6">*Apellido:</Col>
                                    <Col className="ml-auto mr-auto" md="6">
                                        <Input id="txtApellidoPersonaje" disabled={this.props.a} value={this.props.a ? this.state.casoAprobar.apellido : null} />
                                    </Col>
                                </Row>
                                <Row className="my-1">
                                    <Col className="ml-auto mr-auto text-dark font-weight-bold" md="6">Descripción:</Col>
                                    <Col className="ml-auto mr-auto" md="6">
                                        <textarea class="form-control" id="txtDescripcionPersonaje" disabled={this.props.a} value={this.props.a ? this.state.casoAprobar.descripcion : null}></textarea >
                                    </Col>
                                </Row>
                                <Row className="my-1">
                                    <Col className="ml-auto mr-auto text-dark font-weight-bold" md="6">Rut:</Col>
                                    <Col className="ml-auto mr-auto" md="6">
                                        <Input id="txtRutPersonaje" disabled={this.props.a} value={this.props.a ? this.state.casoAprobar.rut : null} />
                                    </Col>
                                </Row>
                                <Row className="my-1">
                                    <Col className="ml-auto mr-auto text-dark font-weight-bold" md="6">Nacionalidad:</Col>
                                    <Col className="ml-auto mr-auto" md="6">
                                        <Input id="txtNacionalidadPersonaje" disabled={this.props.a} value={this.props.a ? this.state.casoAprobar.nacionalidad : null} />
                                    </Col>
                                </Row>
                                <Row className="my-1">
                                    <Col className="ml-auto mr-auto text-dark font-weight-bold" md="6">Cargo:</Col>
                                    <Col className="ml-auto mr-auto" md="6">
                                        {/* <select class="custom-select" id="selectCargoPersonaje" disabled={this.props.a} value={this.props.a ? this.state.casoAprobar.cargoId : null}>
                                            <option value="" >- Selecciona una opción -</option>
                                            {this.state.cargos.map((cargo) => {
                                                return (<option value={cargo.idCargo}>{cargo.titulo}</option>);
                                            })}
                                        </select> */}
                                        <Autocomplete
                                            multiple
                                            id="tags-outlined"
                                            options={this.state.cargos}
                                            getOptionLabel={(cargo) => cargo.titulo}
                                            disabled={this.props.a}
                                            value={this.props.a ? this.state.casoAprobar.arrCargo : []}
                                            // defaultValue={[top100Films[2]]}
                                            filterSelectedOptions
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                // label="filterSelectedOptions"
                                                // placeholder="Favorites"
                                                />
                                            )}
                                            onChange={(event, newValue) => {
                                                this.handleChangeValueAcCargo(event, newValue);
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="my-1">
                                    <Col className="ml-auto mr-auto text-dark font-weight-bold" md="6">Categorias:</Col>
                                    <Col className="ml-auto mr-auto" md="6">
                                        <Autocomplete
                                            multiple
                                            id="tags-outlined"
                                            options={this.state.categorias}
                                            getOptionLabel={(categoria) => categoria.titulo}
                                            disabled={this.props.a}
                                            value={this.props.a ? this.state.casoAprobar.arrCategoria : []}
                                            // defaultValue={[top100Films[2]]}
                                            filterSelectedOptions
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                // label="filterSelectedOptions"
                                                // placeholder="Favorites"
                                                />
                                            )}
                                            onChange={(event, newValue) => {
                                                this.handleChangeValueAcCategoria(event, newValue);
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="my-1">
                                    <Col className="ml-auto mr-auto text-dark font-weight-bold" md="6">Imágen:</Col>
                                    {/* <Col className="ml-auto mr-auto" md="6"><input type="file" /></Col> */}
                                    <Col className="ml-auto mr-auto" md="6">
                                        <Input id="txtImagenPersonaje" disabled={this.props.a} value={this.props.a ? this.state.casoAprobar.imagenUrl : null} />
                                    </Col>
                                </Row>
                                <Row className="my-1">
                                    <Col className="text-dark font-weight-bold" md="2">Evidencias:</Col>


                                </Row>

                                {
                                    (this.props.a ? this.state.casoAprobar.arrEvidencias : this.state.evidencias).map((evidencia, i) => {
                                        return (
                                            <Row className="border-bottom border-secondary rounded-lg" style={{ backgroundColor: Utils.isOdd(i) ? "" : "#66666624" }}>
                                                <Col md="10">
                                                    <Row className="my-3">
                                                        <Col className="font-weight-bold">Evidencia #{i + 1}
                                                        </Col>
                                                        <Col>
                                                        </Col>
                                                    </Row>
                                                    <Row className="my-3">
                                                        <Col>Título:</Col>
                                                        <Col>
                                                            <Input value={evidencia.titulo} name="titulo" disabled={this.props.a} onChange={(e) => { this.handleChangeInputEvidencia(e, evidencia); }} />
                                                        </Col>
                                                    </Row>
                                                    <Row className="my-3">
                                                        <Col>Descripción:</Col>
                                                        <Col>
                                                            <textarea className="form-control" value={evidencia.descripcion} name="descripcion" disabled={this.props.a} onChange={(e) => { this.handleChangeInputEvidencia(e, evidencia); }}></textarea>
                                                        </Col>
                                                    </Row>
                                                    <Row className="my-3">
                                                        <Col>Fecha:</Col>
                                                        <Col>
                                                            <Input type={this.props.a ? "text" : "date"} value={this.props.a ? new Date(evidencia.fecha).toLocaleDateString() : null} name="fecha" disabled={this.props.a} onChange={(e) => { this.handleChangeInputEvidencia(e, evidencia); }} />
                                                        </Col>
                                                    </Row>
                                                    <Row className="my-3">
                                                        <Col>Categoría evidencia:</Col>
                                                        <Col>
                                                            {/* <Input value={evidencia.titulo} name="titulo" onChange={(e) => { this.handleChangeInputEvidencia(e, evidencia); }} /> */}
                                                            <select value={evidencia.idCategoriaEvidencia} disabled={this.props.a} class="custom-select" name="idCategoriaEvidencia" id="selectCargoPersonaje" onChange={(e) => { this.handleChangeInputEvidencia(e, evidencia); }}>
                                                                <option value="" >- Selecciona una opción -</option>
                                                                {this.state.categoriasEvidencia.map((categoriaEvidencia) => {
                                                                    return (<option value={categoriaEvidencia.idCategoriaEvidencia}>{categoriaEvidencia.titulo}</option>);
                                                                })}
                                                            </select>
                                                        </Col>
                                                    </Row>
                                                    <Row className="my-3">
                                                        <Col>Links:</Col>
                                                        <Col>
                                                            <Input value={evidencia.url} name="url" disabled={this.props.a} onChange={(e) => { this.handleChangeInputEvidencia(e, evidencia); }} />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                {this.props.a ? <></> : <Col md="2" className="align-self-center" style={{ margin: "auto" }}>
                                                    <Button className="btn btn-danger btn-sm" onClick={() => { this.handleDeleteRow(evidencia); }}>Eliminar evidencia</Button>
                                                </Col>}
                                            </Row>
                                        );
                                    })
                                }
                                {
                                    this.props.a ? <></> : <Row>

                                        <Col md="10">
                                            <Col className="float-right" md="2" ><Button className="btn btn-sm" onClick={this.handleAddRow.bind(this)}>Agregar evidencia</Button></Col>
                                            {/* <Col className="float-right" md="2"><Button>-</Button></Col> */}
                                        </Col>
                                    </Row>
                                }
                                {
                                    this.props.a ? <></> :
                                        <Row className="my-5">
                                            <Col className="ml-auto mr-auto " md="6"><Button className="btn btn-lg btn-block" onClick={() => { this.validarFormulario(); }}>Guardar</Button></Col>
                                        </Row>
                                }
                                <Row>
                                    <Col className="ml-auto mr-auto" md="6"></Col>
                                    <Col className="ml-auto mr-auto" md="6"></Col>
                                </Row>
                            </Col>
                        </Row >
                    </Container>
                </TemplateNoLosOlvides >
            )
        }
    }
}