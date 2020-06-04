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
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

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
      <ThemeProvider theme={theme}>
        <Box
          color="primary.main"
          bgcolor="background.paper"
          fontFamily="h6.fontFamily"
          fontSize={{ xs: 'h6.fontSize', sm: 'h4.fontSize', md: 'h3.fontSize' }}
          p={{ xs: 2, sm: 3, md: 4 }}
        >
          <ExamplesNavbar />
          {/* <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/login-image.jpg") + ")"
        }}
      > */}
          {/* <div className="main"> */}
          <GridContainer>
            <GridItem xs={12} sm={12} md={12} justify="space-around">
              {props.children}
            </GridItem>
          </GridContainer>
          {/* <div className="filter" /> */}
          <div className="footer register-footer text-center">
            <h6>
              © {new Date().getFullYear()}, made with{" "}
              <i className="fa fa-heart heart" /> by Creative Tim
              </h6>
          </div>
          {/* </div> */}
          {/* </div> */}
        </Box>
      </ThemeProvider>
    </>
  );
}

export default TemplateNoLosOlvides;
