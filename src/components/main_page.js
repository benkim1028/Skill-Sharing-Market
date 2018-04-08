import React, {Component} from 'react';
import Header from "./Common/Header";
import Footer from "./Common/Footer";
import background from '../style/imgs/background.jpg';
import soccer from '../style/imgs/Soccer.jpg';
import music from '../style/imgs/Music.jpg';
import {RaisedButton} from "material-ui";

const styles = {
    main_css : {
        backgroundImage: 'url(' + background + ' )',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',

    },
    soccer_css : {
        backgroundImage: 'url(' + soccer + ' )',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    music_css : {
        backgroundImage: 'url(' + music + ' )',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
};

class Main_page extends Component {
    render() {
        return (
            <div>
                <Header main={true} />
                <div className="fullpage content" style={styles.main_css}>
                    <div className="textbox-left text-white">
                        <h1 className="main-header">Wisdom + Thumb</h1>
                        <p>The quality of having experience, knowledge, and good judgment (Wisdom) of yours is superb (Thumb). It is time to share them with others.</p>
                    </div>
                </div>
                <div className="fullpage content" style={styles.soccer_css}>
                    <div className="textbox-right text-white">
                        <h1 className="main-header">Sports</h1>
                        <p>People around you have excellent talents in Sports: Soccer, Basketball, Badminton, Table Tennis, Tennis, Baseball, Hockey, etc. Do you want to learn them? We will find professionals for you.</p>
                        <RaisedButton onClick={() => this.props.history.push("buy&sell/sports")}  primary={true} label="See Professionals"/>
                    </div>
                </div>
                <div className="fullpage content" style={styles.music_css}>
                    <div className="textbox-left text-white">
                        <h1 className="main-header">Music</h1>
                        <p>Are you a talented music professional? Do you want to teach young students in you spare times? Withumb will make your life easier. Check out our list of young students who are passion of learning new musical instrument.</p>
                        <RaisedButton onClick={() => this.props.history.push("buy&sell/music")}  primary={true} label="See Students"/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Main_page;

