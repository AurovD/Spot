import React from 'react';
import './css/App.css';
import {Header, Nav} from "./components";
import {Main, Profile, Forms, Create, Event, Events, Room} from "./pages";
import {Route} from "react-router-dom";
import {useDispatch, useSelector,} from "react-redux";
import {createUser, login, setUser, test} from "./redux/actions/users";

function App() {
    const dispatch = useDispatch();
    let user = useSelector(({users}) => users.user);
    console.log(user)

    const logIn = (body) => {
        dispatch(login(body));
    }


    const createProfile = React.useCallback((body) => {
        dispatch(createUser(body));
    }, []);

    // const logOut = React.useCallback(() =>{
    //     localStorage.removeItem("user");
    //     dispatch(setUser());
    // }, [])

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
                <Route path="/profile/:id" component={() => <Profile profile={user}/>} exact/>
                <Route path="/create" component={() => <Create id={user.id}/>} exact/>
                <Route path="/event/:id" component={() => <Event profile={user}/>} exact/>
                <Route path="/room/:v4" component={() => <Room/>} exact/>
                <Route path="/events" component={() => <Events profile={user}/>} exact/>
                <Route path="/auth" component={() => <Forms setProfile={logIn} setNewProfile={createProfile}/>} exact/>
                    {/*<Route path="/create" component={Create} exact/>*/}
                    {/*<Route path="/login" component={() =>*/}
                    {/*    user ? <Redirect to="/"/> : <Profile setProfile={logIn} setNewProfile={createProfile}/>*/}
                    {/*}/>*/}
        </div>
    );
}

export default App;
