import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {event} from '../redux/actions/events'

const Event = () => {
    // const dispatch = useDispatch();
    const history = useHistory();
    let { id } = useParams();
    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [items, setItems] = React.useState([]);
    // React.useEffect(() => {
    //     dispatch(event({id: id}));
    // }, [id]);

    React.useEffect(async () => {
        try {
            const res = await fetch("https://api.aurovd.ru/api/event", {
            // const res = await fetch("http://localhost:8001/api/event", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id: id})
            });
            const data = await res.json();
            if(data) {
                setIsLoaded(true);
                setItems(data);
            }
        } catch (err) {
            setIsLoaded(false);
            setError(error);
        }
    }, [id])

    return (
        <div className="main__container">
            <div className="main">
                <p onClick={() => history.push(`/room/${isLoaded && items.link}`)}>Видео чат(`${isLoaded && items.link}`)</p>
            </div>
        </div>
    );
}
export default Event;