import React from "react";

//import Account from './MainIndexNav.jsx';

class AccountProfile extends React.Component {

    constructor(props) {
        super(props);
        //let user = this.$gun.user();
        this.state = {
            alias:'',
            born:'',
            born:'',
            born:'',

            //publickey:user.is.pub,
        }
    }

    handleChangeAlias(event) {
        this.setState({alias: event.target.value});
    }
    handleChangeBorn(event) {
        this.setState({born: event.target.value});
    }

    handleChangeEducation(event) {
        this.setState({education: event.target.value});
    }

    handleChangeSkills(event) {
        this.setState({skills: event.target.value});
    }

    render() {
        return (
            <div id="profile">
                Profile: (Press Enter to update profile.)
                <table>
                    <tbody>
                    <tr>
                        <td>Alias</td>
                        <td><input value={this.state.alias} onChange={this.handleChangeAlias.bind(this)} /> <button>+</button></td>
                    </tr>
                    <tr>
                        <td>Born</td>
                        <td><input value={this.state.born} onChange={this.handleChangeBorn.bind(this)} /> <button>+</button></td>
                    </tr>
                    <tr>
                        <td>Education</td>
                        <td><input value={this.state.education} onChange={this.handleChangeEducation.bind(this)} /> <button>+</button></td>
                    </tr>
                    <tr>
                        <td>Skills</td>
                        <td><input value={this.state.skills} onChange={this.handleChangeSkills.bind(this)} /> <button>+</button></td>
                    </tr>
                    
                    </tbody>
                </table>
        </div>
        );
    }
}
/*

                    
                    
*/
export default AccountProfile;