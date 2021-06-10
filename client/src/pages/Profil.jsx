import React from 'react';
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import {Aside, EventsBox, Menu} from "../components";

const Profile = ({profile}) => {
    let { id } = useParams();
    const [error, setError] = React.useState(null);
    const [items, setItems] = React.useState([]);
    React.useEffect(async () => {
        try {
            const res = await fetch("https://api.aurovd.ru/api/userevents", {
            // const res = await fetch("http://localhost:8001/api/userevents", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id: id})
            });
            const data = await res.json();
            if(data) {
                setItems(data.events);
            }
        } catch (err) {
            setError(error);
        }
    }, [id]);
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
                        <Menu/>
                    </div>
                    <EventsBox items={items}/>
                </div>
                <Aside/>
            </div>
        </div>
    );
}
export default Profile;