const initialState = {
    respond: ""
};
const res = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_RESPONSE':
            return {
                ...state,
                respond: action.data,
            };
        default:
            return state;
    }
};
export default res;