import { combineReducers} from 'redux';

import users from "./users";
import create from "./create";
import mainEvents from "./mainEvents";
import event from "./event";
// import getEventReg from "./mainEvents";
const rootReducer = combineReducers({
    users,
    create,
    mainEvents,
    event
})

export default rootReducer;