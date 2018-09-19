import React from "react";


class MainIndexNav extends React.Component {

    constructor(props) {
        super(props);
        //style
        this.divStyleLink = {
            display:'inline-block',
            color: 'blue',
            padding: '8px',
        };
    }

    clickSelectTab(key){
        //console.log(key);
        this.props.onClick(key);
        //this.setState({blogin: true});
    }
    
    render() {
        return (
            <div>
                <a href="#" style={this.divStyleLink} onClick={()=>this.clickSelectTab('home')}>Home</a>
                <a href="#" style={this.divStyleLink} onClick={()=>this.clickSelectTab('account')}>Account</a>
                <a href="#" style={this.divStyleLink} onClick={()=>this.clickSelectTab('message')}>Message</a>
                <a href="#" style={this.divStyleLink} onClick={()=>this.clickSelectTab('chat')}>Chat</a>
                <a href="#" style={this.divStyleLink} onClick={()=>this.clickSelectTab('todolist')}>To Do List</a>
                <a href="#" style={this.divStyleLink} onClick={()=>this.clickSelectTab('logout')}> Logout</a>
            </div>
        );
    }
}
export default MainIndexNav;