import React from 'react';
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";

const Profile = ({logout, profile}) => {
    let { id } = useParams();
    return (
        <div className="main__container" style={{padding: "80px"}}>
            {profile && profile.id == id ?
                <div>
                    <Link to="/" onClick={event => {
                        logout();
                    }}>Выход</Link>
                </div>
                :
                <div>Чужой профиль</div>
            /*<img src={`http://localhost:8001/images/1620303372014.jpg`} alt=""/>*/}
        </div>
    );
}
export default Profile;