import React from "react";

class AccountInfoPublicKey extends React.Component {
    constructor(props) {
        super(props);
        let user = this.$gun.user();

        this.state = {
            alias:user.is.alias,
            publickey:user.is.pub,
            bDisplayPublicKey:true,
            DisplayPublicKeyWidth:98,
        }
    }

    handleChangePublicKey(event) {
        this.setState({publickey: event.target.value});
    }

    togglePublicKey(){
        let bDisplayPublicKey = this.state.bDisplayPublicKey;
        if(bDisplayPublicKey){
            bDisplayPublicKey = false;
            this.setState({DisplayPublicKeyWidth: 20});
        }else{
            bDisplayPublicKey = true;
            this.setState({DisplayPublicKeyWidth: 98});
        }

        this.setState({bDisplayPublicKey: bDisplayPublicKey});
    }

    PublicKeyCopy(){
        let publicKey = document.getElementById('publickey');
        publicKey.select();
        document.execCommand('copy');
    }

    render() {
        return (
            <div>
                <label>Alias: {this.state.alias} </label>
                <button onClick={()=>this.togglePublicKey()}>Public Key</button>
                <button onClick={()=>this.PublicKeyCopy()}>Copy</button>
                <input id="publickey" value={this.state.publickey} onChange={this.handleChangePublicKey.bind(this)} size={this.state.DisplayPublicKeyWidth} readOnly />
            </div>
        );
    }
}
export default AccountInfoPublicKey;