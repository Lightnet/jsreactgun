import React from "react";

import AccountProfile from './Account/AccountProfile.jsx';
import AccountChangePassphrase from './Account/AccountChangePassphrase.jsx';
import AccountPassphraseHint from './Account/AccountPassphraseHint.jsx';

class MainIndex extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <AccountProfile></AccountProfile>
                <AccountChangePassphrase></AccountChangePassphrase>
                <AccountPassphraseHint></AccountPassphraseHint>
            </div>
        );
    }
}
export default MainIndex;