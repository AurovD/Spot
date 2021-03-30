import { combineReducers} from 'redux';

import users from "./users";
import forms from "./forms";
const rootReducer = combineReducers({
    users,
    forms
})

export default rootReducer;