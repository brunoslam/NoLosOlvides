// import React, { useState } from 'react';
import React, { Component } from 'react'
import TemplateNoLosOlvides from "views/template/templateNoLosOlvides";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import CloseIcon from '@material-ui/icons/Close';
import ReactDataGrid from 'react-data-grid';
import Categoria from "model/categoria";
import Cargos from "model/cargos";
import Personaje from "model/personaje";
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
    constructor() {
        super();
        this.state = {
            rows: [
            ],
            categorias: [],
            cargos: []
        };
        this.onGridRowsUpdated.bind(this);
        this.getCellActions.bind(this);
        this.validarFormulario.bind(this);
        this.insertarPersonaje.bind(this);
    }

    async componentWillMount() {
        var categoriasJSON = await Categoria.getCategorias();
        var cargosJSON = await Cargos.getCargos();
        this.setState({ categorias: categoriasJSON, cargos: cargosJSON });
    }

    handleAddRow() {
        // alert(this);
        debugger;
        var newData = this.state.rows;
        var nuevoIndice = this.state.rows.length == 0 ? 1 : this.state.rows.slice(-1).pop().id + 1
        newData.push(
            {
                id: nuevoIndice,
                titulo: null,
                descripcion: null,
                fecha: null,
                link: null,
            }
        );
        this.setState({ rows: newData });
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

    async validarFormulario() {
        var flagFormValido = true;

        var nombre = (document.getElementById("txtNombrePersonaje")).value;
        var apellido = (document.getElementById("txtApellidoPersonaje")).value;
        var descripcion = (document.getElementById("txtDescripcionPersonaje")).value;
        var rut = (document.getElementById("txtRutPersonaje")).value;
        var nacionalidad = (document.getElementById("txtNacionalidadPersonaje")).value;
        var cargo = (document.getElementById("selectCargoPersonaje")).value;
        var imagen = (document.getElementById("txtImagenPersonaje")).value;


        if (!nombre || !apellido || !cargo) {
            alert("Debes completar los campos obligatorios");
            flagFormValido = false;
        }

        if (this.state.rows.length == 0) {
            alert("Debes ingresar al menos una evidencia");
            flagFormValido = false;
        } else {
            this.state.rows.map((row) => {
                if (!row.titulo || !row.descripcion || !row.fecha || !row.link) {
                    alert("Debes compeltar todos los datos de la tabla");
                    flagFormValido = false;
                }
            });
        }

        if (flagFormValido) {
            this.insertarPersonaje();
        }


    }

    async insertarPersonaje() {
        alert(this);
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
        return (
            <TemplateNoLosOlvides>
                <Container>
                    <Row>
                        <Col className="ml-auto mr-auto" md="6">
                            <Row>
                                <Col className="ml-auto mr-auto" md="6">*Nombre:</Col>
                                <Col className="ml-auto mr-auto" md="6"><input id="txtNombrePersonaje" /></Col>
                            </Row>
                            <Row>
                                <Col className="ml-auto mr-auto" md="6">*Apellido:</Col>
                                <Col className="ml-auto mr-auto" md="6"><input id="txtApellidoPersonaje" /></Col>
                            </Row>
                            <Row>
                                <Col className="ml-auto mr-auto" md="6">Descripción:</Col>
                                <Col className="ml-auto mr-auto" md="6"><textarea id="txtDescripcionPersonaje"></textarea ></Col>
                            </Row>
                            <Row>
                                <Col className="ml-auto mr-auto" md="6">Rut:</Col>
                                <Col className="ml-auto mr-auto" md="6"><input id="txtRutPersonaje" /></Col>
                            </Row>
                            <Row>
                                <Col className="ml-auto mr-auto" md="6">Nacionalidad:</Col>
                                <Col className="ml-auto mr-auto" md="6"><input id="txtNacionalidadPersonaje" /></Col>
                            </Row>
                            <Row>
                                <Col className="ml-auto mr-auto" md="6">Cargo:</Col>
                                <Col className="ml-auto mr-auto" md="6"><select id="selectCargoPersonaje">
                                    {this.state.cargos.map((cargo) => {
                                        return (<option value={cargo.idCargo}>{cargo.titulo}</option>);
                                    })}
                                </select></Col>
                            </Row>
                            <Row>
                                <Col className="ml-auto mr-auto" md="6">Imágen:</Col>
                                {/* <Col className="ml-auto mr-auto" md="6"><input type="file" /></Col> */}
                                <Col className="ml-auto mr-auto" md="6"><input id="txtImagenPersonaje" /></Col>
                            </Row>
                            <Row>
                                <Row><Col className="" md="2">Evidencias:</Col></Row>
                                <Row>
                                    <Col className="" md="2"><button onClick={this.handleAddRow.bind(this)}>+</button></Col>
                                    <Col className="" md="2"><button>-</button></Col>
                                </Row>
                            </Row>
                            <Row>
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
                            </Row>
                            <Row>
                                <Col className="ml-auto mr-auto" md="6"><Button onClick={() => { this.validarFormulario(); }}>Guardar</Button></Col>
                            </Row>
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
