import NoLosOlvidesInfo from "variables/NoLosOlvidesInfo";

export default class Cargo {
    static ID = "";

    constructor() {

    }

    static async getCargos() {
        var response = await (await fetch(`${NoLosOlvidesInfo.urlApi}/api/Cargos`));
        var json = await response.json();
        return json;
    }
}