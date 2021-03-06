import React from 'react'
import TemplateNoLosOlvides from "views/template/templateNoLosOlvides";
import { Table, Button } from 'reactstrap';
import Personaje from "model/personaje";
import SessionNoLosOlvides from "variables/sesiones";
export default function TablaAprobacionSugerencia() {
    const [personajesPendientes, setPersonajesPendientes] = React.useState([]);

    if (sessionStorage.getItem(SessionNoLosOlvides.loginState) != "true") {
        window.location.href = "/#/index";
    }

    React.useEffect(() => {


        async function fetch() {
            var personajes = await Personaje.getPersonajesPendiente();
            setPersonajesPendientes(personajes);
        }
        fetch();
    });
    function DerivarAprobacion(personaje) {
        // alert(personaje);
        sessionStorage.setItem(SessionNoLosOlvides.casoAprobar, JSON.stringify(personaje));
        window.location.href = "/#/staff/aprobar-caso";
    }
    return (
        sessionStorage.getItem(SessionNoLosOlvides.loginState) != "true" ? <></> :
        <TemplateNoLosOlvides>
            <h1>Aprobación sugerencia</h1>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {personajesPendientes.map((personaje, i) => {
                        return (
                            <tr>
                                <th scope="row">{i + 1}</th>
                                <td>{personaje.nombre}</td>
                                <td>{personaje.apellido}</td>
                                <td><Button onClick={() => { DerivarAprobacion(personaje); }}>Revisar</Button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </TemplateNoLosOlvides>
    )
}
