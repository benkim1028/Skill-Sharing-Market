import {CREATE_ALERT_BAR} from "../actions";

export default function (state = {}, action) {

    switch (action.type) {
        case CREATE_ALERT_BAR:
            console.log(action.payload);
            return {open: true,message: action.payload};
    }
    return state;
}
