import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './reducer_sign_in';
//import PostsReducer from './reducer_posts'

const rootReducer = combineReducers({
    auth: authReducer,
    form: formReducer
});

export default rootReducer;
