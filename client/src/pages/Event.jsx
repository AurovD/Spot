import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import DefaultImg from '../assets/abstract-653939_1920.jpg';
import {useDispatch, useSelector} from "react-redux";
import {event, eventReg} from "../redux/actions/events";

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

const Event = ({profile}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    let { id } = useParams();
    const items = useSelector(({event}) => event.items);
    const isLoaded = useSelector(({event}) => event.isLoaded);
    let user = useSelector(({users}) => users.user);
    const [timer, setTimer] = React.useState({});
    // React.useEffect(() => {
    //     dispatch(event({id: id}));
    // }, [id]);
    console.log(isLoaded)
    React.useEffect(() => {
        dispatch(event({id: id}))
    }, []);

    const onEventReg= React.useCallback(() => {
        if(user && user.id !== items.idcreator){
            dispatch(eventReg({
                id: user.id,
                idEvent: items.id
            }));
            history.push(`/events`);
        } else {
            console.log("no");
        }
    }, [dispatch, user, items.members]);

    function msToTime(s) {
        Date.parse(new Date());
        let seconds = Math.floor((s / 1000) % 60);
        let minutes = Math.floor((s / 1000 / 60) % 60);
        let hours = Math.floor((s / (1000 * 60 * 60)) % 24);
        let days = Math.floor(s / (1000 * 60 * 60 * 24));
        console.log({
            'total': s,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        })
        return {
            'total': s,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };

        // return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
    }

    let getTime = (string) => {
        return msToTime(string && string - Date.now())
    };

    // React.useEffect(() => {
    //     setInterval(() => setTimer(getTime( Date.parse(`${isLoaded && items.datestart.split("T")[0]} ${items.timestart}`))), 10000)
    // }, [timer]);

    console.log(items, profile.id)
    return (
        <div className="main__container">
            <div className="main_event">
                {/*<p onClick={() => history.push(`/room/${isLoaded && items.link}`)}>Видео чат(`${isLoaded && items.link}`)</p>*/}
                {items && <div className="event_banner"
                      style={{backgroundImage: `linear-gradient(to left, transparent, #000 70%), url(${DefaultImg})`}}>
                    <div className="banner_info">
                        <h6>{items.category}</h6>
                        <h2>{items.title}</h2>
                        <p>{items.description}</p>
                        <a onClick={() => history.push(`/profile/${items.idcreator}`)}>{items.name}</a>
                        {items && isLoaded && <p>{getDateFormat(items.datestart)} {getTimeFormat(items.timestart)}</p>}
                        { items.members && items.members.includes(profile.id) || items.idcreator === profile.id ?
                            <button  onClick={() => {
                                if(Date.parse(`${isLoaded && items.datestart.split("T")[0]} ${items.timestart}`) <= Date.now()){
                                    history.push(`/room/${isLoaded && items.link}`)
                                }
                            }}>{
                                Date.parse(`${isLoaded && items.datestart.split("T")[0]} ${items.timestart}`) <= Date.now() ? "Войти" : `В ожидании`
                            }</button> :
                            <button onClick={onEventReg}>УЧАСТВОВАТЬ</button>
                        }
                    </div>
                    <div>
                    </div>
                </div>}
            </div>
        </div>
    );
};
export default Event;