import React from 'react';
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import {Aside, EventsBox, Menu} from "../components";


const Profile = ({profile}) => {
    let { id } = useParams();
    const [error, setError] = React.useState(null);
    const [items, setItems] = React.useState([]);
    const [user, setUser] = React.useState([]);
    React.useEffect(() => {
        let cleanupFunction = false;
        const fetchData = async () => {
            try {
                // const res = await fetch("https://api.aurovd.ru/api/userevents", {
                const res = await fetch("http://localhost:8001/api/userevents", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id: id})
                });
                const data = await res.json();
                if(data && !cleanupFunction) {
                    setItems(data.events);
                }
            } catch (err) {
                setError(error);
            }
        }
        fetchData();
        return () => cleanupFunction = true;
    }, []);

    React.useEffect(() => {
        let cleanupFunction = false;
        const fetchData = async () => {
            try {
                // const res = await fetch("https://api.aurovd.ru/api/getuser", {
                const res = await fetch("http://localhost:8001/api/getuser", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id: id})
                });
                const data = await res.json();
                if(data && !cleanupFunction) {
                    setUser(data);
                }
            } catch (err) {
                setError(error);
            }
        }

        fetchData();
        return () => cleanupFunction = true;
    }, []);


    const updateRating = async (number, e) => {
        console.log(number)
        try {
            // const res = await fetch("https://api.aurovd.ru/api/userrating", {
            await fetch("http://localhost:8001/api/userrating", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: +id,
                    idhost: profile.id,
                    number: number})
            });
        } catch (err) {
            throw err
        }
    };

    let circles = []
    let num = Math.floor(user.rating);
    for (let i = 0; i < num; ++i) {
        circles.push(<div className="circle" key={i} onClick={(e) => updateRating(i + 1, e)}></div>);
    }
    for (let i = 0; i < (5 - num); ++i) {
        circles.push(<div className="circle circle_grey" key={i + num} onClick={(e) => updateRating(num + i + 1, e)}></div>);
    }

    return (
        <div className="main__container">
            <div className="main">
                <div className="board profile">
                    <div className="main_header profile_header">
                        <div className="profile_avatar"></div>
                        <div className="profile_info">
                            <h2>{user.user.name}</h2>
                            <p className="profile_p">0 подписчиков</p>
                            <p className="profile_p profile_p__text">{user.user.description}</p>
                            <div className="card_rating">
                                {/*<div className="circle" onClick={(e) => updateRating(1, e)}></div>*/}
                                {/*<div className="circle" onClick={(e) => updateRating(2, e)}></div>*/}
                                {/*<div className="circle" onClick={(e) => updateRating(3, e)}></div>*/}
                                {/*<div className="circle" onClick={(e) => updateRating(4, e)}></div>*/}
                                {/*<div className="circle" onClick={(e) => updateRating(5, e)}></div>*/}
                                {
                                    circles
                                }
                                <p className="profile_p">{user.rating} ({user.count} оценок)</p>
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