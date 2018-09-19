import React from "react";

//import Account from './MainIndexNav.jsx';

class AliasProfileSearch extends React.Component {
    constructor(props) {
        super(props);
        let user = this.$gun.user();

        this.state = {
            alias:'',
            publickey:'xxx',
            aliaskey:'xxx',
            born:'',
            education:'',
            skills:'',
        }
    }

    handleChangePublicKey(event) {
        this.setState({publickey: event.target.value});
    }

    handleChangeAliasKey(event) {
        this.setState({aliaskey: event.target.value});
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
            <div>
        Alias Public Key Search
                <table>
                    <tbody>
                        <tr>
                            <td>Public Key</td>
                            <td><input value={this.state.publickey} onChange={this.handleChangePublicKey.bind(this)}></input></td>
                        </tr>
                        <tr>
                            <td>Identity</td>
                            <td><input value={this.state.aliaskey} onChange={this.handleChangeAliasKey.bind(this)}></input></td>
                        </tr>
                        <tr>
                            <td>Alias</td>
                            <td><input value={this.state.alias} onChange={this.handleChangeAlias.bind(this)}></input></td>
                        </tr>
                        <tr>
                            <td>Born</td>
                            <td><input value={this.state.born} onChange={this.handleChangeBorn.bind(this)}></input></td>
                        </tr>
                        <tr>
                            <td>Education</td>
                            <td><input value={this.state.education} onChange={this.handleChangeEducation.bind(this)}></input></td>
                        </tr>
                        <tr>
                            <td>Skills</td>
                            <td><input value={this.state.skills} onChange={this.handleChangeSkills.bind(this)}></input></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
export default AliasProfileSearch;