import React from 'react';
import ReactDOM from 'react-dom';
import {Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import './css/index.css';


import Login from './components/Login'
import SignUp from './components/SignUp'
import Main from './components/Main'
import Test from './components/Test'


const Root = () => {
    return (
        <BrowserRouter>
            <div className="container">
                <Route exact path="/" component={Main}/>
                <Route path="/signUp" component={SignUp}/>
                <Route path="/signIn" component={Login}/>
                <Route path="/testing" component={Test}/>
            </div>
        </BrowserRouter>
    )
};

ReactDOM.render(<Root />, document.getElementById('root'));
