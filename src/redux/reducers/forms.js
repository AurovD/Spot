const initialState = {
    value: false,
    string: "",
};


const forms = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FORM':
            return {
                ...state,
                value: action.value,
                string: action.string,
            };
        default:
            return state;
    }
};
export default forms;