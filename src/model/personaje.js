import NoLosOlvidesInfo from "variables/NoLosOlvidesInfo";
export default class Personaje {
    static nombre;
    static apellido;
    static imagenUrl;
    static descripcion;
    static cargo;
    constructor() {

    }
    static async getPersonajes() {
        var response = await (await fetch(`${process.env.NODE_ENV == "development" ? NoLosOlvidesInfo.urlApi : NoLosOlvidesInfo.urlApiProd}/api/Personajes`));
        var json = await response.json();
        return json;
    }

    static async getPersonajePorId(idPersonajeBuscar) {
        var response = await (await fetch(`${process.env.NODE_ENV == "development" ? NoLosOlvidesInfo.urlApi : NoLosOlvidesInfo.urlApiProd}/api/Personajes/${idPersonajeBuscar}`));
        var json = await response.json();
        return json;
    }

    static async getPersonajesPendiente(idPersonajeBuscar) {
        var response = await (await fetch(`${process.env.NODE_ENV == "development" ? NoLosOlvidesInfo.urlApi : NoLosOlvidesInfo.urlApiProd}/api/Personajes`));
        var json = await response.json();
        return json;
    }
    static async getPersonajesTop(idPersonajeBuscar) {
        var response = await (await fetch(`${process.env.NODE_ENV == "development" ? NoLosOlvidesInfo.urlApi : NoLosOlvidesInfo.urlApiProd}/api/Personajes/top`));
        var json = await response.json();
        return json;
    }

    static async insertarPersonaje(personaje) {

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

    static async checkPersonajePorNombre(personaje) {
        try {
            var response = await (await fetch(`${process.env.NODE_ENV == "development" ? NoLosOlvidesInfo.urlApi : NoLosOlvidesInfo.urlApiProd}/api/Personajes/BuscarPorNombre`, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(personaje), // data can be `string` or {object}!
                // mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            }));
            var json = await response.json();
            if (json.message) {
                alert(json.message);
                return false;
            } else {
                return true;
            }
        } catch (error) {
            alert("Se ha producido un error al ingresar la información intenta más tarde");
            return false;
        }
    }


}