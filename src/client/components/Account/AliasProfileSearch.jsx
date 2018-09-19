import React from "react";

class AliasProfileSearch extends React.Component {
    
    constructor(props) {
        super(props);
        let user = this.$gun.user();

        this.state = {
            publickey:'',
            aliaskey:'',
            alias:'',
            born:'',
            education:'',
            skills:'',
        }
    }

    async handleChangePublicKey(event) {
        this.setState({publickey: event.target.value});
        let publickey = event.target.value;
        if(!publickey)
            return;
        console.log(publickey);
        let to = this.$gun.user(publickey);
        //let user = this.$gun.user();
        let who = await to.get('alias').then();
        console.log(who);
        if (!who){
            this.setState({aliaskey:''});
            this.setState({alias:''});
            this.setState({born:''});
            this.setState({education:''});
            this.setState({skills:''});
            return;
        }
        this.setState({aliaskey:who});
        this.searchprofile();
    }
    async searchprofile(){
        let self = this;
        let user = this.$gun.user();
        let find = this.$gun.user(this.state.publickey);
        find.get('profile').on(function(data, key, at, ev){//get map data
            //console.log(data);
            //console.log(key);
            ev.off(); //pervent loops listen add on?
            Gun.node.is(data, async function(v, k){
                //console.log(k);// variable
                //console.log(v);// crypt
                var key = await find.get('trust').get(user.pair().pub).get(k+'profile').then();
                var mix = await Gun.SEA.secret(await find.get('epub').then(), user.pair());
                key = await Gun.SEA.decrypt(key, mix);
                var val = await Gun.SEA.decrypt(v, key);

                if(k == 'alias'){
                    let alias = val || v;
                    self.setState({alias:alias});
                }
                if(k == 'born'){
                    let born = val || v;
                    self.setState({born:born});
                }
                if(k == 'education'){
                    let education = val || v;
                    self.setState({education:education});
                }
                if(k == 'skills'){
                    let skills = val || v;
                    self.setState({skills:skills});
                }
                //console.log(val);
            });
        });
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
                            <td><input value={this.state.aliaskey} onChange={this.handleChangeAliasKey.bind(this)} readOnly></input></td>
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