import React from 'react';
import { GoogleLogin } from 'react-google-login';
import {showLoading, signIn} from "../actions/index";
import {connect} from "react-redux";
import history from "../history";



class GoogleSignIn extends React.Component {
    constructor(props){
        super(props);
        this.responseGoogle = this.responseGoogle.bind(this);
    }

    responseGoogle(response){
        console.log(response);
        var value = {
            username: null,
            password: null,
            idp: "google",
            idToken: response.tokenId
        };
        this.props.signIn(value, () => history.push('/'));
        this.props.showLoading();

    }
    render(){
        return(
            <GoogleLogin
                clientId="850459285748-p1q00q4nifbg302s0m3ulu91pfkgbjmd.apps.googleusercontent.com"
                buttonText="Login With Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                scope="https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.phonenumbers.read"
            />
        )
    }
}

export default connect(null, {signIn, showLoading})(GoogleSignIn);
