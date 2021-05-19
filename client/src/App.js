import React from 'react';
import './css/App.css';
import {Header, Nav} from "./components";
import {Main, Profile, Forms, Create} from "./pages";
import {Route} from "react-router-dom";
import {useDispatch, useSelector,} from "react-redux";
import {createUser, login, setUser, test} from "./redux/actions/users";

function App() {
    const dispatch = useDispatch();
    let user = useSelector(({users}) => users.user);


    const logIn = (body) => {
        dispatch(login(body));
    }


    const createProfile = React.useCallback((body) => {
        dispatch(createUser(body));
    }, []);

    const logOut = React.useCallback(() =>{
        localStorage.removeItem("user");
        dispatch(setUser());
    }, [])

    React.useEffect(() => {
            dispatch(setUser())
    }, []);
    React.useEffect(() => {
            dispatch(test())
    }, []);
    return (
        <div className="container">
                <Nav />
                <Header profile={user}/>
                <Route path="/" component={Main} exact/>
                <Route path="/profile" component={() => <Profile logout={logOut}/>} exact/>
                <Route path="/create" component={() => <Create id={user.id}/>} exact/>
                <Route path="/auth" component={() => <Forms setProfile={logIn} setNewProfile={createProfile}/>} exact/>
                    {/*<Route path="/create" component={Create} exact/>*/}
                    {/*<Route path="/login" component={() =>*/}
                    {/*    user ? <Redirect to="/"/> : <Profile setProfile={logIn} setNewProfile={createProfile}/>*/}
                    {/*}/>*/}
        </div>
    );
}

export default App;
