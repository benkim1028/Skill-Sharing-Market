import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import {signUp} from "../actions";
import {Paper, RadioButton, RadioButtonGroup, RaisedButton, TextField} from "material-ui";

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        console.log(values);
        this.props.signUp(values, () => {
            this.props.history.push('/signin');
        })
    }

    renderField(field) {
        const {meta: {touched, error}} = field;

        return (
            <TextField
                hintText={field.label}
                floatingLabelText={field.label}
                errorText={touched && error}
                {...field.input}
            />
        )
    }

    renderRadioGroup({input, ...rest}) {
        console.log(rest)
        return (
            <div>
            <RadioButtonGroup
                {...input}
                {...rest}
                valueSelected={input.value}
                onChange={(event, value) => input.onChange(value)}
            />
                <p className='errorText'>{rest.meta.touched && rest.meta.error ? rest.meta.error : ''}</p>
            </div>
        )
    }

    render() {
        const {handleSubmit} = this.props;
        return (
            <div>
                <Header/>
                <div className="container text-center">
                    <div className="border-bottom">
                        <h2 className="text">Sign up</h2>
                    </div>
                    <div className="row align-items-center">
                        <div className="col"/>
                        <div className="col text-center align-content-center">
                            <Paper>
                            <form onSubmit={handleSubmit(this.handleSubmit)}>
                                <Field label="Firstname" name="firstname"
                                       component={this.renderField}/><br/>
                                <Field label="Lastname" name="lastname"
                                       component={this.renderField}/><br/>
                                <Field label="Choose your username" name="username"
                                       component={this.renderField}/><br/>
                                <Field label="Create a password" name="password"
                                       component={this.renderField}/><br/>
                                <Field label="Confirm your password" name="password2"
                                       component={this.renderField}/><br/>
                                <Field name="sex" component={this.renderRadioGroup}>
                                    <RadioButton value="male" label="male" style={{width: '50%', marginLeft: '25%', marginRight: '25%'}}/>
                                    <RadioButton value="female" label="female" style={{width: '50%', marginLeft: '25%', marginRight: '25%'}}/>
                                </Field><br/>
                                <RaisedButton type="submit" label="Sign Up" primary={true} style={{margin: 'auto'}}/>
                                <RaisedButton onClick={() => this.props.history.push('/')} label="Cancel"
                                              secondary={true} style={{margin: '15px'}}/>
                            </form>
                            </Paper>
                        </div>
                        <div className="col"/>
                    </div>
                    <div className="border-top"/>
                </div>
                <Footer/>
            </div>
        )
    }
}

function validate(values) {
    console.log(values);// -> {title:"asdf", categories: "asdf", content: "asdf"}
    const errors = {};

    // Validate the inputs from 'values'
    if (!values.firstname) {
        errors.firstname = "Enter your firstname";
    }
    if (!values.lastname) {
        errors.lastname = "Enter your lastname";
    }
    if (!values.username) {
        errors.username = "Enter a valid email!";
    } else if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)) {
        errors.username = 'Invalid email address'
    }
    if (!values.password) {
        errors.password = "Enter a valid password!";
    }
    if (values.password !== values.password2) {
        errors.password2 = "Password is not equal!"
    }
    if (!values.sex) {
        errors.sex = "Select your gender"
    }

    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid+
    return errors;
}


export default reduxForm({
    validate: validate,
    form: 'PostsNewForm'
})(
    connect(null, {signUp})(SignUp)
);
