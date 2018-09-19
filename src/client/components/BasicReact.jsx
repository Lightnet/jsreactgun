import React from "react";

//https://reactjs.org/docs/react-component.html

//import Account from './MainIndexNav.jsx';

class BasicReact extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        console.log("mount!?");
    }

    componentWillUnmount(){

    }
    


    render() {
        return (
            <label>Account</label>
        );
    }
}
export default BasicReact;