import React from "react";

class BasicReact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            statussearch:'Normal',
            chatmessage:"",
            publickey:'',
        };

        this.Style_MessageBox = {
            //'background-color':'#aaa',
            'overflowY':'scroll',
        }

    }

    //input handler
    handleChangeChatMessage(event) {
        this.setState({chatmessage: event.target.value});
    }

    async handleSearchPublicKey(event){
        this.setState({publickey:event.target.value});
        console.log("typing...");
        let publickey;
        publickey = event.target.value;
        let to = this.$gun.user(publickey);
        let who = await to.get('alias').then();
        if(!who){
            this.setState({statussearch:'No Alias!'});
            //this.statussearch = 'No Alias!';
            //this.bfound = false;
            return;
        }else{
            this.setState({statussearch:'Found! ' + who});
            //this.statussearch = 'Found! ' + who;
            //this.bfound = true;
            //this.publickey = publickey;
            //this.alias = who;
        }
    }
    
    render() {
        return (
            <div>
                <div id="chatmessagebox">
                    <div id="messagebox" style={this.Style_MessageBox}>

                    </div>
                    <div></div>
                </div>
                <div>
                    <button>Contact</button>
                            <select>
                                <option> None </option>
                                <option> </option>
                            </select>
                            Public Key:
                            <input value={this.state.publickey} onChange={this.handleSearchPublicKey.bind(this)}  />
                            <button>Add</button>
                            <button>Remove</button>
                        
                    <label>Status:{this.state.statussearch}</label>
                    <br />Content:<textarea value={this.state.chatmessage} onChange={this.handleChangeChatMessage.bind(this)}> </textarea> <button>Send</button>
                </div>
            </div>
        );
    }
}
export default BasicReact;