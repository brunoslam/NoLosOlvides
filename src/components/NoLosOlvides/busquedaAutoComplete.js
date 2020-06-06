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
            autocompleteValue: { event: null, value: null }
        };
        this.derivarPerfil.bind(this);
        this.setAutocompleteValue.bind(this);
    }

    async componentWillMount() {
        var personajesArr = await Personaje.getPersonajes();
        this.setState({ personajes: personajesArr });
    }
    setAutocompleteValue(event, newValue) {
        this.setState({ autocompleteValue: { event: event, value: newValue } });
    }
    derivarPerfil(xd, asd) {
        var resultados = this.state.personajes.filter((p) => {
            return `${p.nombre} ${p.apellido}` == this.state.autocompleteValue.value
        });

        if (resultados.length > 0) {
            sessionStorage.setItem("asd", resultados[0].idPersonaje);
            window.location.href = "/personaje";
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
                            // onInputChange={(event, newInputValue) => {
                            //     this.derivarPerfil(event, newInputValue);
                            // }}
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
                        <Button onClick={(e) => { this.derivarPerfil(); }}>Buscar</Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}
