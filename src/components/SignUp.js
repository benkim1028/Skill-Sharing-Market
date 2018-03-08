import React, {Component} from 'react';
import axios from 'axios';
import Header from "./Common/Header";
import Footer from "./Common/Footer";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            name: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange({target}) {
        this.setState({[target.name]: target.value})
    }

    handleSubmit(event) {
        let currentpage = this;
        var options = {
            method: 'post',
            url: 'http://localhost:8080/webapi/signup',
            data: {
                username: this.state.username,
                password: this.state.password,
                name: this.state.name,
            },
        };
        axios(options).then(function (response) {
            alert("Successfully created a user. Login with the created credential");
            if (response.status === 200) {
                currentpage.props.history.push({pathname: '/signIn'});
            }
        });
        event.preventDefault();
    };


    render() {
        return (
            <div>
                <Header/>
                <div className="container text-center">
                    <div className="border-bottom">
                        <h2>Sign up</h2>
                    </div>
                    <div className="row align-items-center">
                        <div className="col"></div>
                        <div className="col text-left">
                            <br/>
                            <form id="signup" onSubmit={this.handleSubmit}>
                                <p>
                                    <input className="form-control" placeholder="Username" name="username" type="text"
                                           value={this.state.username}
                                           onChange={this.handleChange}/></p>
                                <p>
                                    <input className="form-control" type="password" placeholder="Password"
                                           name="password"
                                           value={this.state.password} onChange={this.handleChange} required/>
                                </p>
                                <p>
                                    <input className="form-control" type="text" placeholder="Full name" name="name"
                                           value={this.state.f_name} onChange={this.handleChange} required/>
                                </p>
                                <input className="btn btn-block btn-primary" type="submit" value="Sign up"/>
                            </form>
                            <br/>
                        </div>
                        <div className="col"></div>
                    </div>
                    <div className="border-top"/>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default SignUp;




