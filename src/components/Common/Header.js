import React, {Component} from 'react';
import {AppBar, Typography, Toolbar} from '@material-ui/core';
import LoginButton from "../../containers/login/login_button"
import DrawerMenu from "../../containers/drawer";
import history from "../../history";

class Header extends Component{
    constructor(props){
        super(props);
    }
    
    selectStyle(){
        if(this.props.main)
            return {position: 'absolute', backgroundColor: 'transparent', boxShadow: '0 0 0 0', height: '100px'}
        else 
            return {position: 'static'}
    }


    render(){ 
        return(
            <AppBar style={this.selectStyle()}>
                <Toolbar>
                    <DrawerMenu />
                    <Typography variant="title" color="inherit" style={{flex: 1}}>
                        WITHUMB
                    </Typography>
                    <LoginButton/>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;
