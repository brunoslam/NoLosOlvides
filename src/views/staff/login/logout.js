import React, { useState, useEffect } from 'react';
import TemplateNoLosOlvides from "views/template/templateNoLosOlvides";
export default function Logout() {
    const [contador, setContador] = React.useState(5);
    const [info, setInfo] = React.useState({ logout: false, contador: 6 });
    useEffect(() => {
        if (sessionStorage.getItem("loginState") != "true") {
            window.location.href = "/#/index";
        } else {

            const timer = window.setTimeout(() => {
                var c = info.contador - 1;
                if (c == 0) {
                    sessionStorage.setItem("loginState", "");

                    window.location.reload();
                } else {
                    setInfo({ logout: true, contador: c });
                }
            }, 1000);
            return () => {
                window.clearTimeout(timer);
            };
        }
    }, [info]);

    return (
        <TemplateNoLosOlvides>
            {
                info.logout ? <div>Serás redirigido en {info.contador}</div> : <></>
            }
        </TemplateNoLosOlvides>
    )
}
