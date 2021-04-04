import {login} from "../actions/users";

const initialState = {
    user: "",
    id: ""
};
const users = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            if(action.data) {
                return {
                    ...state,
                    user: action.data["login"],
                    id: action.data["id"],
                };
            }
        case 'REM_USER':
            if(action.data) {
                console.log("jkhkhh")
            }
        default:
            return state;
    }
};
export default users;