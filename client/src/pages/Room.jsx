import React from 'react';
import useWebRTC, {LOCAL_VIDEO} from '../hooks/useWebRTC';
import {useParams} from 'react-router';


const Room = () => {
    const {v4: roomID} = useParams();
    const {clients, provideMediaRef} = useWebRTC(roomID);
    return (
        <div className="room" style={{backgroundColor: "#1C1D22"}}>
            {/*<div className={"screen"}>*/}
            {/*    <div></div>*/}
            {/*    <div></div>*/}
            {/*    <div></div>*/}
            {/*    <div></div>*/}
            {/*</div>*/}
            {clients.map((clientID, index) => {
                return (
                    <div className="videoBox" key={clientID} id={clientID}>
                        <video
                            width='100%'
                            height='100%'
                            ref={instance => {
                                provideMediaRef(clientID, instance);
                            }}
                            autoPlay
                            playsInline
                            muted={clientID === LOCAL_VIDEO}
                        />
                    </div>
                );
            })}
        </div>
    );
};
export default Room;