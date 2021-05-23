import React from 'react';
import {EventsBox} from "../components";
import {fetchMainEvents} from "../redux/actions/events";
import {useDispatch, useSelector} from "react-redux";

const Main = () => {
    const dispatch = useDispatch();
    const items = useSelector(({mainEvents}) => mainEvents.items);
    React.useEffect(() => {
        dispatch(fetchMainEvents())
    }, []);

    return (
        <div className="main__container">
            <div className="banner"></div>
            <div className="main">
                <EventsBox items={items}/>
                <div className="main_filter">
                    <div className="filter">
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Main;

// группы чаты