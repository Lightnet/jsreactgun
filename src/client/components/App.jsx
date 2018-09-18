import React from "react";

import MainIndex from './MainIndex.jsx';
import Access from './Access.jsx';
//import {render} from 'react-dom'; //gun render instead of ReactDOM.render

class App extends React.Component {

    constructor(tick) {
        super(tick);
        this.state = {
            name:'guest',
            blogin:false
        }

    }
    //var MainElement = Access;

    handleClick(){
        console.log('this is:', this);
        //this.state.blogin = true;
        this.setState({blogin: true});
    }

    onClick(key){
        console.log(key);
        this.setState({blogin: true});
    }

    render() {
        console.log(this.state.blogin);
        let blogin = this.state.blogin;
        if (blogin == true){
            console.log("main...");
            return (<MainIndex />);
        }else{
            console.log("login...");
            return (
            <div>
            <Access onClick={this.onClick.bind(this)} />
            <button onClick={()=>this.handleClick()}>Test</button>
            </div>
            );
        }
    }
}

export default App;