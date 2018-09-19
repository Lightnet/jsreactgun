import React from "react";

//import Account from './MainIndexNav.jsx';

class AccountPassphraseHint extends React.Component {
    constructor(props) {
        super(props);
        //let user = this.$gun.user();

        this.state = {
            question1:'',
            question2:'',
            hint:'',
        }
    }

    handleChangeQuestion1(event) {
        this.setState({question1: event.target.value});
    }

    handleChangeQuestion2(event) {
        this.setState({question2: event.target.value});
    }

    handleChangeHint(event) {
        this.setState({question1: event.target.value});
    }

    render() {
        return (
            <div>
                Change Passphrase:
                <table>
                    <tbody>
                        <tr>
                            <td>Question 1:</td>
                            <td><input value={this.state.question1} onChange={this.handleChangeQuestion1.bind(this)} /></td>
                        </tr>
                        <tr>
                            <td>Question 2</td>
                            <td><input value={this.state.question2} onChange={this.handleChangeQuestion2.bind(this)} /></td>
                        </tr>
                        <tr>
                            <td>Hint </td>
                            <td><input value={this.state.hint} onChange={this.handleChangeHint.bind(this)} /></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><button>Apply</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
export default AccountPassphraseHint;