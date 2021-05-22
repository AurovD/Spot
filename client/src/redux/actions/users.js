function userToken() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
}
export const createUser = (body) => async () => {
    let res = await fetch("https://api.aurovd.ru/api/signup", {
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
    let res = await fetch("https://api.aurovd.ru/api/login", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    let data = await res.json();
    if(data) {
        console.log(data.data)
        // document.cookie = "user" + "=" + JSON.stringify(data.data);
        localStorage.setItem('user', JSON.stringify(data.data));
        dispatch(setUser());
    }
};
export const test = () => async () => {
    let res = await fetch("http://localhost:8001/api/test", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        },
    });
    let data = await res.json();
    if(data) {
        console.log(data)
    }
};

export const setUser = () => ({
    type: 'SET_USER',
    data: userToken()
});

//актуальность курсов. вебинар ру