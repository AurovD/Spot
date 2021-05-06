import { combineReducers} from 'redux';

import users from "./users";
import create from "./create";
const rootReducer = combineReducers({
    users,
    create
})

export default rootReducer;