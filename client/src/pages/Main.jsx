import React from 'react';
import {EventsBox, Aside} from "../components";
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
            <div className="main" style={{marginTop: "-15px"}}>
                <EventsBox items={items}/>
                <Aside/>
            </div>
        </div>
    );
}
export default Main;

// группы чаты