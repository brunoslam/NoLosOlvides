import NoLosOlvidesInfo from "variables/NoLosOlvidesInfo";

export default class Cargo {
    static ID = "";

    constructor() {

    }

    static async getCargos() {
        var response = await (await fetch(`${process.env.NODE_ENV == "development" ? NoLosOlvidesInfo.urlApi : NoLosOlvidesInfo.urlApiProd}/api/Cargos`));
        var json = await response.json();
        return json;
    }


    static async insertarCargo(cargoJson) {
        debugger;
        var response = await (await fetch(`${process.env.NODE_ENV == "development" ? NoLosOlvidesInfo.urlApi : NoLosOlvidesInfo.urlApiProd}/api/Cargos`, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(cargoJson), // data can be `string` or {object}!
            // mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }));
        var json = await response.json();


        if (json?.idCargo) {
            alert("Cargo agregado correctamente");
            window.location.reload();
        } else {

            alert(json.message)
            return false;
        }
    }
}