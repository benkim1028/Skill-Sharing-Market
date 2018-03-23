import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {Divider, FontIcon, IconButton} from "material-ui";
import {fullWhite} from 'material-ui/styles/colors';
import history from '../history'

export default class DrawerMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

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
                    <MenuItem onClick={this.handleClose}>Sports</MenuItem>
                    <MenuItem onClick={this.handleClose}>Music</MenuItem>
                    <MenuItem onClick={this.handleClose}>Cooking</MenuItem>
                    <MenuItem onClick={this.handleClose}>Science</MenuItem>
                    <MenuItem onClick={this.handleClose}>Arts</MenuItem>
                    <Divider />
                    <MenuItem onClick={() => history.push("/profile")}>Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>Setting</MenuItem>
                </Drawer>
            </div>
        );
    }
}