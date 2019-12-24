import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: localStorage.getItem('cks_token') !== null};
    }

    render() {


        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <button className="btn btn-outline-light"> <Link to="/">Home</Link></button>
                {!this.state.isLoggedIn ? <button className="btn btn-outline-light"> <Link to="/registration">Signup</Link></button>:
                                            <a className='text-black-50'></a>}
                {this.state.isLoggedIn ? <button className="btn btn-outline-light" onClick={this.handleLogout}> <Link to="/auth">Logout</Link></button>
                            :<button className="btn btn-outline-light" > <Link to="/auth">Signin</Link></button>}
            </nav>
        )
    }

    handleLogout = (event) => {

        localStorage.clear();
        this.setState({isLoggedIn: false});
    };
}

export default NavBar;