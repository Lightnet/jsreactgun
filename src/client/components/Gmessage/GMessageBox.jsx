import React from "react";

class BasicReact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            statussearch:'Normal',
            chatmessage:"",
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
                            <input />
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