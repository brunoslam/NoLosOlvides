import NoLosOlvidesInfo from "variables/NoLosOlvidesInfo";
export default class CategoriaEvidencia{

    static async getCategoriasEvidencia() {
        var response = await (await fetch(`${process.env.NODE_ENV == "development" ? NoLosOlvidesInfo.urlApi : NoLosOlvidesInfo.urlApiProd}/api/CategoriaEvidencia`));
        var json = await response.json();
        return json;
    }
    static async insertarCategoriaEvidencia(categoriaEvidenciaJson) {
        debugger;
        var response = await (await fetch(`${process.env.NODE_ENV == "development" ? NoLosOlvidesInfo.urlApi : NoLosOlvidesInfo.urlApiProd}/api/CategoriaEvidencia`, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(categoriaEvidenciaJson), // data can be `string` or {object}!
            // mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }));
        var json = await response.json();


        if (json?.idCategoriaEvidencia) {
            alert("Categoría evidencia agregada correctamente");
            window.location.reload();
        } else {

            alert(json.message)
            return false;
        }
    }
}