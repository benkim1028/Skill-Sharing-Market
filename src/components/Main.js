import React, {Component} from 'react';
import "../css/component.css";
import Header from "./Common/Header";
import Button from "react-bootstrap/es/Button";
import Jumbotron from "react-bootstrap/es/Jumbotron";
import Footer from "./Common/Footer";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false
        };
        this.button = this.button.bind(this);
    }

    button() {
        if (this.state.authenticated) {
            return (<Button bsStyle="primary" onClick={() => this.setState({authenticated: false})}>Logout</Button>)
        } else {
            return (<Button bsStyle="primary" onClick={() => this.props.history.push({pathname: '/signIn'})}>Login</Button>)
        }
    }

    componentDidMount() {
        if (this.props.location.state != null) {
            this.setState({authenticated: this.props.location.state.authenticated})
        }
        console.log("location : " + this.props.location);
    }

    render() {
        return (
            <div>
                <Header/>
                <Jumbotron className="container">
                    <h1>This is main page</h1>
                    {this.button()}
                </Jumbotron>
                <Footer/>
            </div>
        )
    }
}

export default Main;

