import {SHOW_LOADING, CLOSE_LOADING} from "../actions";

export default function (state = {open: false}, action) {

    switch (action.type) {
        case SHOW_LOADING:
            return {open: true};
        case CLOSE_LOADING:
            return {open: false};
    }
    return state;
}
