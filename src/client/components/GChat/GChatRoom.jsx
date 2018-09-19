import React from "react";

//import Account from './MainIndexNav.jsx';

class GChatRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chatmessage:'',
            messages:[],
            messagelist:[],
            data: [{name: 'bob'}, {name: 'chris'}],
            chatroom:null,
        }
        this.setupChatRoom();
    }

    setupChatRoom(){
        console.log("setup");
        let gun = this.$gun;
        this.chatroom = this.state.chatroom = gun.get('chatroom');
        let self = this;

        this.chatroom.time((data, key, time)=>{//listen setup
            gun.get(data['#']).once((d,id)=>{
                console.log("message...");
                //console.log(id);
                //console.log(d);
                //console.log(d.message);
                self.state.messages.push({id:id,alias:d.alias,message:d.message});

                this.setState({messages: self.state.messages});//need to be update state to get list render

                //self.state.messagelist = self.state.messages.map((data) =>
                    //<div>{data.message}</div>
                //);
            });
        },20);//number display when loaded and time is trigger here if push.
    }

    //input handler
    handleChangeChatMessage(event) {
        this.setState({chatmessage: event.target.value});
        //console.log(event)
    }

    _handleKeyPressChatMessage(e) {
        if (e.key === 'Enter') {
            console.log('do validate');
            console.log(this.state.chatmessage);
            let chatmessage = this.state.chatmessage;

            let user = this.$gun.user();
            this.state.chatroom.time({alias:user.is.alias,message:chatmessage});
        }
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <div>
                    Messages
                    <div>
                    {this.state.messages.map(d => <li key={d.id}>{d.message}</li>)}
                    </div>
                </div>
                <div> 
                    <input 
                        value={this.state.chatmessage} 
                        onChange={this.handleChangeChatMessage.bind(this)} 
                        onKeyPress={this._handleKeyPressChatMessage.bind(this)}
                    ></input>
                </div>
            </div>
        );
    }
}
export default GChatRoom;