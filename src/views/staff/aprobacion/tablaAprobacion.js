import React from 'react'
import TemplateNoLosOlvides from "views/template/templateNoLosOlvides";
import { Table, Button } from 'reactstrap';
import Personaje from "model/personaje";
export default function TablaAprobacion() {
    const [personajesPendientes, setPersonajesPendientes] = React.useState([]);
    React.useEffect(() => {


        async function fetch() {
            var personajes = await Personaje.getPersonajesPendiente();
            setPersonajesPendientes(personajes);
        }
        fetch();
    });
    function DerivarAprobacion(personaje) {
        // alert(personaje);
        sessionStorage.setItem("xd", JSON.stringify(personaje));
        window.location.href = "/#/staff/aprobar-caso";
    }
    return (
        <TemplateNoLosOlvides>
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
