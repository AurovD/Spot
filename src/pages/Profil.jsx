import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {removeUser} from "../redux/actions/users";

const Profile = () => {
    const dispatch = useDispatch();

    return (
        <div className="main__container" style={{padding: "80px"}}>
            <Link to="/" onClick={event => {
                localStorage.removeItem('token');
                dispatch(removeUser())
            }}>Выход</Link>
        </div>
    );
}
export default Profile;