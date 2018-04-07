import React from 'react';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import {Divider, FontIcon, IconButton} from "material-ui";
import {fullWhite} from 'material-ui/styles/colors';

import history from '../history'
import {connect} from "react-redux";

class DrawerMenu extends React.Component {

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

    render() {
        return (
            <div>
                <IconButton onClick={this.handleToggle}>
                    <FontIcon className="material-icons" color={fullWhite}>menu</FontIcon>
                </IconButton>
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}
                >
                    <Subheader>Items</Subheader>
                    <MenuItem onClick={() => history.push("/buy&sell/sports")}>Sports</MenuItem>
                    <MenuItem onClick={() => history.push("/buy&sell/music")}>Music</MenuItem>
                    <MenuItem onClick={() => history.push("/buy&sell/cooking")}>Cooking</MenuItem>
                    <MenuItem onClick={() => history.push("/buy&sell/science")}>Science</MenuItem>
                    <MenuItem onClick={() => history.push("/buy&sell/art")}>Art</MenuItem>
                    <Divider />
                    <Subheader>Personal</Subheader>
                    {this.authenticatedMenu()}
                    <MenuItem onClick={this.handleClose}>Setting</MenuItem>
                </Drawer>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(DrawerMenu);
