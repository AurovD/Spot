export const setLoaded = (payload) => ({
    type: 'SET_LOADED',
    payload,
});

export const fetchMainEvents = () => async (dispatch) => {
    try {
        const res = await fetch("https://api.aurovd.ru/api/fetchMainEvents", {
        // const res = await fetch("http://localhost:8001/api/fetchMainEvents", {
            method: "GET"
        });
        const data = await res.json();
        if(data) {
            console.log(data)
            dispatch(setMainEvents(data.events));
        }
    } catch (err) {
        throw new Error(err);
    }
};

export const setMainEvents = (items) => ({
    type: 'SET_MAINEVENTS',
    payload: items,
});