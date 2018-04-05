import React from 'react';
import { GoogleLogin } from 'react-google-login';



class GoogleSignIn extends React.Component {
    responseGoogle(response){
        console.log("responseGoogle");
        console.log(response);
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

export default GoogleSignIn;
