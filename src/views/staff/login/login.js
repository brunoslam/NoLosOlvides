import React from 'react';
import TemplateNoLosOlvides from "views/template/templateNoLosOlvides";
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";
import NoLosOlvidesInfo from "variables/NoLosOlvidesInfo";
import SessionNoLosOlvides from "variables/sesiones";
export default function Login() {
    const [loginState, setLoginState] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);

    // if (sessionStorage.getItem(SessionNoLosOlvides.loginState) == "true") {
    //     window.location.href = "/#/staff/aprobacion";
    // }

    React.useEffect(() => {
        if (sessionStorage.getItem(SessionNoLosOlvides.loginState) == "true") {
            window.location.href = "/#/staff/aprobacion";
        } else {
            setIsLoading(false);
        }
    });
    async function IniciarSesion() {
        // var asd = sha256("Password00");

        // var response = await(await fetch(`${process.env.NODE_ENV == "development" ? NoLosOlvidesInfo.urlApi : NoLosOlvidesInfo.urlApiProd}/api/Staff`));
        var userName = document.getElementById("txtUsuario").value;
        var passWord = document.getElementById("txtContrasena").value;
        if (!userName || !passWord) {
            alert("Debes completar todos los campos");
            return;
        }
        try {
            var data = { username: userName, password: passWord };
            var response = await (await fetch(`${process.env.NODE_ENV == "development" ? NoLosOlvidesInfo.urlApi : NoLosOlvidesInfo.urlApiProd}/api/Staff/authenticate`, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                // mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            }));
            var json = await response.json();

            if (json.message) {
                alert("Usuario o contraseña incorrecta");
            } else {
                alert("Iniciaste sesión correctamente");
                sessionStorage.setItem(SessionNoLosOlvides.loginState, "true");
                window.location.reload();
            }


        } catch (error) {
            alert("Error al iniciar sesión, intenta más tarde");
        }

    }

    async function sha256(message) {
        // encode as UTF-8
        const msgBuffer = new TextEncoder('utf-8').encode(message);

        // hash the message
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

        // convert ArrayBuffer to Array
        const hashArray = Array.from(new Uint8Array(hashBuffer));

        // convert bytes to hex string                  
        const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
        return hashHex;
    }

    return (
        <TemplateNoLosOlvides>
            {
                isLoading ? <></> :
                    <Container>
                        <Row>
                            <Col className="ml-auto mr-auto" lg="4">
                                <Card className="card-register ml-auto mr-auto">
                                    <h3 className="title mx-auto">Inicia Sesión</h3>
                                    {/* <div className="social-line text-center">
                                <Button
                                    className="btn-neutral btn-just-icon mr-1"
                                    color="facebook"
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                >
                                    <i className="fa fa-facebook-square" />
                                </Button>
                                <Button
                                    className="btn-neutral btn-just-icon mr-1"
                                    color="google"
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                >
                                    <i className="fa fa-google-plus" />
                                </Button>
                                <Button
                                    className="btn-neutral btn-just-icon"
                                    color="twitter"
                                    href="#pablo"
                                    onClick={e => e.preventDefault()}
                                >
                                    <i className="fa fa-twitter" />
                                </Button>
                            </div> */}
                                    <Form className="register-form">
                                        <label>Usuario</label>
                                        <Input placeholder="Email" type="text" id="txtUsuario" />
                                        <label>Contraseña</label>
                                        <Input placeholder="Contraseña" type="password" id="txtContrasena" />
                                        <Button block className="btn-round" color="danger" onClick={e => { e.preventDefault(); IniciarSesion(); }}>
                                            Iniciar Sesión
                                </Button>
                                    </Form>
                                    <div className="forgot">
                                        <Button
                                            className="btn-link"
                                            color="danger"
                                            href="#pablo"
                                            onClick={e => e.preventDefault()}
                                            disabled={true}
                                        >
                                            ¿Olvidaste tu contraseña?
                                </Button>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
            }
        </TemplateNoLosOlvides>
    )
}
