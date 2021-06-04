const ACTIONS = {
    JOIN: 'join',
    LEAVE: 'leave',
    SHARE_ROOMS: 'share-rooms',
    ADD_PEER: 'add-peer', //new peer new connections
    REMOVE_PEER: 'remove-peer',
    RELAY_SDP: 'relay-sdp', //media data
    RELAY_ICE: 'relay-ice', //physical connections
    ICE_CANDIDATE: 'ice-candidate', //
    SESSION_DESCRIPTION: 'session-description'
};

module.exports = ACTIONS;