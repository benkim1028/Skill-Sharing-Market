import axios from 'axios';
import jwt from 'jsonwebtoken';
import history from '../history'

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
const BASE_URL = "https://skillbackend.herokuapp.com/webapi";
//const BASE_URL = "http://localhost:8080/webapi";


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
                console.log(data);
                if(data.message === "Need More Information"){
                    dispatch(closeLoading());
                    history.push({pathname: '/signup/google',
                                 state: { username: data.username, firstname: data.firstname, lastname: data.lastname }})
                }
                else if(data.message === "Login Successful") {
                    let token = jwt.decode(data.token);
                    localStorage.setItem("user", data.token);
                    localStorage.setItem("userid", token.jti);
                    dispatch({type: SIGN_IN_SUCCESSFUL, payload: data});
                    dispatch(closeLoading());
                    dispatch(createAlertBar("Signed In Successfully"));

                    console.log(token);
                    var d = new Date();
                    console.log(d);
                    d.setMilliseconds(d.getMilliseconds() + token.exp);
                    console.log(d);
                    callback();
                }
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

export function signUp(values, callback, idp="default") {
    var sign_up_url = `${BASE_URL}/signup`;
    if(idp != "default"){
        url += `/${idp}`
    }
    const request = axios({
        method: 'post',
        url: sign_up_url,
        data: values,
        mode: 'cors'
    });
    return (dispatch) => {
        request.then(
            (data) => {
                if(data.message === "Login Successful") {
                    let token = jwt.decode(data.token);
                    localStorage.setItem("user", data.token);
                    localStorage.setItem("userid", token.jti);
                    dispatch({type: SIGN_IN_SUCCESSFUL, payload: data});
                    dispatch(closeLoading());
                    dispatch(createAlertBar("Signed In Successfully"));

                    console.log(token);
                    var d = new Date();
                    console.log(d);
                    d.setMilliseconds(d.getMilliseconds() + token.exp);
                    console.log(d);
                    callback();
                } else {
                    dispatch({type: SIGN_UP_SUCCESSFUL});
                    dispatch(closeLoading());
                    dispatch(createAlertBar("Signed Up Successfully"));
                    callback();
                }
            }).catch(
            () => {
                dispatch({type: SIGN_UP_FAILED, payload: "User Exists in our database"});
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

export function createPost(values, category, transaction, callback){


    const id = localStorage.getItem("userid");
    const token = localStorage.getItem("user");
    const uid = id + makeid();
    const newValue = {...values, retired: false, uid: uid, createdAt: new Date()};
    const request = axios({
        method: 'post',
        url: `${BASE_URL}/posts/${category}/new${transaction}post`,
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

export function fetchPosts(category, transaction) {
    console.log("fetchposts is called");
    const token = localStorage.getItem("user");
    const request = axios({
        method: 'get',
        url: `${BASE_URL}/posts/${category}/get${transaction}posts`,
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

    for (var i = 0; i < 40; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
