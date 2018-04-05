import React, {Component} from 'react';
import Header from "./Common/Header";
import Footer from "./Common/Footer";
import {Link} from "react-router-dom";
import background from '../css/background.jpg';

class Main extends Component {
    render() {
        const jumbo_css = {
            backgroundImage: 'url(' + background +' )',
            backgroundSize: 'cover'
        };
        const container_css = {
            paddingTop: 20 + '%'
        };
        return (
            <div>
                <Header main={true} />
                <div className="jumbotron" style={jumbo_css}>
                    <div className="container text-white" style={container_css}>
                        <h1 className="display-3">Want to learn?</h1>
                        <p>This is a place where you can show off your talent or learn new skills from other talented professionals</p>
                        <p><a className="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h2>Sports</h2>
                            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus
                                commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam
                                porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                            <p><Link className="btn btn-secondary" to="/">View details &raquo;</Link></p>
                        </div>
                        <div className="col-md-4">
                            <h2>Music</h2>
                            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus
                                commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam
                                porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                            <p><Link className="btn btn-secondary" to="/">View details &raquo;</Link></p>
                        </div>
                        <div className="col-md-4">
                            <h2>Cooking</h2>
                            <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                                Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus
                                commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
                            <p><Link className="btn btn-secondary" to="/">View details &raquo;</Link></p>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Main;

