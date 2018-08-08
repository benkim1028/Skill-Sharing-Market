import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import {signIn, showLoading} from "../../actions/index";
import {Button} from "@material-ui/core";
import history from "../../history";
import {connect} from 'react-redux';

class FacebookSignIn extends Component {
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
                    <Button {...props}>Login With Facebook</Button>
                )}
            />
        )
    }
}

export default connect(null, {signIn, showLoading})(FacebookSignIn);
