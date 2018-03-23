import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './reducer_sign_in';
import userReducer from './reducer_profile';
import signUpReducer from './reducer_sign_up';
//import PostsReducer from './reducer_posts'

const rootReducer = combineReducers({
    auth: authReducer,
    form: formReducer,
    user: userReducer,
    signup: signUpReducer
});

export default rootReducer;
