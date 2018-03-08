import React from 'react';
import ReactDOM from 'react-dom';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter, Router, Switch, Route} from 'react-router-dom';
import { SIGN_IN_SUCCESSFUL } from './actions'
import 'bootstrap/dist/css/bootstrap.css';

import reducers from './reducers';
import SignIn from './containers/sign_in'
import SignUp from './containers/sign_up'
import Main from './components/Main'
import Secret from './components/Secret'
import requireAuth from './containers/required_auth';
import noRequireAuth from './containers/no_require_auth';
import history from './history'
import Udemy from "./components/Udemy";


const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const user = localStorage.getItem('user');

if(user) {
    store.dispatch({ type: SIGN_IN_SUCCESSFUL})
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Switch>
                    <Route path="/udemy" component={Udemy} />
                    <Route path="/secret" component={requireAuth(Secret)}/>
                    <Route path="/signin" component={noRequireAuth(SignIn)}/>
                    <Route path="/signup" component={noRequireAuth(SignUp)}/>
                    <Route path="/" component={Main}/>
                </Switch>
            </div>
        </Router>
    </Provider>
    , document.querySelector('.container'));

