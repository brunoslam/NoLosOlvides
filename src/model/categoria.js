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
    static async insertarCategoria(categoriaJson) {
        debugger;
        var response = await (await fetch(`${process.env.NODE_ENV == "development" ? NoLosOlvidesInfo.urlApi : NoLosOlvidesInfo.urlApiProd}/api/Categorias`, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(categoriaJson), // data can be `string` or {object}!
            // mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }));
        var json = await response.json();


        if (json?.idCategoria) {
            alert("Categoría agregada correctamente");
            window.location.reload();
        } else {

            alert(json.message)
            return false;
        }
    }
}
