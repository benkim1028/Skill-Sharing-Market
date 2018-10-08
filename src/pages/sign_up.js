import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import {signUp, showLoading} from "../actions/index";
import { Paper, FormControlLabel, Radio, RadioGroup, Button, TextField,InputAdornment} from "@material-ui/core";
import normalize_phone from "../components/tools/normalize_phone";

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        console.log(values);
        this.props.showLoading();
        this.props.signUp(values, () => {
            this.props.history.push('/signin');
        })
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
                style={{textAlign: 'left'}}
                id={field.label}
                label={field.label}
                type={field.type ? "password" : "text"}
                error={touched && error}
                multiline={field.multiLines}
                rows={field.multiLines ? 5 : 1}
                helperText={touched && error}
                fullWidth
                InputProps={{
                    startAdornment: <InputAdornment position="start"> </InputAdornment>,
                }}
                {...field.input}
            />
        )
    }

    renderDatePicker(field) {
        const {meta: { touched, error }, input} = field;
        return(
            <TextField
                {...input}
                type="date"
                error={touched && error}
                label={field.label}
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}/>

        )
    }

    renderRadioGroup({input, ...rest}) {
        return (
            <div>
            <RadioGroup
                {...input}
                {...rest}
                value={input.value}
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
                                <Field label="Choose your username" name="username"
                                       component={this.renderField}/><br/>
                                <Field label="Create a password" name="password" type="password"
                                       component={this.renderField}/><br/>
                                <Field label="Confirm your password" name="password2" type="password"
                                       component={this.renderField}/><br/>
                                <Field label="First name" name="firstname"
                                       component={this.renderField}/><br/>
                                <Field label="Last name" name="lastname"
                                       component={this.renderField}/><br/>
                                <Field label="Phone Number" name="phonenumber"
                                        component={this.renderField} normalize={normalize_phone}/><br/>
                                <Field label="Birth Date" name="birthdate" component={this.renderDatePicker} hintText="Birth Date" autoOk={true} /><br/>
                                <Field name="gender" component={this.renderRadioGroup}>
                                    <FormControlLabel value="male" label="male" control={<Radio/>} style={{width: '50%', marginLeft: '25%', marginRight: '25%'}}/>
                                    <FormControlLabel value="female" label="female" control={<Radio/>} style={{width: '50%', marginLeft: '25%', marginRight: '25%'}}/>
                                </Field><br/>
                                <Button type="submit" variant="raised" color="primary" style={{margin: '15px'}}>Sign Up</Button>
                                <Button variant="raised" onClick={() => this.props.history.push('/')} color="secondary" style={{margin: '15px'}}>Cancel</Button>
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
    form: 'SignUpForm'
})(
    connect(mapStateToProps, {signUp, showLoading})(SignUp)
);
