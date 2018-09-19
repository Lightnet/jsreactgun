import React from "react";

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

    changePassphrase(){
        //console.log("");
        let user = this.$gun.user();
        //console.log(user)
        if (user.is ==null){
            this.$root.$emit('dialogmessage',"Alias is Null");
            return
        }
        let self = this;
        console.log(self.state.oldpassphrase);
        console.log(self.state.newpassphrase);
        if(!self.state.oldpassphrase || !self.state.newpassphrase){
            console.log('empty!');
            return;
        }
        user.auth(user.is.alias, self.state.oldpassphrase, (ack) => {//user auth call
            //console.log(ack);
            let status = ack.err || "Saved!";//check if there error else saved message.
            console.log(status);
        }, {change: self.state.newpassphrase});//set config to change password
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
                            <td><button onClick={this.changePassphrase.bind(this)}>Change</button></td>
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