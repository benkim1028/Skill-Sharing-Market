import {SIGN_UP_FAILED, SIGN_UP_SUCCESSFUL} from "../actions";

export default function (state = {}, action) {

    switch (action.type) {
        case SIGN_UP_SUCCESSFUL:
            console.log(action);
            return state;
        case SIGN_UP_FAILED:
            console.log(action);
            return {...state, error: action.payload};
        default:
            return state;
    }
}