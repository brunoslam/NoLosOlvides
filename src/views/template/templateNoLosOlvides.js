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
import styled, { ThemeProvider } from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import { palette, spacing, typography } from '@material-ui/system';

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";

// const theme = createMuiTheme();
const theme = {
  spacing: 4,
  palette: {
    primary: '#007bff',
  },
};
const Box = styled.div`${palette}${spacing}${typography}`;

function TemplateNoLosOlvides(props) {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });
  return (
    <>
      {/* <ThemeProvider theme={theme}>
        <Box
          color="primary.main"
          bgcolor="background.paper"
          fontFamily="h6.fontFamily"
          fontSize={{ xs: 'h6.fontSize', sm: 'h4.fontSize', md: 'h3.fontSize' }}
          p={{ xs: 2, sm: 3, md: 4 }}
        > */}

      {/* <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")"
        }}
      > */}
      {/* <div className="main"> */}
      <Container id="containerPage">
        <Row>
          <Col xs={12} sm={12} md={12} justify="space-around">
            <ExamplesNavbar />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} justify="space-around">
            {props.children}
          </Col>
        </Row>
      </Container>
      {/* <Container>
        <Row>
          <Col xs={12} sm={12} md={12} justify="space-around">

          </Col>
        </Row>
      </Container> */}
      <footer class="footer">
        <div class="container">
          <span class="text-muted" style={{float: "right"}}>© {new Date().getFullYear()}, No Los Olvides. <small>Sitio en construcción</small>
            {/* <h6>
                    © {new Date().getFullYear()}, made with{" "}
                    <i className="fa fa-heart heart" /> by Creative Tim
                    </h6> */}</span>
        </div>
      </footer>

      {/* <footer className="page-footer footer register-footer font-small blue pt-4">

            <div className="container-fluid text-center text-md-left">

              

            </div>
            <div className="footer-copyright text-center py-3">© 2020 Copyright:
            <a href="https://mdbootstrap.com/"> MDBootstrap.com</a>
            </div>

          </footer> */}
      {/* </Box>
      </ThemeProvider> */}
    </>
  );
}

export default TemplateNoLosOlvides;
