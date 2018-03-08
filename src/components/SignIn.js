import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
// import Header from "./Common/Header";
// import Footer from "./Common/Footer";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remember: false,
            username: '',
            password: '',
            status: true,
            authenticated: false,
            token: null

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange({target}) {
        this.setState({[target.name]: target.value})
    }

    handleSubmit(event) {
        let currentpage = this;
        axios({
            method: 'post',
            url: 'http://localhost:8080/webapi/signin',
            data: {
                username: this.state.username,
                password: this.state.password
            },
            mode: 'cors'
        }).then(function (response) {
            if (response.status === 200) {
                currentpage.setState({token: response.data, authenticated: true});

                //save the token in the localStorage of the user's browser
                localStorage.setItem('token', response.data);

                console.log("token : " + currentpage.state.token + "authenticated: " + currentpage.state.authenticated);
                console.log("storage token:" + localStorage.getItem('token'));

                currentpage.props.history.push({pathname: '/', state: {authenticated: true}});
            }
        });
        event.preventDefault();
    };

    render() {
        const loginStatus = this.state.status;
        return (
            <div>
                {/*<Header/>*/}
                <div className="container text-center">
                    <div className="border-bottom">
                        <h2>Log in</h2>
                    </div>
                    <div className="row align-items-center">
                        <div className="col"></div>
                        <div className="col text-left">
                            {loginStatus ? (<p/>) : (<p>login failed: wrong email or password</p>)}
                            <form onSubmit={this.handleSubmit}>
                                <input className="form-control" placeholder="Email" name="username" type="text"
                                       value={this.state.username}
                                       onChange={this.handleChange}/><br/>
                                <input className="form-control" placeholder="Password" name="password" type="text"
                                       value={this.state.password}
                                       onChange={this.handleChange}/><br/>
                                <input type="checkbox"/>remember me · <a href="">Forgot
                                password?</a><br/>
                                <button className="btn btn-block btn-primary" type="Submit">Log in</button>
                            </form>
                            <br/>
                        </div>
                        <div className="col"></div>
                    </div>
                    <div className="border-top">
                        <p>Don't have an account? <Link to="/signUp"><a>Sign up</a></Link></p>
                    </div>
                </div>
                {/*<Footer/>*/}
            </div>
        )
    }
}


export default Login;