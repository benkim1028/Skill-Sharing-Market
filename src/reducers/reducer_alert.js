import {CREATE_ALERT_BAR, CLOSE_ALERT_BAR} from "../actions";

export default function (state, action) {

    switch (action.type) {
        case CREATE_ALERT_BAR:
            console.log(action.payload);
            return {open: true,message: action.payload};
        case CLOSE_ALERT_BAR:
            console.log("alert_bar getting closed");
            return {...state, open: false}
        default:
            return {open: false, message: ""};
    }
}
