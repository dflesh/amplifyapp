
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Button, FormControl, FormGroup} from "react-bootstrap";
import NavBar from "./navBar";
import axios from "axios";
import { Redirect } from "react-router-dom/";
import {FormErrors} from "./FormErrors";

class AccountCreate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            redirect: false,
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false
        };
    }

    //устанавливаем перенаправление на главную страницу после авторизации
    setRedirect = () => {
        this.setState({
            redirect: true
        })
    };

    //редирект
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/auth'/>
        }
    };

    handleEmailChange = (event) => {
        this.setState(
            {email: event.target.value},
            () => { this.validateFields('email', this.state.email)});
    };

    handlePasswordChange = (event) => {
        this.setState(
            {password: event.target.value},
            () => {this.validateFields('password', this.state.password)});
    };

    validateFields(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '': ' is too short';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    };

    validateForm = () => {
        this.setState({formValid: this.state.emailValid &&
                this.state.passwordValid});
    };

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <NavBar/>
                    <form className="well" >
                        <h1 style={{textAlign:'center', marginBottom:'20px'}}>Signup</h1>
                        <div className='container' align='center'>
                        <FormGroup>
                            <FormControl
                                type="email"
                                placeholder="Email"
                                style={{height:'40px', width:'50%'}}
                                value={this.state.email}
                                onChange={this.handleEmailChange}/>
                        </FormGroup>
                        <FormGroup>
                            <FormControl
                                type="password"
                                placeholder="Password"
                                style={{height:'40px', width:'50%'}}
                                value ={this.state.password}
                                onChange={this.handlePasswordChange}/>
                        </FormGroup>
                            <div className='text-danger'>
                                <FormErrors formErrors={this.state.formErrors} />
                            </div>
                        <FormGroup>
                            <Button
                                className = "btn btn-dark"
                                style={{width:'50%', height:'40px',marginBottom:'10px'}}
                                type="button"
                                onClick={this.handleAccountCreate}
                                onSuccess={this.renderRedirect}
                                disabled={!this.state.formValid}>
                                Signup
                            </Button>
                        </FormGroup>
                        </div>
                    </form>
                </div>
        )
    }

    handleAccountCreate = (event) => {

        const account = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };
            let res;
            let err;
            axios.post("https://todoslisttest.herokuapp.com/registration", account)
                .then(response => {res = response})
                .then(() => {
                    this.setState({email: '', password: '', redirect: true});
                })
                .catch(function (err) {
                    alert(err)
                });
        }

}

export default AccountCreate;