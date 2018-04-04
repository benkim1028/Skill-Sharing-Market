import React from 'react';
import ReactDOM from 'react-dom';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from 'redux';
import {Router, Switch, Route} from 'react-router-dom';
import {SIGN_IN_SUCCESSFUL} from './actions'
import 'bootstrap/dist/css/bootstrap.css';
import './css/index.css';

import reducers from './reducers';
import SignIn from './containers/sign_in'
import SignUp from './containers/sign_up'
import Main from './components/Main'
import Secret from './components/Secret'
import requireAuth from './containers/required_auth';
import noRequireAuth from './containers/no_require_auth';
import AlertBar from './containers/alert_bar';
import history from './history'
import Udemy from "./components/Udemy";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Profile from "./containers/profile";


const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const user = localStorage.getItem('user');

if (user) {
    store.dispatch({type: SIGN_IN_SUCCESSFUL})
}

ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
            <Router history={history}>
                <div>
                    <Switch>
                        <Route path="/udemy" component={Udemy}/>
                        <Route path="/secret" component={requireAuth(Secret)}/>
                        <Route path="/profile" component={Profile}/>
                        <Route path="/signin" component={noRequireAuth(SignIn)}/>
                        <Route path="/signup" component={noRequireAuth(SignUp)}/>
                        <Route path="/" component={Main}/>
                    </Switch>
                    <AlertBar/>
                </div>
            </Router>
        </Provider>
    </MuiThemeProvider>
    , document.querySelector('.container'));

