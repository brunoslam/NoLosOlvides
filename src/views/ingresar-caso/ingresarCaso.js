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
import Cargos from "model/cargos";
import Personaje from "model/personaje";
import { MentionsInput, Mention } from 'react-mentions'

import BusquedaAutoCompleteCategoria from "components/NoLosOlvides/busquedaAutoCompleteCategoria";
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
const columns = [
    { key: "id", name: "#", editable: false },
    { key: "titulo", name: "Título", editable: true },
    { key: "descripcion", name: "Descripción", editable: true },
    { key: "fecha", name: "Fecha", editable: true },
    { key: "link", name: "Link", editable: true },
    { key: "action", name: "Action" }
];

export default class ingresarCaso extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [
            ],
            categorias: [],
            cargos: [],
            casoAprobar: props.a ? JSON.parse(sessionStorage.getItem("xd")) : null,
            evidencias: [],
            contadorId: 0,
            mention: ""
        };
        this.onGridRowsUpdated.bind(this);
        this.getCellActions.bind(this);
        this.validarFormulario.bind(this);
        this.insertarPersonaje.bind(this);
        this.handleChangeInputEvidencia.bind(this);
        this.handleDeleteRow.bind(this);
        this.handleChangeMention.bind(this);
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
        var cargosJSON = await Cargos.getCargos();
        this.setState({ categorias: categoriasJSON, cargos: cargosJSON });
    }

    handleAddRow() {
        // var newData = this.state.rows;
        // var nuevoIndice = this.state.rows.length == 0 ? 1 : this.state.rows.slice(-1).pop().id + 1
        // newData.push(
        //     {
        //         id: nuevoIndice,
        //         titulo: null,
        //         descripcion: null,
        //         fecha: null,
        //         link: null,
        //     }
        // );
        // this.setState({ rows: newData });

        var asd = this.state.evidencias;
        var id = this.state.contadorId + 1;
        asd.push({
            id: id,
            titulo: null,
            descripcion: null,
            fecha: null,
            link: null,
        });

        this.setState({ evidencias: asd, contadorId: id });

    }

    handleChangeInputEvidencia(e, evidenciaChange) {
        var arr = this.state.evidencias;
        arr.map((evidencia) => {
            if (evidencia.id == evidenciaChange.id) {
                evidencia[e.target.name] = e.target.value;
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
    getCellActions = (column, row) => {
        const cellActions = [
            {
                // icon: <span className="glyphicon glyphicon-remove" />,
                icon: <CloseIcon />,
                callback: () => {
                    const rows = [...this.state.rows];
                    rows.splice(row.index, 1); //
                    this.setState({ rows: rows });
                }
            }
        ];
        return column.key === "action" ? cellActions : null;
    };
    handleChangeMention(event, newValue, newPlainTextValue, mentions) {
        this.setState({ mention: newValue });
    }

    async validarFormulario() {
        var flagFormValido = true;

        var nombre = (document.getElementById("txtNombrePersonaje")).value;
        var apellido = (document.getElementById("txtApellidoPersonaje")).value;
        var descripcion = (document.getElementById("txtDescripcionPersonaje")).value;
        var rut = (document.getElementById("txtRutPersonaje")).value;
        var nacionalidad = (document.getElementById("txtNacionalidadPersonaje")).value;
        var cargo = (document.getElementById("selectCargoPersonaje")).value;
        var imagenUrl = (document.getElementById("txtImagenPersonaje")).value;


        if (!nombre || !apellido || !cargo) {
            alert("Debes completar los campos obligatorios");
            flagFormValido = false;
        }

        if (this.state.evidencias.length == 0) {
            alert("Debes ingresar al menos una evidencia");
            flagFormValido = false;
        } else {
            this.state.evidencias.map((row) => {
                if (!row.titulo || !row.descripcion || !row.fecha || !row.link) {
                    alert("Debes compeltar todos los datos de la tabla");
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
                "idCargo": parseInt(cargo),
                "imagenUrl": imagenUrl,
                "idEstadoAprobacion": 1
            }
            this.insertarPersonaje(personaje);

        }


    }

    async insertarPersonaje(personaje) {

        try {
            var response = await (await fetch(`${process.env.NODE_ENV == "development" ? NoLosOlvidesInfo.urlApi : NoLosOlvidesInfo.urlApiProd}/api/Personajes`, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(personaje), // data can be `string` or {object}!
                // mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            }));
            var json = await response.json();


            if (json.message) {
                alert(json.message)
            } else {
                alert("Se ha guardado correctamente");
                window.location.reload();
            }
        } catch (error) {
            alert("Se ha producido un error al ingresar la información intenta más tarde");
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
    isOdd(num) {
        return num % 2;
    }

    render() {
        return (
            <TemplateNoLosOlvides>
                <Container>
                    <Row>
                        <Col className="ml-auto mr-auto" md="6">
                            <Row className="my-1">
                                <Col className="ml-auto mr-auto text-dark font-weight-bold" md="6">*Nombre:</Col>
                                <Col className="ml-auto mr-auto" md="6">
                                    <Input id="txtNombrePersonaje" disabled={this.props.a} value={this.props.a ? this.state.casoAprobar.nombre : null} />
                                    <MentionsInput value={this.state.mention} onChange={this.handleChangeMention.bind(this)}>
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
                                    </MentionsInput>
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
                                    <select class="custom-select" id="selectCargoPersonaje" disabled={this.props.a} value={this.props.a ? this.state.casoAprobar.cargoId : null}>
                                        {this.state.cargos.map((cargo) => {
                                            return (<option value={cargo.idCargo}>{cargo.titulo}</option>);
                                        })}
                                    </select>
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
                                this.state.evidencias.map((evidencia, i) => {
                                    return (
                                        <Row className="border-bottom border-secondary rounded-lg" style={{ backgroundColor: this.isOdd(i) ? "" : "#66666624" }}>
                                            <Col md="10">
                                                <Row className="my-3">
                                                    <Col className="font-weight-bold">Evidencia #{i + 1}
                                                    </Col>
                                                    <Col>
                                                    </Col>
                                                </Row>
                                                <Row className="my-3">
                                                    <Col>Título</Col>
                                                    <Col>
                                                        <Input value={evidencia.titulo} name="titulo" onChange={(e) => { this.handleChangeInputEvidencia(e, evidencia); }} />
                                                    </Col>
                                                </Row>
                                                <Row className="my-3">
                                                    <Col>Descripción</Col>
                                                    <Col>
                                                        <textarea className="form-control" value={evidencia.descripcion} name="descripcion" onChange={(e) => { this.handleChangeInputEvidencia(e, evidencia); }}></textarea>
                                                    </Col>
                                                </Row>
                                                <Row className="my-3">
                                                    <Col>Fecha</Col>
                                                    <Col>
                                                        <Input type="date" value={evidencia.fecha} name="fecha" onChange={(e) => { this.handleChangeInputEvidencia(e, evidencia); }} />
                                                    </Col>
                                                </Row>
                                                <Row className="my-3">
                                                    <Col>Link</Col>
                                                    <Col>
                                                        <Input value={evidencia.link} name="link" onChange={(e) => { this.handleChangeInputEvidencia(e, evidencia); }} />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col md="2" className="align-self-center" style={{ margin: "auto" }}>
                                                <Button className="btn btn-danger btn-sm" onClick={() => { this.handleDeleteRow(evidencia); }}>Eliminar evidencia</Button>
                                            </Col>
                                        </Row>
                                    );
                                })
                            }
                            <Row>

                                <Col md="10">
                                    <Col className="float-right" md="2" ><Button className="btn btn-sm" onClick={this.handleAddRow.bind(this)}>Agregar evidencia</Button></Col>
                                    {/* <Col className="float-right" md="2"><Button>-</Button></Col> */}
                                </Col>
                            </Row>

                            {/* <Row className="my-1">
                                <Col className="ml-auto mr-auto" md="12">
                                    <ReactDataGrid
                                        columns={columns}
                                        rowGetter={i => this.state.rows[i]}
                                        rowsCount={this.state.rows.length}
                                        onGridRowsUpdated={this.onGridRowsUpdated}
                                        enableCellSelect={true}
                                        getCellActions={this.getCellActions}
                                    />
                                </Col>
                            </Row> */}
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


// export default function IngresarCaso(props) {
//     // const classes = useStyles();


//     return (

//     )
// }
