import React from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import {RaisedButton} from "material-ui";
import history from "../history";

class FacebookSignIn extends React.Component {
    constructor(props){
        super(props);
        this.responseFacebook = this.responseFacebook.bind(this);
    }

    responseFacebook(response){
        console.log(response);
        var value = {
            username: null,
            password: null,
            idp: "facebook",
            idToken: response.tokenId
        };
        this.props.signIn(value, () => history.push('/'));
        this.props.showLoading();

    }

    render(){
        return(
            <FacebookLogin
                appId="479228355825921"
                autoLoad={true}
                fields="name,email,picture"
                callback={this.responseFacebook}
                icon="fa-facebook"
                render={props => (
                    <RaisedButton {...props}>Login With Facebook</RaisedButton>
                )}
            />
        )
    }
}

export default connect(null, {signIn, showLoading})(GoogleSignIn);
