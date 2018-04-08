import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './reducer_sign_in';
import userReducer from './reducer_profile';
import signUpReducer from './reducer_sign_up';
import alertReducer from './reducer_alert';
import loadingReducer from './reducer_loading';
import postsReducer from './reducer_posts';

const rootReducer = combineReducers({
    auth: authReducer,
    form: formReducer,
    user: userReducer,
    signup: signUpReducer,
    alert: alertReducer,
    loading: loadingReducer,
    posts: postsReducer
});

export default rootReducer;
