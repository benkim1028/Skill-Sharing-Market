import React, {Component} from 'react';

import {Divider, Icon, IconButton, MenuItem, Drawer} from "@material-ui/core";

import history from '../history'
import {connect} from "react-redux";

class DrawerMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

    authenticatedMenu() {
        if (this.props.authenticated) {
            return (
                <MenuItem onClick={() => history.push("/profile")}>Profile</MenuItem>
            )
        }
    }

    renderMenuBars() {
        return (
            <IconButton onClick={this.handleToggle}>
                <Icon style={{color: "#ffffff"}}>menu</Icon>
            </IconButton>
        )
    }

    renderDrawers() {
        return (
            <Drawer
                open={this.state.open}
                onClose={() => this.setState({open: false})}
            >
                <div style={{width: '200px'}}>
                    <MenuItem style={{textAlign: "center", color: "white", backgroundColor: "#3f51b5"}}
                              onClick={() => history.push("/")}>WITHUMB</MenuItem>
                    <MenuItem onClick={() => history.push("/buy&sell/sports")}>Sports</MenuItem>
                    <MenuItem onClick={() => history.push("/buy&sell/music")}>Music</MenuItem>
                    <MenuItem onClick={() => history.push("/buy&sell/cooking")}>Cooking</MenuItem>
                    <MenuItem onClick={() => history.push("/buy&sell/science")}>Science</MenuItem>
                    <MenuItem onClick={() => history.push("/buy&sell/art")}>Art</MenuItem>
                </div>
                <Divider/>
                {this.authenticatedMenu()}
                <MenuItem onClick={this.handleClose}>Setting</MenuItem>
            </Drawer>
        )
    }

    render() {
        return (
            <div>
                {this.renderMenuBars()}
                {this.renderDrawers()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {authenticated: state.auth.authenticated};
}

export default connect(mapStateToProps)(DrawerMenu);
