import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';

import Header from "../../components/Common/Header";
import Footer from "../../components/Common/Footer";
import { signIn, showLoading } from "../../actions/index";
import {Paper, RaisedButton, TextField} from "material-ui";
import GoogleSignIn from "../components/google_login";

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    errorMessage(){
        if (this.props.error){
            return(
                <div className="text-danger">
                    <p className="errorText">{this.props.error}</p>
                </div>
            )
        }
    }

    renderField(field) {
        const {meta: {touched, error}} = field;
        // const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
                <TextField
                    hintText={field.label}
                    floatingLabelText={field.label}
                    errorText={touched && error}
                    type={field.type ? "password" : "text"}
                    {...field.input}
                />
        )
    }


    handleSubmit(values) {
        console.log(values);
        this.props.showLoading();
        this.props.signIn(values, () => {
            this.props.history.push('/');
        })

    };

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="div-fullpage">
                <Header/>
                <div className="container text-center div-content-fullpage">
                        <h2 className="text">Log in</h2>
                    <div className="row align-items-center">
                        <div className="col"/>
                        <div className="col text-center align-content-center">
                            <Paper className="paper-fullpage">
                            <form onSubmit={handleSubmit(this.handleSubmit)}>
                                <Field className="form-control" label="Username" name="username" component={this.renderField}/><br/>
                                <Field className="form-control" label="Password" name="password" type="password" component={this.renderField}/><br/>
                                <RaisedButton type="submit" label="Login" primary={true} style={{margin: '15px'}} />
                                <RaisedButton onClick={() => this.props.history.push('/')} label="Cancel" secondary={true} style={{margin: '15px'}} />
                                {this.errorMessage()}
                            </form>
                            </Paper>
                            <GoogleSignIn/>
                            <br/>
                        </div>
                        <div className="col"/>
                    </div>
                        <p className="text">Don't have an account? <Link to="/signUp">Sign up</Link></p>
                </div>
                <Footer/>
            </div>
        )
    }
}

function validate(values) {
    // console.log(values) -> {title:"asdf", categories: "asdf", content: "asdf"}
    const errors = {};

    // Validate the inputs from 'values'
    if (!values.username) {
        errors.username = "Enter a valid email!";
    }
    if (!values.password) {
        errors.password = "Enter a valid password!";
    }

    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid+
    return errors;
}

function mapStateToProps(state){
    return { error: state.auth.error }
}

export default reduxForm({
    validate: validate,
    form: 'SignInForm'
})(
    connect(mapStateToProps, {signIn, showLoading})(Login)
);