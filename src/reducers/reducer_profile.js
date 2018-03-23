import {FETCH_PROFILE} from "../actions";

export default function (state = {}, action) {

    switch (action.type) {
        case FETCH_PROFILE:
            console.log(action.payload);
            return {...state, data: action.payload};
    }
    return state;
}