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
            dispatch(setMainEvents(data.events));
        }
    } catch (err) {
        throw new Error(err);
    }
};
export const fetchHistoryEvents = (body) => async (dispatch) => {
    console.log(body)
    try {
        const res = await fetch("https://api.aurovd.ru/api/fetchMainEvents", {
        // const res = await fetch("http://localhost:8001/api/fetchHistoryEvents", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        if(data) {
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


export const eventReg = (body) => async (dispatch) => {
    try {
        const res = await fetch("https://api.aurovd.ru/api/fetchMainEvents", {
        // const res = await fetch("http://localhost:8001/api/eventReg", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    } catch (err) {
        throw new Error(err);
    }
};

