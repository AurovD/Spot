import { combineReducers} from 'redux';

import users from "./users";
import create from "./create";
import mainEvents from "./mainEvents";
// import getEventReg from "./mainEvents";
const rootReducer = combineReducers({
    users,
    create,
    mainEvents
})

export default rootReducer;