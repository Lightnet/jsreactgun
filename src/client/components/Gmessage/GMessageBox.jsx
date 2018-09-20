import React from "react";
import $ from 'jquery';
import { runInThisContext } from "vm";

class BasicReact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            statussearch:'Normal',
            bfound:false,
            bdisplaycontact:true,
            publickey:'',
            alias:'',
            contacts:[],
            chatboxheight:150,
            chatmessageheight:150,
            chatmessage:"",
            messages:[]
        };

        this.Style_MessageBox = {
            //'background-color':'#aaa',
            'overflowY':'scroll',
        }
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
        this.UpdateContactList();
    }

    UpdateContactList(){
        let self = this;
        let user = this.$gun.user();
        self.state.contacts = [];
        self.setState({contacts:self.state.contacts});

        user.get('contact').once().map().once((data,id)=>{
            //console.log(data);
            if(!data.alias)//check for name to exist
                return;
            //var option = $('#' + id).get(0) || $('<option>').attr('id', id).appendTo('#contacts');//check if option id exist else create.
            if(data){
                if(data == 'null'){
                    //$(option).hide();//hide element
                }
                //console.log('data',data);
                self.state.contacts.push({id:id,alias:data.alias,pub:data.pub});
                self.setState({contacts:self.state.contacts});
                //console.log({id:id,alias:data.alias,pub:data.pub});
                //$(option).text(data.name);//set text
            } else {
                //$(option).hide();//hide element
            }
        });
    }
    async selectcontact(event){
        console.log("event");
        console.log(event);

        console.log(event.target.value);
        this.setState({publickey:event.target.value});

        let publickey;
        publickey = event.target.value;
        let to = this.$gun.user(publickey);
        let who = await to.get('alias').then();
        if(!who){
            this.setState({statussearch:'No Alias!'});
            this.setState({bfound:false});
            return;
        }else{
            this.setState({statussearch:'Found! ' + who});
            
            this.setState({publickey:publickey});
            this.setState({alias:who});
            this.setState({bfound:true});

            this.viewprivatemessages();
        }
        //console.log(this.selectitem);
        //this.publickey = this.selectitem;
        //this.checkalias();
    }

    addcontact(){
        if (this.state.bfound == false)
            return;
        let user = this.$gun.user();
        user.get('contact').get(this.state.alias).put({alias:this.state.alias,pub:this.state.publickey});
        //this.publickey = '';
        console.log("Add Contact");
        this.UpdateContactList();
    }

    removecontact(){
        if (this.state.bfound == false)
            return;
        let user = this.$gun.user();
        user.get('contact').get(this.state.alias).put('null');//null contact list match id
        console.log("removecontact");
        this.UpdateContactList();
    }

    async sendprivatemessage(){
        let user = this.$gun.user();
        let gun = this.$gun;
        //let userprivatemessageid = await user.get('privatemessage').get('key').then();//create private message table incase of spam
        //create it
        if(!user.is){ return }//check if user exist
        let pub = (this.state.publickey || '').trim();
        let message = (this.state.chatmessage || '').trim();
        if(!message){ //check if not message empty
            this.setState({chatmessage:''});
            return;
        }
        if(!pub) return;//check if not id empty
        let to = gun.user(pub);//get alias
        let who = await to.then() || {};//get alias data
        if(!who.alias){
            //console.log("No Alias!");
            return;
        }
        //console.log(who);
        let sec = await Gun.SEA.secret(who.epub, user.pair()); // Diffie-Hellman
        let enc = await Gun.SEA.encrypt(message, sec); //encrypt message
        //console.log(to);
        user.get('messages').get(pub).set(enc);
        //console.log("send");
        this.setState({chatmessage:''});

    }

    async viewprivatemessages(){
        let user = this.$gun.user();
        let gun = this.$gun;
        this.state.messages = [];
        this.setState({messages:this.state.messages});
        //let userprivatemessageid = await user.get('privatemessage').get('key').then();//create private message table incase of spam
        //create it
        if(!user.is){ return }//check if user exist
        let pub = (this.state.publickey || '').trim();
        //let message = (this.state.chatmessage || '').trim();
        //if(!message) return;//check if not message empty
        if(!pub) return;//check if not id empty
        let to = gun.user(pub);//get alias
        let who = await to.then() || {};//get alias data
        if(!who.alias){
            //console.log("No Alias!");
            return;
        }
        this.UI.dec = await Gun.SEA.secret(who.epub, user.pair()); // Diffie-Hellman
        //console.log(user);
        //this.UI.alias = user.is.alias;
        user.get('messages').get(pub).map().once((data,id)=>{
            this.UI(data,id,user.is.alias)
        });
        //console.log(to);
        //this.UI.alias = who.alias;
        to.get('messages').get(user.pair().pub).map().once((data,id)=>{
            this.UI(data,id,who.alias)
        });
        console.log("init messsages");
    }

    async UI(say, id, alias){
        //console.log("test????");
        say = await Gun.SEA.decrypt(say, this.UI.dec);
        //var li = $('#' + id).get(0) || $('<li>').attr('id', id).appendTo('ul');
        //$(li).text(say);
        //console.log(say);
        //console.log(id);
        this.state.messages.push({id:id,alias:alias,message:say});
        this.setState({messages:this.state.messages});
        console.log("msg...");
    }

    togglecontact(){
        let bdisplaycontact = !this.state.bdisplaycontact;
        this.setState({bdisplaycontact:bdisplaycontact});
        //console.log(bdisplaycontact);
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
            this.setState({bfound:false});
            return;
        }else{
            this.setState({statussearch:'Found! ' + who});
            
            this.setState({publickey:publickey});
            this.setState({alias:who});
            this.setState({bfound:true});
            this.viewprivatemessages();
        }
    }

    DrawContact(){
        return <span>
                <select onChange={this.selectcontact.bind(this)}>
                    <option> None </option>
                    {this.state.contacts.map(d => <option key={d.id} value={d.pub}  >{d.alias}</option>)}
                </select>
                <label>Public Key:</label>
                <input value={this.state.publickey} onChange={this.handleSearchPublicKey.bind(this)}  />
                <button onClick={this.addcontact.bind(this)}>Add</button>
                <button onClick={this.removecontact.bind(this)}>Remove</button>
            </span>;
    }

    _handleKeyPressChatMessage(e) {
        if (e.key === 'Enter') {
            console.log("enter key");
            this.sendprivatemessage();
        }
    }

    render() {
        return (
            <div>
                <div id="chatmessagebox">
                    <div id="messagebox" style={this.Style_MessageBox}>
                        {this.state.messages.map(d => <div key={d.id} value={d.id}> {d.alias} | > |  {d.message}</div>)}
                    </div>
                </div>
                <div>
                    <button onClick={this.togglecontact.bind(this)}>Contact</button>
                        {this.state.bdisplaycontact ? ( this.DrawContact() ) : (<span></span>)}
                    <label>Status:{this.state.statussearch}</label>
                    <br/>
                    Content:
                    <textarea 
                        value={this.state.chatmessage} 
                        onChange={this.handleChangeChatMessage.bind(this)}
                        onKeyPress={this._handleKeyPressChatMessage.bind(this)}
                        > 
                        </textarea> 
                    <button onClick={this.sendprivatemessage.bind(this)}>Send</button>
                </div>
            </div>
        );
    }
}
export default BasicReact;