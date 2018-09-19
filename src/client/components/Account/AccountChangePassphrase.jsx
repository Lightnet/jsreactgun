import React from "react";

//import Account from './MainIndexNav.jsx';

class AccountChangePassphrase extends React.Component {
    constructor(props) {
        super(props);
        //let user = this.$gun.user();

        this.state = {
            oldpassphrase:'',
            newpassphrase:'',
        }
    }

    handleChangeOldPassphrase(event) {
        this.setState({oldpassphrase: event.target.value});
    }
    handleChangeNewPassphrase(event) {
        this.setState({newpassphrase: event.target.value});
    }

    render() {
        return (
            <div id="changephrase">
                Change Passphrase:
                <table>
                    <tbody>
                        <tr>
                            <td>Old Passphrase</td>
                            <td><input value={this.state.oldpassphrase} onChange={this.handleChangeOldPassphrase.bind(this)} /></td>
                        </tr>
                        <tr>
                            <td>New Passphrase</td>
                            <td><input value={this.state.newpassphrase} onChange={this.handleChangeNewPassphrase.bind(this)} /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><button>Change</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
/*

*/
export default AccountChangePassphrase;