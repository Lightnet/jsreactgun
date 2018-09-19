import React from "react";


class MainIndexNav extends React.Component {

    constructor(props) {
        super(props);
    }

    clickSelectTab(key){
        //console.log(key);
        this.props.onClick(key);
        //this.setState({blogin: true});
    }
    
    render() {
        return (
            <div>
                <a href="#" onClick={()=>this.clickSelectTab('home')}> Home </a>
                <a href="#" onClick={()=>this.clickSelectTab('account')}> Account </a>
                <a href="#" onClick={()=>this.clickSelectTab('message')}> Message </a>
                <a href="#" onClick={()=>this.clickSelectTab('chat')}> Chat </a>
                <a href="#" onClick={()=>this.clickSelectTab('todolist')}> To Do List </a>
                <a href="#" onClick={()=>this.clickSelectTab('logout')}> Logout </a>
            </div>
        );
    }
}
export default MainIndexNav;