import React from 'react';
import {eventReg} from "../redux/actions/events";
import {useDispatch, useSelector} from "react-redux";
import DefaultImg from '../assets/abstract-653939_1920.jpg';
import {useHistory} from "react-router-dom";

let months = ['января', 'февраля', 'марта', 'апреля','мая', 'июня', 'июля', 'августа','сентября', 'октября', 'ноября', 'декабря'];

const getDateFormat = (date) => {
    date = date.split("T", 1)[0].split("-");
    let month = "";
    for (let i = 0; i < months.length; i++){
        month = months[+date[1] - 1];
    }
    return `${date[2]} ${month} ${date[0]}`;

}
const getTimeFormat = (time) => {
    time = time.split(":");
    time[2] = `(${time[2]})`
    return `${time[0]}:${time[1]} ${time[2]}`;
}
const getPersent = (membersCount, maxCount) => {
    let persent = (((membersCount * 100) / maxCount) * 5) / 100;
    return  Math.floor(persent);
}

const EventCard = ({ event }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    let user = useSelector(({users}) => users.user);

    let circles = []
    let num = getPersent(event.members, event.countguests);
    for (let i = 0; i < num; ++i) {
        circles.push(<div className="circle" key={i}></div>);
    }
    for (let i = 0; i < (5 - num); ++i) {
        circles.push(<div className="circle circle_grey" key={i + num}></div>);
    }

    const onEventReg= React.useCallback(() => {
        if(user && user.id !== event.idcreator){
            dispatch(eventReg({
                id: user.id,
                idEvent: event.id
            }));
            history.push(`/events`);
        } else {
            console.log("no");
        }
    }, [dispatch, user, event.members]);

    return (
        <div className="event_card">
            <div className="card__img" onClick={() => history.push(`/event/${event.id}`)} style={{backgroundImage: `url(${event.bannerurl ? "http://localhost:8001/images/"+event.bannerurl : DefaultImg})`}}>
            </div>
            <div className="card_infoText">
                <h3 onClick={() => history.push(`/event/${event.id}`)}>{event.title}</h3>
                <p>{getDateFormat(event.datestart)} {getTimeFormat(event.timestart)}</p>
                <a onClick={() => history.push(`/profile/${event.idcreator}`)}>{event.name}</a>
            </div>
            <div className="card_footer">
                <button onClick={onEventReg}>Участвовать</button>
                <div className="card_rating">
                    {
                        circles
                    }
                    <p>{event.members ? event.members.length : 0}/{event.countguests}</p>
                </div>
            </div>
        </div>
    );
}
export default EventCard;