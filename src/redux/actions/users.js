function userToken() {
    const tokenString = localStorage.getItem('token');
    const user = JSON.parse(tokenString);
    return user;
}
export const createUser = (body) => async () => {
    console.log(body)
    let res = await fetch("http://localhost:8001/api/signup", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    let data = await res.json();
    if(data) {
        console.log(data.data);
    }
};
export const login = (body) => async (dispatch) => {
    let res = await fetch("http://localhost:8001/api/login", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    let data = await res.json();
    if(data) {
        localStorage.setItem('token', JSON.stringify(data.data));
        dispatch(setUser());
    }
};

export const setUser = () => ({
    type: 'SET_USER',
    data: userToken()
});
export const removeUser = () => ({
    type: 'REM_USER',
    data: null
});

export const setForm = (value, string) => ({
    type: 'SET_FORM',
    value: value,
    string: string
});

//актуальность курсов. вебинар ру