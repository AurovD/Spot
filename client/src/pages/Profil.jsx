import React from 'react';
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import {Aside, EventsBox} from "../components";

const Profile = ({logout, profile}) => {
    let { id } = useParams();
    return (
        <div className="main__container">
            <div className="main">
                <div className="board profile">
                    <div className="main_header profile_header">
                        <div className="profile_avatar"></div>
                        <div className="profile_info">
                            <h2>Аюров Дмитрий</h2>
                            <p className="profile_p">0 подписчиков</p>
                            <p className="profile_p profile_p__text">web-разРАБ</p>
                            <div className="card_rating">
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <div className="circle"></div>
                                <p className="profile_p">5.0 (5000 оценок)</p>
                            </div>
                        </div>
                        <div className="profile_options">
                            {profile && profile.id == id ?
                                <button onClick={event => {
                                    logout();
                                }}>
                                    Выход
                                </button>
                                :
                                <button>Подписаться</button>}
                            <div className="profile_settings">
                                <div className="settings_button">
                                    <div className="circle_blue"></div>
                                    <div className="circle_blue"></div>
                                    <div className="circle_blue"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Aside/>
            </div>
        </div>
    );
}
export default Profile;