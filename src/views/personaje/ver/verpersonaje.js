
import React from "react";
import NoLosOlvidesInfo from "variables/NoLosOlvidesInfo";
import Personaje from "model/personaje";
// reactstrap components
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

// core components
import NavbarNoLosOlvides from "components/Navbars/NavbarNoLosOlvides.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function VerPersonaje() {
    const [activeTab, setActiveTab] = React.useState("1");
    const [idPersonajeBuscar, setIdPersonajeBuscar] = React.useState(parseInt(sessionStorage.getItem("personajeSeleccionadoHome")));
    const [personajeBuscar, setPersonajeBuscar] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);


    const toggle = tab => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        //acceder a perfil
        if (isLoading) {


            async function fetchData() {
                var personaje = await Personaje.getPersonajePorId(idPersonajeBuscar);
                debugger;

                setIsLoading(false);
                setPersonajeBuscar(personaje);

            }
            fetchData();

            document.body.classList.add("landing-page");
            return function cleanup() {
                document.body.classList.remove("landing-page");
            };
        }
    });
    if (isLoading) {
        return (<div>Cargando</div>);
    } else {
        if (personajeBuscar == null) {
            return (<div>No se ha podido encontrar al bastardo</div>);
        } else {
            return (
                <>
                    <NavbarNoLosOlvides />
                    <ProfilePageHeader />
                    <div className="section profile-content">
                        <Container>
                            <div className="owner">
                                <div className="avatar">
                                    <img
                                        alt="..."
                                        className="img-circle img-no-padding img-responsive"
                                        src={personajeBuscar.imagenUrl}
                                    />
                                </div>
                                <div className="name">
                                    <h4 className="title">
                                        {personajeBuscar.nombre} {personajeBuscar.apellido} <br />
                                    </h4>
                                    <h6 className="description">{personajeBuscar.arrRelacionCargo.map((relacionCargo) => {
                                        return (`${relacionCargo},`)
                                    })}</h6>
                                    <h6 className="description">{personajeBuscar.arrRelacionCategoria.map((relacionCategoria) => {
                                        return (`${relacionCategoria},`)
                                    })}</h6>
                                </div>
                            </div>
                            <Row>
                                <Col className="ml-auto mr-auto text-center" md="6">
                                    <p>{personajeBuscar.descripcion}</p>
                                    <br />
                                    <Button className="btn-round" color="default" outline>
                                        <i className="fa fa-cog" /> Settings
                      </Button>
                                </Col>
                            </Row>
                            <br />
                            <div className="nav-tabs-navigation">
                                <div className="nav-tabs-wrapper">
                                    <Nav role="tablist" tabs>
                                        <NavItem>
                                            <NavLink
                                                className={activeTab === "1" ? "active" : ""}
                                                onClick={() => {
                                                    toggle("1");
                                                }}
                                            >
                                                Follows
                          </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={activeTab === "2" ? "active" : ""}
                                                onClick={() => {
                                                    toggle("2");
                                                }}
                                            >
                                                Following
                          </NavLink>
                                        </NavItem>
                                    </Nav>
                                </div>
                            </div>
                            {/* Tab panes */}
                            <TabContent className="following" activeTab={activeTab}>
                                <TabPane tabId="1" id="follows">
                                    <Row>
                                        <Col className="ml-auto mr-auto" md="6">
                                            <ul className="list-unstyled follows">
                                                <li>
                                                    <Row>
                                                        <Col className="ml-auto mr-auto" lg="2" md="4" xs="4">
                                                            <img
                                                                alt="..."
                                                                className="img-circle img-no-padding img-responsive"
                                                                src={require("assets/img/faces/clem-onojeghuo-2.jpg")}
                                                            />
                                                        </Col>
                                                        <Col className="ml-auto mr-auto" lg="7" md="4" xs="4">
                                                            <h6>
                                                                Flume <br />
                                                                <small>Musical Producer</small>
                                                            </h6>
                                                        </Col>
                                                        <Col className="ml-auto mr-auto" lg="3" md="4" xs="4">
                                                            <FormGroup check>
                                                                <Label check>
                                                                    <Input
                                                                        defaultChecked
                                                                        defaultValue=""
                                                                        type="checkbox"
                                                                    />
                                                                    <span className="form-check-sign" />
                                                                </Label>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </li>
                                                <hr />
                                                <li>
                                                    <Row>
                                                        <Col className="mx-auto" lg="2" md="4" xs="4">
                                                            <img
                                                                alt="..."
                                                                className="img-circle img-no-padding img-responsive"
                                                                src={require("assets/img/faces/ayo-ogunseinde-2.jpg")}
                                                            />
                                                        </Col>
                                                        <Col lg="7" md="4" xs="4">
                                                            <h6>
                                                                Banks <br />
                                                                <small>Singer</small>
                                                            </h6>
                                                        </Col>
                                                        <Col lg="3" md="4" xs="4">
                                                            <FormGroup check>
                                                                <Label check>
                                                                    <Input defaultValue="" type="checkbox" />
                                                                    <span className="form-check-sign" />
                                                                </Label>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                </li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane className="text-center" tabId="2" id="following">
                                    <h3 className="text-muted">Not following anyone yet :(</h3>
                                    <Button className="btn-round" color="warning">
                                        Find artists
                      </Button>
                                </TabPane>
                            </TabContent>
                        </Container>
                    </div>
                    <DemoFooter />
                </>
            );
        }
    }


}

export default VerPersonaje;
