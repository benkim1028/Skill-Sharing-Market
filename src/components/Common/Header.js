import React from 'react';
import AppBar from 'material-ui/AppBar';
import LoginButton from "../../containers/login_button"
import DrawerMenu from "../drawer";
import history from "../../history";

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
const Header = () => (
    <AppBar
        style={{position: 'absolute', backgroundColor: 'transparent'}}
        title="WITHUMB"
        zDepth={0}
        onTitleClick={() => history.push('/')}
        iconElementRight={<LoginButton/>}
        iconElementLeft={<DrawerMenu />}
    />
);

export default Header;
