const initialState = {
    items: [],
    isLoaded: false
};

const mainEvents = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MAINEVENTS':
            return {
                ...state,
                items: action.payload,
                isLoaded: true,
            };
        case 'SET_LOADED':
            return {
                ...state,
                isLoaded: action.payload
            };
        default:
            return state;
    }
};

export default mainEvents;