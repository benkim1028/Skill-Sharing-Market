import React, {Component} from 'react';
import "../css/component.css";
import axios from 'axios';

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
            return (<button onClick={() => this.setState({authenticated: false})}>Logout</button>)
        } else {
            return (<button onClick={() => this.props.history.push({pathname: '/signIn'})}>Login</button>)
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
                <h1>This is main page</h1>
                {this.button()}
                <p>not working</p>
            </div>
        )
    }
}

export default Main;

