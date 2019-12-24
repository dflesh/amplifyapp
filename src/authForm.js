import axios from "axios"
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  FormControl, FormGroup, Button} from 'react-bootstrap';
import NavBar from "./navBar";
import { Redirect } from "react-router-dom/";

class Auth extends React.Component {
    constructor(props){
        super(props);
        this.state = {email: '', password: '', token: '', redirect: false};
    }

    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
    };

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    };

    //устанавливаем перенаправление на главную страницу после авторизации
    setRedirect = () => {
        this.setState({
            redirect: true
        })
    };

    //редирект
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/'/>
        }
    };


    render() {
        return (
            <div>

                {this.renderRedirect()}

                <NavBar/>
            <form>
                <h1 style={{textAlign:'center', marginBottom:'20px'}}>Signin</h1>
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
                        style={{height:'40px', width: '50%' }}
                        value ={this.state.password}
                        onChange={this.handlePasswordChange}/>
                </FormGroup>
                <FormGroup>
                    <Button
                        className = "btn btn-dark" style={{width:'50%', height:'40px',marginBottom:'10px'}}
                        type="button" onClick={this.handleAuth}>Login
                    </Button>
                </FormGroup>
                </div>
            </form>
            </div>
        )
    }

    handleAuth = (event) => {
        localStorage.clear();
        const account = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };
            let res;
            let err;
            axios.post("https://todoslisttest.herokuapp.com/auth", account)
                .then(response => {res = response})
                .then(() => {
                    localStorage.setItem('cks_token', res.data.token);
                    localStorage.setItem('user_id', res.data.id);
                    this.setRedirect();
                })
                .catch(function (err) {
                    alert(err)
                });
    }
}

export default Auth;