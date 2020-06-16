import React, { useState } from 'react';

import TemplateNoLosOlvides from "views/template/templateNoLosOlvides";

import { Button, Label, FormGroup, Input, NavItem, NavLink, Nav, TabContent, TabPane, Container, Row, Col } from "reactstrap";
import IngresarCaso from "views/ingresar-caso/ingresarCaso";
import SugerirCaso from "views/ingresar-caso/sugerirCaso";
import classnames from 'classnames';
export default function IndexTab() {

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    return (
        <TemplateNoLosOlvides>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >Sugerir Caso</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        Ingresar Caso
          </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <SugerirCaso/>
                </TabPane>
                <TabPane tabId="2">
                    <IngresarCaso/>
                </TabPane>
            </TabContent>
        </TemplateNoLosOlvides>
    )
}
