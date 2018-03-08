import axios from 'axios';

export const SIGN_IN_SUCCESSFUL = 'sign_in_successful';
export const SIGN_IN_FAILED = 'sign_in_failed';
export const SIGN_OUT = 'sign_out';

export const SIGN_UP_SUCCESSFUL = 'sign_up_successful';
export const SIGN_UP_FAILED = 'sign_up_failed';

/*
    request: {username: benkim1028, password: Tkflzls1!}
    response: {token: asdfasdfasdfasdfasdfasdf}
 */

export function signIn(values, callback) {
    const request = axios({
        method: 'post',
        url: 'http://localhost:8080/webapi/signin',
        data: values,
        mode: 'cors'
    });

    return (dispatch) => {
        request.then(
            ({data}) => {
                localStorage.setItem("user", data.token);
                dispatch({type: SIGN_IN_SUCCESSFUL, payload: data});
                callback();
            }).catch(
            () => dispatch({type: SIGN_IN_FAILED, payload: "Wrong Username or Password"}
            )
        );
    }
}

export function signOut(callback){
    localStorage.clear();
    callback();
    return{
        type: SIGN_OUT
    }
}

export function signUp(values, callback) {

        const request = axios({
            method: 'post',
            url: 'http://localhost:8080/webapi/signup',
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