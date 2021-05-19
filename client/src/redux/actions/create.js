export const create = (body) => async (dispatch) => {
    try {
        const res = await fetch("https://api.aurovd.ru/api/createEvent", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                'enctype': 'multipart/form-data'
            },
            body: body
        });
        const data = await res.json();
        if(data) {
            alert(`${data.msg}`);
            dispatch(getRes(data.msg));
        }
    } catch (err) {
        throw new Error(err);
    }
};

export const getRes = (res) => ({
    type: 'SET_RESPONSE',
    data: res
});