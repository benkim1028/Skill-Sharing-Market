import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import LoginButton from "../../containers/login_button"
import DrawerMenu from "../drawer";
import history from "../../history";

class Header extends Component{
    constuctor(props){
        super(props);
    }
    
    selectStyle(){
        if(this.props.main)
            return {position: 'absolute', backgroundColor: 'transparent'}
        else 
            return {}
    }


    render(){ 
        return(
            <AppBar
                style={this.selectStyle()}
                title="WITHUMB"
                zDepth={0}
                onTitleClick={() => history.push('/')}
                iconElementRight={<LoginButton/>}
                iconElementLeft={<DrawerMenu />}
            />
        );
    }
}

export default Header;
