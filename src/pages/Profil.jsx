import React from 'react';
import {Link} from "react-router-dom";

const Profile = ({logout}) => {
    return (
        <div className="main__container" style={{padding: "80px"}}>
            <Link to="/" onClick={event => {
                logout();
            }}>Выход</Link>
        </div>
    );
}
export default Profile;