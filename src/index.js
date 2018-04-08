import React from 'react';
import ReactDOM from 'react-dom';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from 'redux';
import {Router, Switch, Route} from 'react-router-dom';
import history from './history'

import {SIGN_IN_SUCCESSFUL} from './actions'

import 'bootstrap/dist/css/bootstrap.css';
import './style/css/index.css';

import reducers from './reducers';

import Main_page from './components/main_page'
import Secret from './components/Secret'
import Udemy from "./components/Udemy";
import BuyAndSellTabs from "./components/buyAndSellTabs"

import SignIn from './containers/pages/sign_in'
import SignUp from './containers/pages/sign_up'
import requireAuth from './containers/authentication/required_auth';
import noRequireAuth from './containers/authentication/no_require_auth';
import AlertBar from './containers/tools/alert_bar';
import Loading from './containers/tools/loading';
import PostsNewBuy from './containers/pages/posts_new_buy';
import PostsNewSell from './containers/pages/posts_new_sell';



import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import muiTheme from './style/mui_theme';
import Profile from "./containers/pages/profile";


const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const user = localStorage.getItem('user');

if (user) {
    store.dispatch({type: SIGN_IN_SUCCESSFUL})
}

ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <Provider store={store}>
            <Router history={history}>
                <div>
                    <Switch>
                        <Route path="/buy&sell/:category/posts/new_buy" component={PostsNewBuy}/>
                        <Route path="/buy&sell/:category/posts/new_sell" component={PostsNewSell}/>
                        <Route path="/buy&sell/:category/posts/:id" component={PostsNewBuy}/>
                        <Route path="/buy&sell/:category" component={BuyAndSellTabs}/>
                        <Route path="/udemy" component={Udemy}/>
                        <Route path="/secret" component={requireAuth(Secret)}/>
                        <Route path="/profile" component={requireAuth(Profile)}/>
                        <Route path="/signin" component={noRequireAuth(SignIn)}/>
                        <Route path="/signup" component={noRequireAuth(SignUp)}/>
                        <Route path="/" component={Main_page}/>
                    </Switch>
                    <AlertBar/>
                    <Loading/>
                </div>
            </Router>
        </Provider>
    </MuiThemeProvider>
    , document.querySelector('.container'));

