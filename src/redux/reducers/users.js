const initialState = {
    id: "",
    user: ""
};
const users = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
                return {
                    ...state,
                    user: action.data,
                };
        default:
            return state;
    }
};
export default users;