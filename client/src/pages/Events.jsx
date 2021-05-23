import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchHistoryEvents} from "../redux/actions/events";
import {EventsBox} from "../components";

const Events= ({profile}) => {
    console.log(profile);
    const dispatch = useDispatch();
    const items = useSelector(({mainEvents}) => mainEvents.items);
    console.log("hhh", items)
    React.useEffect(() => {
        dispatch(fetchHistoryEvents({user: profile.id}))
    }, []);

    return (
        <div className="main__container" style={{padding: "80px"}}>
            <div>Текущие</div>
            <EventsBox items={items}/>
        </div>
    );
}
export default Events;