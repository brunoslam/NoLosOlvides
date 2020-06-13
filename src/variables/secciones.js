// import RegisterPage from "views/examples/RegisterPage.js";
import IngresarCaso from "views/ingresar-caso/ingresarCaso";
import Categorias from "views/categorias/categorias";
import Ranking from "views/ranking/ranking";
import BuscadorAvanzado from "views/buscador-avanzado/buscadorAvanzado";
import Login from "views/staff/login/login";
import Logout from "views/staff/login/logout";
import SessionNoLosOlvides from "variables/sesiones";
const seccionesLogin = [
    {
        Title: "Gestionar aprobaciones",
        Url: "#/staff/aprobacion",
        Icon: "nc-icon nc-paper",
        Component: IngresarCaso,
        Divider: false
    },
    {
        Divider: true
    },
    {
        Title: "Cerrar sesión",
        Url: "#/staff/logout",
        Icon: "nc-icon nc-paper",
        Component: IngresarCaso
    }
];
const seccionesPagina = [
    {
        Title: "Ingresar",
        Url: "/ingresar",
        Icon: "nc-icon nc-paper",
        Component: IngresarCaso
    },
    {
        Title: "Buscador",
        Url: "/busqueda-avanzada",
        Icon: "nc-icon nc-zoom-split nc-layout-11",
        Component: BuscadorAvanzado
    },
    {
        Title: "Los más buscados",
        Url: "/los-mas-buscados",
        Icon: "nc-icon nc-chart-bar-32",
        Component: Ranking
    },
    {
        Title: "Categorías",
        Url: "/categorias",
        Icon: "nc-icon nc-tag-content",
        Component: Categorias
    },
    {
        Title: sessionStorage.getItem(SessionNoLosOlvides.loginState) == "true" ? "Cerrar sesión" : "Iniciar sesión",
        Url: sessionStorage.getItem(SessionNoLosOlvides.loginState) == "true" ? "/staff/logout" : "/staff/login",
        Icon: sessionStorage.getItem(SessionNoLosOlvides.loginState) == "true" ? "nc-icon nc-lock-circle-open" : "nc-icon nc-key-25",
        Component: Login,
        notRegister: true,
        subMenu: sessionStorage.getItem(SessionNoLosOlvides.loginState) == "true" ? seccionesLogin : null
    }

]

export default seccionesPagina;