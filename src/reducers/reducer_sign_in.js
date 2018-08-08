import {SIGN_IN_FAILED, SIGN_IN_SUCCESSFUL, SIGN_OUT} from "../actions";

export default function (state = {}, action) {
    switch (action.type) {
        case SIGN_IN_SUCCESSFUL:
            console.log(action);
            return {...state, authenticated: true};
        case SIGN_IN_FAILED:
            console.log(action);
            return {...state, error: action.payload};
        case SIGN_OUT:
            console.log(action);
            return {...state, authenticated: false};
        default:
            return state;
    }
}
