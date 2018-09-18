import React from "react";

//import Account from './MainIndexNav.jsx';

class AccountInfoPublicKey extends React.Component {
    constructor(props) {
        super(props);
        let user = this.$gun.user();

        this.state = {
            alias:user.is.alias,
            publickey:user.is.pub,
        }
    }

    render() {
        return (
            <div>
                <label>{this.state.alias}</label> : <label>{this.state.publickey}</label>
            </div>
        );
    }
}
export default AccountInfoPublicKey;