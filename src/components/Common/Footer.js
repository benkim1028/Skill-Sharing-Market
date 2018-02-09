import React, {Component} from 'react';
import Jumbotron from "react-bootstrap/es/Jumbotron";
import Navbar from "react-bootstrap/es/Navbar";

export default class Footer extends Component{
    render() {
        return(
            <Navbar fixedBottom className='text-center'>
                <p>
                    copy right to Ben Kim;
                    2018
                </p>
            </Navbar>
        )
    }
}