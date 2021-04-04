import React from 'react';
import './css/App.css';
import { useState } from 'react';
import {Header, Nav, Forms} from "./components";
import {Main, Profile} from "./pages";
import {Route} from "react-router-dom";
import {useDispatch, useSelector,} from "react-redux";
import {createUser, login, setUser} from "./redux/actions/users";

// function useToken() {
//     const getToken = () => {
//         const tokenString = localStorage.getItem('token');
//         const userToken = JSON.parse(tokenString);
//         console.log(userToken, "token")
//         return userToken?.token
//     };
//
//     const [token, setToken] = useState(getToken());
//
//     const saveToken = userToken => {
//         localStorage.setItem('token', JSON.stringify(userToken));
//         setToken(userToken.token);
//     };
//     return {
//         setToken: saveToken,
//         token
//     }
// }

function App() {
    const dispatch = useDispatch();
    let user = useSelector(({users}) => users.user);
    console.log(user)
    const logIn= body =>{
        dispatch(login(body));
    }
    const createProfile= body =>{
        dispatch(createUser(body));
    }
    React.useEffect(() => {
            dispatch(setUser());
    }, [user]);
    return (
        <div className="App" style={{position: "relative"}}>
            <div className="container">
                <Nav />
                <Header profile={user}/>
                <Route path="/" component={Main} exact/>
                <Route path="/profile" component={Profile} exact/>
                    {/*<Route path="/create" component={Create} exact/>*/}
                    {/*<Route path="/login" component={() =>*/}
                    {/*    user ? <Redirect to="/"/> : <Profile setProfile={logIn} setNewProfile={createProfile}/>*/}
                    {/*}/>*/}
            </div>
            <Forms setProfile={logIn} setNewProfile={createProfile}/>
        </div>
    );
}

export default App;
