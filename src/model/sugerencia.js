
import NoLosOlvidesInfo from "variables/NoLosOlvidesInfo";
export default class Sugerencia {

    static async ingresarSugerencia(SugerenciaJson) {
        var response = await (await fetch(`${process.env.NODE_ENV == "development" ? NoLosOlvidesInfo.urlApi : NoLosOlvidesInfo.urlApiProd}/api/Sugerencia`, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(SugerenciaJson), // data can be `string` or {object}!
            // mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }));
        var json = await response.json();


        if (json?.idSugerencia) {
            alert("Sugerencia agregada correctamente");
            window.location.reload();
        } else {

            alert(json.message)
            return false;
        }
    }
}