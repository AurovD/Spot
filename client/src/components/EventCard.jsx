import React from 'react';

const EventCard = () => {
    return (
        <div className="event_card">
            <div className="card__img">
            </div>
            <div className="card_infoText">
                <h3>Lorem ipsum dolor</h3>
                <p>12 ноября 2056 года 19:00 (мск)</p>
                <a href="">Аюров Дмитрий</a>
            </div>
            <div className="card_footer">
                <button>Участвовать</button>
                <div className="card_rating">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <p>5.0</p>
                </div>
            </div>
        </div>
    );
}
export default EventCard;