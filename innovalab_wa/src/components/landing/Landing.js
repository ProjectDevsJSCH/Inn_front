import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import WelcomeText from '../welcomeText/WelcomeText';
import LoginForm from '../loginForm/LoginForm';
import RecoverPasswordEmail from '../recoverPasswordEmail/RecoverPasswordEmail'
import RecoverNewPassword from '../recoverNewPassword/RecoverNewPassword';

import Image from 'react-bootstrap/Image'
import logoInnovalab from '../../images/innovaLogo.png';
import logoCamara from '../../images/camaraLogo.png';

import './Landing.css';

const Landing = () => {
    return (
        <Router>
            <Container className="landing d-flex flex-column align-items-center" fluid>
                <Row id="landingFirstRow" className="d-flex justify-content-center align-items-center">
                    <Col md={5} xl={4} lg={4} sm={6} className="landingMain">
                        <div className="landingBorder">
                            <Switch>
                                <Route path="/" exact component={WelcomeText} />
                                <Route path="/login" component={LoginForm} />
                                <Route path="/recover-password/email" component={RecoverPasswordEmail} />
                                <Route path="/recover-password" component={RecoverNewPassword} />
                            </Switch>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={6} md={4} lg={3} className="imgLogoLanding">
                        <Image src={logoInnovalab} alt="logo innovalab" fluid />
                    </Col >
                    <Col xs={4} md={3} lg={2} className="imgLogoLanding d-flex">
                        <Image className="align-self-center" src={logoCamara} alt="logo camara de comercio de bogotá" fluid />
                    </Col>
                </Row>
            </Container>
        </Router>
    );
}

export default Landing;
