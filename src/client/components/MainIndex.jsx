import React from "react";

import MainIndexNav from './MainIndexNav.jsx';
import AccountInfoPublicKey from './Account/AccountInfoPublicKey.jsx';

class MainIndex extends React.Component {
    //constructor(props) {
    //}
    render() {
        return (
            <div>
                <AccountInfoPublicKey />
                <MainIndexNav />
            </div>
        );
    }
}

export default MainIndex;