import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {signOut} from "../actions";
import history from "../history";

class loginButton extends Component {
    constructor(props){
        super(props);

        this.onClickSignOut = this.onClickSignOut.bind(this);
    }

    onClickSignOut(){
        this.props.signOut( () => {
            history.push('/');
        })
    }

    loginOrLogout() {
        if (this.props.authenticated) {
            return (
                <button className="btn btn-outline-success my-2 my-sm-0"
                        onClick={() => this.onClickSignOut()}>SignOut</button>
            )
        } else {
            return (
                <Link className="btn btn-outline-success my-2 my-sm-0" to='/signin'>SignIn</Link>
            )

        }
    }

    render() {
        return (
            <div>
                {this.loginOrLogout()}
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {authenticated: state.auth.authenticated};
}

export default connect(mapStateToProps, {signOut})(loginButton);