import NoLosOlvidesInfo from "variables/NoLosOlvidesInfo";
export default class Personaje {
    static nombre;
    static apellido;
    static imagenUrl;
    static descripcion;
    static cargo;
    constructor() {

    }


    static async getPersonajePorId(idPersonajeBuscar) {
        var response = await (await fetch(`${process.env.NODE_ENV == "development" ? NoLosOlvidesInfo.urlApi : NoLosOlvidesInfo.urlApiProd}/api/Personajes/${idPersonajeBuscar}`));
        var json = await response.json();
        return json;
    }
}