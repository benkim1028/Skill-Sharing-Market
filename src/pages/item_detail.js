import React, {Component} from 'react';
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import {Divider, List, ListItem, Paper} from "@material-ui/core";
import {connect} from "react-redux";
import {fetchProfile, showLoading} from "../actions/index";

class ItemDetail extends Component {

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
                                <h1>Item Detail</h1>
                                <Paper>
                                    <List>
                                        <ListItem primaryText="Category"
                                                  secondaryText={this.props.profile.data.username}/><Divider/>
                                        <ListItem primaryText="First Name"
                                                  secondaryText={this.props.profile.data.firstname}/><Divider/>
                                        <ListItem primaryText="Last Name"
                                                  secondaryText={this.props.profile.data.lastname}/><Divider/>
                                        <ListItem primaryText="Gender"
                                                  secondaryText={this.props.profile.data.gender}/><Divider/>
                                        <ListItem primaryText="Phone Number"
                                                  secondaryText={this.props.profile.data.phonenumber}/><Divider/>
                                        <ListItem primaryText="Birth Date"
                                                  secondaryText={new Date(this.props.profile.data.birthdate['$date']).toDateString()}/>
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

export default connect(mapStateToProps, {fetchProfile, showLoading})(ItemDetail);