import React from "react";

import GChatRoom from './GChat/GChatRoom.jsx';

class GChat extends React.Component {

    //constructor(props) {
        //super(props);
    //}

    render() {
        return (
            <div>
                <label>GChat</label>
                <GChatRoom></GChatRoom>
            </div>
        );
    }
}
export default GChat;