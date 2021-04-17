import React from 'react';
import './css/App.css';
import { useCookies } from 'react-cookie';
import {Header, Nav} from "./components";
import {Main, Profile, Forms} from "./pages";
import {Route} from "react-router-dom";
import {useDispatch, useSelector,} from "react-redux";
import {createUser, login, setUser, removeUser} from "./redux/actions/users";

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
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const logIn= body =>{
        dispatch(login(body));
    }
    const createProfile = body =>{
        dispatch(createUser(body));
    }
    const logOut = () =>{
        removeCookie("user")
        dispatch(setUser());
    }
    React.useEffect(() => {
            dispatch(setUser())
    }, [user]);
    return (
        <div className="container">
                <Nav />
                <Header profile={user}/>
                <Route path="/" component={Main} exact/>
                <Route path="/profile" component={() => <Profile logout={logOut}/>} exact/>
                <Route path="/:forms" component={() => <Forms profile={user} setProfile={logIn} setNewProfile={createProfile}/>} exact/>
                    {/*<Route path="/create" component={Create} exact/>*/}
                    {/*<Route path="/login" component={() =>*/}
                    {/*    user ? <Redirect to="/"/> : <Profile setProfile={logIn} setNewProfile={createProfile}/>*/}
                    {/*}/>*/}
        </div>
    );
}

export default App;
