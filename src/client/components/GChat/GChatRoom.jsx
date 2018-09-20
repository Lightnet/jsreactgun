import React from "react";

//import Account from './MainIndexNav.jsx';
import $ from 'jquery';

class GChatRoom extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            chatmessage:'',
            messages:[],
            messagelist:[],
            data: [{name: 'bob'}, {name: 'chris'}],
            chatroom:null,
            chatboxheight:130,
            chatmessageheight:150
        }
        this.Style_MessageBox = {
            //'background-color':'#aaa',
            'overflowY':'scroll',
        }

        this.setupChatRoom();
    }

    componentDidMount(){
        console.log("mount!");
        let $win = $(window);
        let chatboxheight = this.state.chatboxheight;
        let chatmessageheight = this.state.chatmessageheight;

        $("#chatmessagebox").height($win.height() - this.state.chatboxheight);
        $("#messagebox").height($win.height() - this.state.chatmessageheight);

        //console.log(chatboxheight);
        $("#chatmessagebox").height($win.height() - chatboxheight);
        $win.on('resize',function(){
            $("#chatmessagebox").height($win.height() - chatboxheight);
        });
        
        $win.on('resize',function(){
            $("#messagebox").height($win.height() - chatmessageheight);
        });
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

                let element = document.getElementById("messagebox");
                element.scrollTop = element.scrollHeight;

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
        //e.preventDefault();
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
                 <div id="chatmessagebox">
                    Messages
                    <div id="messagebox" style={this.Style_MessageBox}>
                    <div>
                    {this.state.messages.map(d => <li key={d.id}>{d.message}</li>)}
                    </div>
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