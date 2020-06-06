/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch, HashRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import * as serviceWorker from './serviceWorker';
// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";
// pages
import Index from "views/Index.js";
import IndexDemo from "views/IndexDemo.js";
import NucleoIcons from "views/NucleoIcons.js";
import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import RegisterPage from "views/examples/RegisterPage.js";
// others
import Secciones from "variables/secciones";
import Login from "views/staff/login/login";
import VerPersonaje from "views/personaje/ver/verpersonaje";

const hist = createBrowserHistory();

ReactDOM.render(
  // <BrowserRouter>
  <Router history={hist}>
    <Switch>
      <Route path="/index" render={props => <Index {...props} />} />
      <Route path="/indexDemo" render={props => <IndexDemo {...props} />} />
      <Route
        path="/nucleo-icons"
        render={props => <NucleoIcons {...props} />}
      />
      <Route
        path="/landing-page"
        render={props => <LandingPage {...props} />}
      />
      <Route
        path="/profile-page"
        render={props => <ProfilePage {...props} />}
      />
      <Route
        path="/register-page"
        render={props => <RegisterPage {...props} />}
      />
      <Route
        path="/staff/login"
        render={props => <Login {...props} />}
      />
      <Route
        path="/personaje"
        render={props => <VerPersonaje {...props} />}
      />

      {
        Secciones.map((seccion) => {
          return (
            <Route
              path={seccion.Url}
              render={props => <seccion.Component {...props} />}
            />

          )

        })
      }


      <Redirect to="/index" />
    </Switch>
  </Router>,

  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();