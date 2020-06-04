import NoLosOlvidesInfo from "variables/NoLosOlvidesInfo";

export default class Categoria {
    static ID = "";

    constructor() {

    }

    static async getCategorias() {
        var response = await (await fetch(`${process.env.NODE_ENV == "development" ? NoLosOlvidesInfo.urlApi : NoLosOlvidesInfo.urlApiProd}/api/Categorias`));
        var json = await response.json();
        return json;
    }
}