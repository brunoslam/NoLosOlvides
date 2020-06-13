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
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import NoLosOlvidesInfo from "variables/NoLosOlvidesInfo";
import Secciones from "variables/secciones";
function NavbarNoLosOlvides() {
  const [navbarColor, setNavbarColor] = React.useState("");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        // setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <Navbar
      className={classnames("fixed-top", navbarColor)}
      color-on-scroll="300"
      expand="lg"
    >
      <Container>
        <div className="navbar-translate">
          {/* <img style={{ width: "100%" }} src={require("assets/img/nolosolvides/logonolosolvides.png")} /> */}
          <NavbarBrand
            data-placement="bottom"
            to="/index"
            // target="_blank"
            title="No Los Olvides"
            tag={Link}
          >
            {NoLosOlvidesInfo.title}
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-center"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            {
              Secciones.map((seccion) => (
                (!seccion.subMenu ?
                  // if (!seccion.subMenu) {
                  // return (
                  <NavItem>
                    <NavLink to={seccion.Url} tag={Link}>
                      <i className={seccion.Icon} /> {seccion.Title}
                    </NavLink>
                  </NavItem>
                  // )
                  :
                  // } else {
                  // return (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>Sesión</DropdownToggle>
                    <DropdownMenu right>
                      {seccion.subMenu.map(subMenu => (
                        subMenu.Divider ? <DropdownItem divider /> :
                          <DropdownItem tag="a" href={subMenu.Url}>
                            {subMenu.Title}
                          </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  // );
                  // }
                )
              ))
            }
            {/* <NavItem>
              <NavLink to="/indexDemo" tag={Link}>
                <i className="nc-icon nc-layout-11" /> Components
              </NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://twitter.com/NoLosOlvides"
                target="_blank"
                title="Síguenos en Twitter"
              >
                <i className="fa fa-twitter" />
                <p className="d-lg-none">Twitter</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://www.facebook.com/No-Los-Olvides-101381898282342"
                target="_blank"
                title="Síguenos en Facebook"
              >
                <i className="fa fa-facebook-square" />
                <p className="d-lg-none">Facebook</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://www.instagram.com/nolosolvides.cl"
                target="_blank"
                title="Síguenos en Instagram"
              >
                <i className="fa fa-instagram" />
                <p className="d-lg-none">Instagram</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="mailto:nolosolvides.cl@gmail.com"
                target="_blank"
                title="Comúnicate vía email"
              >
                <i className="fa fa-envelope" />
                <p className="d-lg-none">Email</p>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarNoLosOlvides;
