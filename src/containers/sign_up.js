import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import { signUp } from "../actions";

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    renderField(field) {
        const {meta: {touched, error}} = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-danger">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }


    handleSubmit(values) {
        console.log(values);
        this.props.signUp(values, () => {
            this.props.history.push('/signin');
        })
    }


    render() {
        const {handleSubmit} = this.props;
        return (
            <div>
                <Header/>
                <div className="container text-center">
                    <div className="border-bottom">
                        <h2>Sign up</h2>
                    </div>
                    <div className="row align-items-center">
                        <div className="col"></div>
                        <div className="col text-left">
                            <form onSubmit={handleSubmit(this.handleSubmit)}>
                                <Field className="form-control" label="Username" name="username" component={this.renderField}/><br/>
                                <Field className="form-control" label="Password" name="password" component={this.renderField}/><br/>
                                <button className="btn btn-primary" type="Submit">Sign Up</button>
                                <Link to="/" className="btn btn-danger">Cancel</Link>
                            </form>
                        </div>
                        <div className="col"></div>
                    </div>
                    <div className="border-top"/>
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


export default reduxForm({
    validate: validate,
    form: 'PostsNewForm'
})(
    connect(null, {signUp})(SignUp)
);




