import {CLOSE_ALERT_BAR, CREATE_ALERT_BAR} from "../actions";

export default function (state = {open: false , message: ""}, action) {
    switch (action.type) {
        case CREATE_ALERT_BAR:
            console.log("create alert bar: " + action.payload);
            return {...state,open: true,message: action.payload};
        case CLOSE_ALERT_BAR:
            console.log("close alert bar");
            return {open: false, message: ""};
    }
    return state;
}
