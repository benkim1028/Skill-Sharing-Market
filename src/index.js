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

import Main_page from './pages/main_page'
import Transaction_tabs from "./pages/transaction_tabs"

import SignIn from './pages/sign_in'
import SignUp from './pages/sign_up'
import GoogleSignUp from './pages/google_sign_up'
import requireAuth from './containers/authentication/required_auth';
import noRequireAuth from './containers/authentication/no_require_auth';
import AlertBar from './containers/tools/alert_bar';
import Loading from './containers/tools/loading';
import PostsNewBuy from './pages/posts_new_buy';
import PostsNewSell from './pages/posts_new_sell';
import ItemDetail from './pages/item_detail';



import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import Profile from "./pages/profile";


const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const user = localStorage.getItem('user');

if (user) {
    store.dispatch({type: SIGN_IN_SUCCESSFUL})
}

const theme = createMuiTheme();

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <Router history={history}>
                <div>
                    <Switch>
                        <Route path="/buy&sell/:category/posts/new_buy" component={requireAuth(PostsNewBuy)}/>
                        <Route path="/buy&sell/:category/posts/new_sell" component={requireAuth(PostsNewSell)}/>
                        <Route path="/buy&sell/:category/posts/:id" component={ItemDetail}/>
                        <Route path="/buy&sell/:category" render={(props) => (<Transaction_tabs key={props.match.params.category} {...props}/>)}/>
                        <Route path="/signup/google" component={GoogleSignUp}/>   
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

