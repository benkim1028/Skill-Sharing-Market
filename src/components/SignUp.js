import React, {Component} from 'react';
import "../css/component.css";
import axios from 'axios';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            f_name: '',
            color: ''

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange({target}) {
        this.setState({[target.name]: target.value})
    }

    handleSubmit(event) {
        var options = {
            method: 'POST',
            url: 'https://benkim1028.auth0.com/dbconnections/signup',
            headers: {'content-type': 'application/json'},
            data: {
                client_id: '_eNxrDi3ERRHYrQaHpcwuKO7T3QVdJOn',
                email: this.state.email,
                password: this.state.password,
                connection: "Username-Password-Authentication",
                user_metadata: {name: this.state.f_name, color: this.state.color}
            },
        };
        axios(options).then(function (response) {
            alert(response.toString());
        }).catch(function (error) {
            alert(error.toString());
        });
        event.preventDefault();
    };


    render() {
        return (
            <div className="text-center">
                <form id="signup" onSubmit={this.handleSubmit}>
                    <h2>Sign up</h2>
                    <p>
                        <input className="form-control" placeholder="Email" name="email" type="text"
                               value={this.state.email}
                               onChange={this.handleChange}/></p>
                    <p>
                        <input className="form-control" type="password" placeholder="Password" name="password"
                               value={this.state.password} onChange={this.handleChange} required/>
                    </p>
                    <p>
                        <input className="form-control" type="text" placeholder="Full name" name="f_name"
                               value={this.state.f_name} onChange={this.handleChange} required/>
                    </p>
                    <p>
                        <input className="form-control" type="text" placeholder="Favorite color" name="color"
                               value={this.state.color} onChange={this.handleChange}/>
                    </p>
                    <input className="btn btn-block btn-primary" type="submit" value="Sign up"/>
                </form>
            </div>
        )
    }
}

export default SignUp;




