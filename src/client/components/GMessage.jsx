import React from "react";

import GMessageBox from './Gmessage/GMessageBox.jsx';

class GMessage extends React.Component {
    
    //constructor(props) {
        //super(props);
    //}

    render() {
        return (
            <div>
                <label>Message</label>
                <GMessageBox></GMessageBox>
            </div>
        );
    }
}
export default GMessage;