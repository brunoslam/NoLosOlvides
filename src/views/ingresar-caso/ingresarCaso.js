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
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import ReactDataGrid from 'react-data-grid';
import Categoria from "model/categoria";
import Cargos from "model/cargos";

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
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12} spacing={2} justify="space-around">
                        <p>*Nombre: <input /></p>
                        <p>*Apellido: <input /></p>
                        <p>Rut: <input /></p>
                        <p>Nacionalidad: <input /></p>
                        <p>Cargo: <select >
                            {this.state.cargos.map((cargo) => {
                                return (<option>{cargo.titulo}</option>);
                            })}
                        </select></p>
                        <p>Imágen: <input type="file" /></p>


                        <button onClick={this.handleAddRow.bind(this)}>+</button>
                        <button>-</button>

                        <GridItem xs={12} sm={12} md={8} spacing={2} justify="space-around">
                            <ReactDataGrid
                                columns={columns}
                                rowGetter={i => this.state.rows[i]}
                                rowsCount={this.state.rows.length}
                                onGridRowsUpdated={this.onGridRowsUpdated}
                                enableCellSelect={true}
                                getCellActions={this.getCellActions}
                            />
                        </GridItem>
                    </GridItem>
                </GridContainer>
            </TemplateNoLosOlvides >
        )
    }
}


// export default function IngresarCaso(props) {
//     // const classes = useStyles();


//     return (

//     )
// }
