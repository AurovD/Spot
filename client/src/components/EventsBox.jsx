import React from 'react';
import {EventCard} from "../components";

const EventsBox = ({items}) => {
    return (
            <div className="main__cards">
                {
                    items && items.map((event, key) => <EventCard event={event} key={key}/>)
                }
            </div>
    );
}
export default EventsBox;