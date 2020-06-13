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

// reactstrap components

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import NavbarNoLosOlvides from "components/Navbars/NavbarNoLosOlvides.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

// index sections
import SectionButtons from "views/index-sections/SectionButtons.js";
import SectionNavbars from "views/index-sections/SectionNavbars.js";
import SectionNavigation from "views/index-sections/SectionNavigation.js";
import SectionProgress from "views/index-sections/SectionProgress.js";
import SectionNotifications from "views/index-sections/SectionNotifications.js";
import SectionTypography from "views/index-sections/SectionTypography.js";
import SectionJavaScript from "views/index-sections/SectionJavaScript.js";
import SectionCarousel from "views/index-sections/SectionCarousel.js";
import SectionNucleoIcons from "views/index-sections/SectionNucleoIcons.js";
import SectionDark from "views/index-sections/SectionDark.js";
import SectionLogin from "views/index-sections/SectionLogin.js";
import SectionExamples from "views/index-sections/SectionExamples.js";
import SectionDownload from "views/index-sections/SectionDownload.js";
//
import BusquedaAutoComplete from "../components/NoLosOlvides/BusquedaAutoComplete/busquedaAutoComplete";
import TemplateNoLosOlvides from "views/template/templateNoLosOlvides";
import {
    Button,
    Label,
    FormGroup,
    Input,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Container,
    Row,
    Col
} from "reactstrap";

function Index() {
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("index");
        return function cleanup() {
            document.body.classList.remove("index");
        };
    });
    return (
        <>
            <TemplateNoLosOlvides>
                <Container>
                    <Row>
                        <Col className="ml-auto mr-auto" md="6">
                            <p class="text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin diam eros, rutrum eu libero in, dictum tincidunt odio. Suspendisse ornare, nibh faucibus molestie auctor, quam augue eleifend mauris, sed aliquam metus metus in tortor. Donec vel varius dui, ac pharetra urna. Proin dictum at tortor in tincidunt. Phasellus feugiat scelerisque imperdiet. Morbi finibus cursus nisi, id lacinia enim praesent vitae.</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3"></Col>
                        <Col md="4">
                            <img style={{ width: "100%" }} src={require("assets/img/nolosolvides/logonolosolvides.png")} />
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row>
                        <Col className="ml-auto mr-auto" md="6">
                            <BusquedaAutoComplete />
                        </Col>
                    </Row>
                </Container>


                {/* <NavbarNoLosOlvides />
                <div className="main">
                    
                <SectionButtons />
                <SectionNavbars />
                <SectionNavigation />
                <SectionProgress />
                <SectionNotifications />
                <SectionTypography />
                <SectionJavaScript />
                <SectionCarousel />
                <SectionNucleoIcons />
                <SectionDark />
                <SectionLogin />
                <SectionExamples />
                <SectionDownload />
                <DemoFooter />
                </div> */}
            </TemplateNoLosOlvides>
        </>
    );
}

export default Index;
