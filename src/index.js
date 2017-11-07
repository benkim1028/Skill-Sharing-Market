import React from 'react';
import ReactDOM from 'react-dom';
import {Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import './css/index.css';


import Login from './components/Login'
import SignUp from './components/SignUp'


const Root = () => {
    return (
        <BrowserRouter>
            <div className="container">
                <Route exact path="/" component={Login}/>
                <Route path="/signUp" component={SignUp}/>
            </div>
        </BrowserRouter>
    )
};

ReactDOM.render(<Root />, document.getElementById('root'));
