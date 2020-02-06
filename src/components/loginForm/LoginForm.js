import React from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import "./LoginForm.css"

class LoginForm extends React.Component {

   constructor() {
      super();
      this.state = {
         isLogged: this.getToken(),
         email: "",
         password: "",
         validated: false,
         isLoading: false
      };
   }

   toastConfiguration = {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      closeButton: false,
      containerId: 'A'
   }

   /**
    * Cambiar estado de la entrada mientras se ingresa un valor
    * @return {VoidFunction}
    */
   handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
   }

   /**
    * Guardar el token en localStorage
    */
   saveToken(token) {
      localStorage.setItem('auth-token', token);
   }


   /**
    * obtener el token desde localStorage
    */
   getToken(token) {
      return localStorage.getItem('auth-token') ? true : false;
   }

   /**
    * Enviar credenciales para autenticación
    * @return {VoidFunction}
    */
   handleSubmit = e => {
      e.preventDefault();

      this.deactivateButton(true);

      const credentials = {
         user_email: this.state.email,
         user_password: this.state.password,
      };
      const url = `${process.env.REACT_APP_BACK_URL}/login`;

      axios.post(url, credentials)
         .then(res => {
            this.saveToken(res.headers['x-auth-token']);
            this.setState({ isLogged: true });
         })
         .catch(error => {
            if (!error.response) {
               this.notify("Algo salió mal.");
               return;
            }

            const res = error.response;
            let msg = "";
            if (res.status === 429) {
               msg = `${res.data.msj}.`;
               msg += `Intente ingresar de nuevo en ${this.getIntegerPart(res.data.minutes)} minutos.`
            }
            else if (res.status === 400) {
               msg = res.data;
            } else {
               msg = "Error inesperado, intente más tarde."
            }
            this.notify(msg);
            this.deactivateButton(false);
         })
   }

   /**
    * Habilita o desabilita el botón dependiendo del argumento.
    * Si bool es true el boton se desactiva.
    * Si bool es false el boton se activa.
    * @param {Boolean} bool
    * @returns {VoidFunction}
    */
   deactivateButton = (bool) => {
      this.setState({ isLoading: bool })
   }

   notify = (error) => toast.error(error,
      {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         closeButton: false
      }
   );

   getIntegerPart(decimal) {
      return Math.ceil(decimal)
   }

   render() {
      let { isLoading, isLogged } = this.state;

      if (isLogged) {
         return <Redirect to="/home" />
      }

      return (
         <Row className="d-flex justify-content-center">
            {
               isLogged && <Redirect to="/home" />
            }
            <Col xs={11}>
               <div className="d-flex justify-content-center">
                  <h6 className="mt-5 d-inline-block loginFormTittle"> Iniciar Sesión </h6>
               </div>
               <Form validated={this.state.validated} onSubmit={this.handleSubmit} className="d-flex flex-column align-items-center mt-4">
                  <Form.Group controlId="email" className="w-100">
                     <Form.Control className="formInput"
                        name="email"
                        type="email"
                        placeholder="Correo electrónico"
                        values={this.state.email}
                        onChange={this.handleChange}
                        required
                     />
                  </Form.Group>
                  <Form.Group controlId="password" className="w-100 mt-3">
                     <Form.Control className="formInput"
                        name="password"
                        type="password"
                        placeholder="Contraseña"
                        values={this.state.password}
                        onChange={this.handleChange}
                        maxLength={8}
                        required
                     />
                  </Form.Group>
                  <Button id="btnLoginForm"
                     className="btnDefaultRounded mt-5"
                     variant="warning"
                     type="submit"
                     disabled={isLoading}
                  >
                     {isLoading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
                  </Button>
               </Form>
               <div className="d-flex justify-content-center mt-3 mb-5">
                  <Link to="/recover-password/email" id="loginFormLinkForgetPassword" className="text-white">Olvidé mi contraseña</Link>
               </div>
            </Col>
         </Row>
      );
   }
}

export default withRouter(LoginForm);