import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
export default class busquedaAutoComplete extends Component {
    // static propTypes = {
    //     prop: PropTypes
    // }
    constructor() {
        super();

        this.state = {
            personajes: [],
            autocompleteValue: { event: null, value: null },
            autocompleteInputValue: null,
            busquedaNoEncontrada: false
        };
        this.derivarPerfil.bind(this);
        this.setAutocompleteValue.bind(this);
        this.setAutocompleteInputValue.bind(this);
    }

    async componentWillMount() {
        var personajesArr = await Personaje.getPersonajes();
        this.setState({ personajes: personajesArr });
    }
    setAutocompleteValue(event, newValue) {
        this.setState({ autocompleteValue: { event: event, value: newValue } });
    }
    setAutocompleteInputValue(event, newValue) {
        this.setState({ autocompleteInputValue: newValue });
    }
    derivarPerfil(xd, asd) {
        if ((!this.state.autocompleteValue.value && !this.state.autocompleteInputValue) || this.state.autocompleteValue.value == "") {
            alert("Debes ingresar un valor");
        } else {
            var resultados = this.state.personajes.filter((p) => {
                return `${p.nombre} ${p.apellido}` == this.state.autocompleteValue.value || `${p.nombre} ${p.apellido}` == this.state.autocompleteInputValue
            });

            if (resultados.length > 0) {
                this.setState({ busquedaNoEncontrada: false });
                sessionStorage.setItem("asd", resultados[0].idPersonaje);
                window.location.href = "/personaje";
            } else {
                this.setState({ busquedaNoEncontrada: true });
            }
        }
    }


    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            options={this.state.personajes.map((option) => `${option.nombre} ${option.apellido}`)}
                            renderInput={(params) => (
                                <TextField {...params} label="Ingresa un nombre" margin="normal" variant="outlined" />
                            )}
                            onInputChange={(event, newInputValue) => {
                                this.setAutocompleteInputValue(event, newInputValue);
                            }}
                            value={this.state.autocompleteValue.value}
                            onChange={(event, newValue) => {
                                this.setAutocompleteValue(event, newValue);
                            }}
                        // onClick={(e, x) => { this.derivarPerfil(e, x); }}

                        />
                    </Col>
                    {/* <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={this.state.personajes.map((option) => `${option.nombre} ${option.apellido}`)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search input"
                            margin="normal"
                            variant="outlined"
                            InputProps={{ ...params.InputProps, type: 'search' }}
                        // onClick={(e) => { this.derivarPerfil(e); }}
                        />
                    )}
                /> */}
                </Row>
                <Row>
                    <Col xs={{ size: 8, offset: 4 }} sm={{ size: 8, offset: 4 }} md={{ size: 8, offset: 4 }}>
                        <Button onClick={(e) => {
                            e.preventDefault();
                            this.derivarPerfil();
                        }}>Buscar</Button>
                    </Col>
                </Row>
                {
                    this.state.busquedaNoEncontrada ?
                        <Row>
                            <Col>
                                Búsqueda no arrojó resultados, prueba con las sugerencias o <a href="/#/ingresar" className="font-weight-bold">ingresa un caso</a>
                            </Col>
                        </Row> : <></>
                }

            </Container>
        )
    }
}
