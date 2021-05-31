import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchHistoryEvents} from "../redux/actions/events";
import {EventsBox, Aside} from "../components";

const Events= ({profile}) => {
    const dispatch = useDispatch();
    const items = useSelector(({mainEvents}) => mainEvents.items);
    React.useEffect(() => {
        dispatch(fetchHistoryEvents({user: profile.id}))
    }, []);

    return (
        <div className="main__container">
            <div className="main">
                <div className="board">
                    <div>Текущие</div>
                    <EventsBox items={items}/>
                </div>
                <Aside/>
            </div>
        </div>
    );
}
export default Events;