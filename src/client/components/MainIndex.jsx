import React from "react";

import MainIndexNav from './MainIndexNav.jsx';
import AccountInfoPublicKey from './Account/AccountInfoPublicKey.jsx';

import GHome from './GHome.jsx';
import Account from './Account.jsx';
import GMessage from './GMessage.jsx';
import GChat from './GChat.jsx';
import GToDoList from './GToDoList.jsx';


class MainIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            index:'home',
        }
    }

    clickSelectTab(key){
        console.log(key);
        this.setState({index: key});
    }

    DisplayIndex(Gelement){
        return (
            <div>
                <AccountInfoPublicKey />
                <MainIndexNav onClick={this.clickSelectTab.bind(this)}/>
                <Gelement />
            </div>
        );
    }

    render() {
        let pageindex = this.state.index;
        
        if(pageindex == 'account'){
            return this.DisplayIndex(Account);
        }
        if(pageindex == 'chat'){
            return this.DisplayIndex(GChat);
        }
        if(pageindex == 'message'){
            return this.DisplayIndex(GMessage);
        }
        if(pageindex == 'todolist'){
            return this.DisplayIndex(GToDoList);
        }
        return this.DisplayIndex(GHome);
        
    }
}

export default MainIndex;