// import RegisterPage from "views/examples/RegisterPage.js";
import IngresarCaso from "views/ingresar-caso/ingresarCaso";
import Categorias from "views/categorias/categorias";
import Ranking from "views/ranking/ranking";
import BuscadorAvanzado from "views/buscador-avanzado/buscadorAvanzado";
const seccionesPagina = [
    {
        Title: "Buscador",
        Url: "/busqueda-avanzada",
        Icon: "nc-icon nc-layout-11",
        Component: BuscadorAvanzado
    },
    {
        Title: "Los más buscados",
        Url: "/los-mas-buscados",
        Icon: "",
        Component: Ranking
    },
    {
        Title: "Categorías",
        Url: "/categorias",
        Icon: "",
        Component: Categorias
    },
    {
        Title: "Ingresar",
        Url: "/ingresar",
        Icon: "",
        Component: IngresarCaso
    }
]

export default seccionesPagina;