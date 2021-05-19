import React from 'react';
import {EventCard} from "../components";
import {fetchMainEvents} from "../redux/actions/events";
import {useDispatch, useSelector} from "react-redux";

const Main = () => {
    const dispatch = useDispatch();
    const items = useSelector(({mainEvents}) => mainEvents.items);
    console.log(items)
    // React.useEffect(() => {
    //     dispatch(fetchMainEvents())
    // }, []);

    return (
        <div className="main__container">
            <div className="banner"></div>
            <div className="main">
                <div className="main__cards">
                    {
                        items && items.map((event, key) => <EventCard event={event} key={key}/>)
                    }
                </div>
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