import React from 'react';
import {Link} from "react-router-dom";

const Profile = ({logout}) => {
    return (
        <div className="main__container" style={{padding: "80px"}}>
            <Link to="/" onClick={event => {
                logout();
            }}>Выход</Link>
            <img src={`http://localhost:8001/images/1620303372014.jpg`} alt=""/>
        </div>
    );
}
export default Profile;