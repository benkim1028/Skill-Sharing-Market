import axios from 'axios';
import jwt from 'jsonwebtoken';

export const SIGN_IN_SUCCESSFUL = 'sign_in_successful';
export const SIGN_IN_FAILED = 'sign_in_failed';
export const SIGN_OUT = 'sign_out';

export const SIGN_UP_SUCCESSFUL = 'sign_up_successful';
export const SIGN_UP_FAILED = 'sign_up_failed';
export const FETCH_PROFILE = 'fetched_profile';

export const CREATE_ALERT_BAR = 'create_alert_bar';
export const CLOSE_ALERT_BAR = 'close_alert_bar';

export const SHOW_LOADING = 'show_loading';
export const CLOSE_LOADING = 'close_loading';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const CREATE_POST = 'create_post';

/*
    request: {username: benkim1028, password: Tkflzls1!}
    response: {token: asdfasdfasdfasdfasdfasdf}
 */
//const BASE_URL = "https://skillbackend.herokuapp.com/webapi";
const BASE_URL = "http://localhost:8080/webapi";


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
                dispatch(closeLoading());
                dispatch(createAlertBar("Signed In Successfully"));
                let token = jwt.decode(data.token);
                console.log(token);
                console.log(new Date(token.exp));
                callback();
            }).catch(
            () => {
                dispatch({type: SIGN_IN_FAILED, payload: "Wrong Username or Password"});
                dispatch(closeLoading());
                dispatch(createAlertBar("Signed In Failed"));
            }
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

    return (dispatch) => {
        dispatch({type: CREATE_ALERT_BAR, payload: message});
        setTimeout (() => dispatch({type: CLOSE_ALERT_BAR}),2000);
    }
}

export function showLoading() {
    return {
        type: SHOW_LOADING,
    }
}
export function closeLoading() {
    return {
        type: CLOSE_LOADING
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
            () => {
                dispatch({type: SIGN_UP_SUCCESSFUL});
                dispatch(closeLoading());
                dispatch(createAlertBar("Signed Up Successfully"));
                callback();
            }).catch(
            () => {
                dispatch({type: SIGN_UP_FAILED, payload: "Wrong Username or Password"});
                dispatch(closeLoading());
                dispatch(createAlertBar("Sign Up Failed"));
            }
        );
    }
}


//jwt.decode = {jti: "benkim1028@gmail.com", iat: 1521181033, sub: "123456789", iss: "Ben Kim", exp: 1521181033}
export function fetchProfile() {
    const token = localStorage.getItem("user");
    // we do not need to check if token exists, required_auth will check if this user is authenticated.
    const request = axios({
        method: 'get',
        url: `${BASE_URL}/profile/info`,
        mode: 'cors',
        headers: {'Authorization': `Bearer ${token}`}
    });
    return (dispatch) => {
        request.then(
            ({data}) => {
                dispatch({type: FETCH_PROFILE, payload: data});
                dispatch(closeLoading());
            }
        )
    }
}

export function createPost(values, callback){


    const token = localStorage.getItem("user");
    const uid = token + makeid();
    const newValue = {...values, retired: false, uid: uid};
    const request = axios({
        method: 'post',
        url: `${BASE_URL}/posts/new`,
        mode: 'cors',
        data: newValue,
        headers: {'Authorization': `Bearer ${token}`}
    });
    return (dispatch) => {
        request.then(
            () => {
                dispatch(closeLoading());
                dispatch(createAlertBar("A Post Created Successfully"));
                callback();
            }
        )
    }
}

export function fetchPosts() {
    console.log("fetchposts is called");
    const token = localStorage.getItem("user");
    const request = axios({
        method: 'get',
        url: `${BASE_URL}/posts`,
        mode: 'cors',
        headers: {'Authorization': `Bearer ${token}`}
    });
    return (dispatch) => {
        request.then(
            ({data}) => {
                console.log("returned data");
                console.log(data);
                dispatch({type: FETCH_POSTS, payload: data });
                dispatch(closeLoading());

            }
        )
    }
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}