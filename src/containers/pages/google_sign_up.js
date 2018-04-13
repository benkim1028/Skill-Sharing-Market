import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import Header from "../../components/Common/Header";
import Footer from "../../components/Common/Footer";
import {signUp, showLoading} from "../../actions/index";
import {DatePicker, Paper, RadioButton, RadioButtonGroup, RaisedButton, TextField} from "material-ui";
import normalizePhone from "../../components/Tools/normalizePhone";

class GoogleSignUp extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        values["username"] = this.props.location.state.username;
        values["firstname"] = this.props.location.state.firstname;
        values["lastname"] = this.props.location.state.lastname;
        console.log(values);
        this.props.showLoading();
        this.props.signUp(values, () => {
            this.props.history.push('/');
        }, "google")
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

    renderDatePicker(field) {
        const {meta: { touched, error }, input} = field;
        return(
            <DatePicker
                errorText={touched && error}
                {...input}
                value={input.value !== '' ? new Date(input.value) : null}
                floatingLabelText={field.label}
                onChange={(event, value) => {
                    console.log(value);
                    input.onChange(value)
                }}/>
        )
    }

    renderRadioGroup({input, ...rest}) {
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
            <div className="div-fullpage">
                <Header/>
                <div className="container text-center div-content-fullpage">
                        <h2 className="text">Sign up</h2>
                    <div className="row align-items-center">
                        <div className="col"/>
                        <div className="col text-center align-content-center">
                            <Paper>
                            <form onSubmit={handleSubmit(this.handleSubmit)}>
                                <TextField
                                      defaultValue={this.props.location.state.username}
                                      floatingLabelText="Username"
                                      floatingLabelFixed={true}
                                      disabled={true}
                                /><br/>
                                <TextField
                                      defaultValue={this.props.location.state.lastname}
                                      floatingLabelText="Last Name"
                                      floatingLabelFixed={true}
                                      disabled={true}
                                /><br/>
                                <TextField
                                      defaultValue={this.props.location.state.firstname}
                                      floatingLabelText="First Name"
                                      floatingLabelFixed={true}
                                      disabled={true}
                                /><br/>
                                <Field label="Create a password" name="password" type="password"
                                       component={this.renderField}/><br/>
                                <Field label="Confirm your password" name="password2" type="password"
                                       component={this.renderField}/><br/>
                                <Field label="Phone Number" name="phonenumber"
                                        component={this.renderField} normalize={normalizePhone}/><br/>
                                <Field label="Birth Date" name="birthdate" component={this.renderDatePicker} hintText="Birth Date" autoOk={true} /><br/>
                                <Field name="gender" component={this.renderRadioGroup}>
                                    <RadioButton value="male" label="male" style={{width: '50%', marginLeft: '25%', marginRight: '25%'}}/>
                                    <RadioButton value="female" label="female" style={{width: '50%', marginLeft: '25%', marginRight: '25%'}}/>
                                </Field><br/>
                                <RaisedButton type="submit" label="Sign Up" primary={true} style={{margin: 'auto'}}/>
                                <RaisedButton onClick={() => this.props.history.push('/')} label="Cancel"
                                              secondary={true} style={{margin: '15px'}}/>
                                {this.errorMessage()}
                            </form>
                            </Paper>
                        </div>
                        <div className="col"/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};

    // Validate the inputs from 'values'
    if (!values.password) {
        errors.password = "Enter a valid password!";
    }
    if (values.password !== values.password2) {
        errors.password2 = "Password is not equal!"
    }
    if (!values.phonenumber){
        errors.phonenumber = "Enter your phone number"
    }
    if (!values.gender) {
        errors.gender = "Select your gender"
    }
    if(!values.birthdate){
        errors.birthdate = "Select your birth date"
    }

    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid+
    return errors;
}

function mapStateToProps(state){
    return { error: state.signup.error }
}

export default reduxForm({
    validate: validate,
    form: 'GoogleSignUpForm'
})(
    connect(mapStateToProps, {signUp, showLoading})(GoogleSignUp)
);