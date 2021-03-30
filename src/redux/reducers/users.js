const initialState = {
    user: "",
    id: ""
};
const users = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.data["login"],
                id: action.data["id"],
            };
        default:
            return state;
    }
};
export default users;