import axios from 'axios';
import jwt from 'jsonwebtoken';

export const SIGN_IN_SUCCESSFUL = 'sign_in_successful';
export const SIGN_IN_FAILED = 'sign_in_failed';
export const SIGN_OUT = 'sign_out';

export const SIGN_UP_SUCCESSFUL = 'sign_up_successful';
export const SIGN_UP_FAILED = 'sign_up_failed';
export const FETCH_PROFILE = 'fetched_profile';

export const CREATE_ALERT_BAR = 'create_alert_bar';

/*
    request: {username: benkim1028, password: Tkflzls1!}
    response: {token: asdfasdfasdfasdfasdfasdf}
 */
const BASE_URL = "https://skillbackend.herokuapp.com/webapi"; //"http://localhost:8080/webapi";


export function signIn(values, callback) {
    const request = axios({
        method: 'post',
        url: `${BASE_URL}/signin`,
        data: values,
        mode: 'cors'
    });

    return (dispatch) => {
        request.then(
            ({data}) => {
                localStorage.setItem("user", data.token);
                dispatch({type: SIGN_IN_SUCCESSFUL, payload: data});
                let token = jwt.decode(data.token);
                console.log(token);
                console.log(new Date(token.exp));
                callback();
            }).catch(
            () => dispatch({type: SIGN_IN_FAILED, payload: "Wrong Username or Password"}
            )
        );
    }
}

export function signOut(callback) {
    localStorage.clear();
    callback();
    return {
        type: SIGN_OUT
    }
}

export function createAlertBar(message) {
    return {
        type: CREATE_ALERT_BAR,
        payload: message
    }
}

export function signUp(values, callback) {

    const request = axios({
        method: 'post',
        url: `${BASE_URL}/signup`,
        data: values,
        mode: 'cors'
    });
    return (dispatch) => {
        request.then(
            ({}) => {
                dispatch({type: SIGN_UP_SUCCESSFUL});
                callback();
            }).catch(
            () => dispatch({type: SIGN_UP_FAILED, payload: "Wrong Username or Password"}
            )
        );
    }
}


//jwt.decode = {jti: "benkim1028@gmail.com", iat: 1521181033, sub: "123456789", iss: "Ben Kim", exp: 1521181033}
export function fetchProfile(){
    const token = localStorage.getItem("user");
    // we do not need to check if token exists, required_auth will check if this user is authenticated.
    const request = axios({
        method: 'get',
        url: `${BASE_URL}/profile/info`,
        mode: 'cors',
        headers: {'Authorization' : `Bearer ${token}`}
    });
    return (dispatch) => {
        request.then(
            ({data}) => {
                dispatch({type: FETCH_PROFILE, payload: data})
            }
        )
    }
}
