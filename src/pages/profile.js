import React, {Component} from 'react';
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import {Divider, List, ListItem, Paper, ListItemText} from "@material-ui/core";
import {connect} from "react-redux";
import {fetchProfile, showLoading} from "../actions/index";

class Profile extends Component {

    componentDidMount() {
        this.props.showLoading();
        this.props.fetchProfile();
    }

    render() {
        if (this.props.profile.data) {
            return (
                <div className="div-fullpage">
                    <Header/>
                    <div className="container div-content-fullpage">

                        <div className="row align-items-center">
                            <div className="col"/>
                            <div className="col-8">
                                <h1>Your Personal Information</h1>
                                <p>Manage this basic information – your name, email and phone number – to help others
                                    find you on
                                    Google products like Hangouts, Gmail and Maps, and make it easier to get in
                                    touch. </p>
                                <Paper>
                                    <List>
                                        <ListItem button>
                                            <ListItemText primary="Username"
                                                          secondary={this.props.profile.data.username}/>
                                        </ListItem><Divider/>
                                        <ListItem button>
                                            <ListItemText primary="First Name"
                                                          secondary={this.props.profile.data.firstname}/>
                                        </ListItem><Divider/>
                                        <ListItem button>
                                            <ListItemText primary="Last Name"
                                                          secondary={this.props.profile.data.lastname}/>
                                        </ListItem><Divider/>
                                        <ListItem button>
                                            <ListItemText primary="Gender"
                                                          secondary={this.props.profile.data.gender}/>
                                        </ListItem><Divider/>
                                        <ListItem button>
                                            <ListItemText primary="Phone Number"
                                                          secondary={this.props.profile.data.phonenumber}/>
                                        </ListItem><Divider/>
                                        <ListItem button>
                                            <ListItemText primary="Birth Date"
                                                          secondary={new Date(this.props.profile.data.birthdate['$date']).toDateString()}/>
                                        </ListItem>
                                    </List>
                                </Paper>
                            </div>
                            <div className="col"/>
                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        } else {
            return (
                <div>
                    <Header/>
                    <Footer/>
                </div>
            )
        }
    }

}

function mapStateToProps(state) {
    console.log(state.user);
    return {profile: state.user};
}

export default connect(mapStateToProps, {fetchProfile, showLoading})(Profile);