import React, {Component} from 'react';
import Header from "./Common/Header";
import Footer from "./Common/Footer";

export default class Secret extends Component {
    render(){
        return(

            <div>
                <Header/>
                <p>This page is secret page</p>
                <Footer/>
            </div>
        )
    }
}