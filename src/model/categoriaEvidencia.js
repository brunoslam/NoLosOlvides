import NoLosOlvidesInfo from "variables/NoLosOlvidesInfo";
export default class CategoriaEvidencia{

    static async getCategoriasEvidencia() {
        var response = await (await fetch(`${process.env.NODE_ENV == "development" ? NoLosOlvidesInfo.urlApi : NoLosOlvidesInfo.urlApiProd}/api/CategoriaEvidencia`));
        var json = await response.json();
        return json;
    }
}