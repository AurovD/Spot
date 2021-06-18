import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import DefaultImg from '../assets/abstract-653939_1920.jpg';

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

    React.useEffect(() => {
        let cleanupFunction = false;
        const fetchData = async () => {
            try {
                // const res = await fetch("https://api.aurovd.ru/api/event", {
                const res = await fetch("http://localhost:8001/api/event", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id: id})
                });
                const data = await res.json();
                if(data && !cleanupFunction) {
                    setIsLoaded(true);
                    setItems(data);
                }
            } catch (err) {
                setIsLoaded(false);
                setError(error);
            }
        }
        fetchData();
        return () => cleanupFunction = true;
    }, [id])
    console.log(items)
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
                    </div>
                    <div>

                    </div>
                </div>}
            </div>
        </div>
    );
}
export default Event;