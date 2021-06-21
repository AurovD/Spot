const initialState = {
    items: [],
    isLoaded: false
};

const event = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_EVENT':
            return {
                ...state,
                items: action.payload,
                isLoaded: true,
            };
        case 'SET_EVENTLOADED':
            return {
                ...state,
                isLoaded: action.payload
            };
        default:
            return state;
    }
};

export default event;