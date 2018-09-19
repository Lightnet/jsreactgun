import React from "react";
import $ from 'jquery';

class AccountProfile extends React.Component {

    constructor(props) {
        super(props);
        //let user = this.$gun.user();
        this.state = {
            publickeygrant:'',
            aliasgrant:'',
            alias:'',
            born:'',
            education:'',
            skills:'',
            displayDialogGrant:true,
            dialogBoxGrant: {
                'top': '50%',
                'left': '50%',
                'width':'30em',
                'height':'18em',
                'marginTop': '-9em', /*set to a negative number 1/2 of your height*/
                'marginLeft': '-15em', /*set to a negative number 1/2 of your width*/
                'border': '1px solid #ccc',
                'backgroundColor': '#f3f3f3',
                'position':'fixed',
                'visibility': 'hidden',
            },
            dialogBoxAccess: {
                'top': '50%',
                'left': '50%',
                'width':'30em',
                'height':'18em',
                'marginTop': '-9em', /*set to a negative number 1/2 of your height*/
                'marginLeft': '-15em', /*set to a negative number 1/2 of your width*/
                'border': '1px solid #ccc',
                'backgroundColor': '#f3f3f3',
                'position':'fixed',
                'visibility': 'hidden',
            }
        }

        this.getProfileData();
    }

    async getProfileData(){
        let self = this;
        let user = this.$gun.user();
        let find = this.$gun.user();
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
    
    componentDidMount(){
        console.log("mount!?");
    }

    getProfileData(){
        let self = this;
        let user = this.$gun.user();
        let find = this.$gun.user();
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
                    self.state.alias = val || v;
                    self.setState({alias:self.state.alias});
                }
                if(k == 'born'){
                    self.state.born = val || v;
                    self.setState({born:self.state.born});
                }
                if(k == 'education'){
                    self.state.education = val || v;
                    self.setState({education:self.state.education});
                }
                if(k == 'skills'){
                    self.state.skills = val || v;
                    self.setState({skills:self.state.skills});
                }
                //console.log(val);
            });
        });
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

    _handleKeyPressAlias(e) {
        //e.preventDefault();
        if (e.key === 'Enter') {
            //console.log('do validate');
            console.log(this.state.alias);
            let alias = this.state.alias;
            let user = this.$gun.user();
            user.get('profile').get('alias').secret(alias);
        }
    }

    _handleKeyPressBorn(e) {
        //e.preventDefault();
        if (e.key === 'Enter') {
            //console.log('do validate');
            console.log(this.state.born);
            let born = this.state.born;
            let user = this.$gun.user();
            user.get('profile').get('born').secret(born);
        }
    }

    _handleKeyPressEducation(e) {
        //e.preventDefault();
        if (e.key === 'Enter') {
            //console.log('do validate');
            console.log(this.state.education);
            let education = this.state.education;
            let user = this.$gun.user();
            user.get('profile').get('education').secret(education);
        }
    }

    _handleKeyPressSkills(e) {
        //e.preventDefault();
        if (e.key === 'Enter') {
            //console.log('do validate');
            console.log(this.state.skills);
            let skills = this.state.skills;
            let user = this.$gun.user();
            user.get('profile').get('skills').secret(skills);
        }
    }

    openDialogGrant(param){
        //$("#DialogGrant").dialog('open');
        //document.getElementById("keyparam").value = param;
        //console.log(param);
    }

    openDialogPublicKeyGrantAlias(){
        document.getElementById("keyparam").value = 'alias';
        document.getElementById("DialogGrant").style.visibility = "visible";
    }

    openDialogPublicKeyGrantBorn(){
        document.getElementById("keyparam").value = 'born';
        document.getElementById("DialogGrant").style.visibility = "visible";
    }

    openDialogPublicKeyGrantEducation(){
        document.getElementById("keyparam").value = 'education';
        document.getElementById("DialogGrant").style.visibility = "visible";
    }

    openDialogPublicKeyGrantSkills(){
        document.getElementById("keyparam").value = 'skills';
        document.getElementById("DialogGrant").style.visibility = "visible";
    }

    closeDialogPublicKeyGrant(){
        document.getElementById("DialogGrant").style.visibility = "visible";
        console.log("close");
    }

    closeDialogPublicKeyAccess(){
        document.getElementById("DialogGrantAlias").style.visibility = "hidden";
        console.log("close");
    }

    async clickPublicKeyCheck(){
        //document.getElementById("DialogGrant").style.visibility = "hidden";
        console.log("checking...");
        let key = this.state.publickeygrant;
        console.log(key);
        let to = this.$gun.user(key);
        let who = await to.get('alias').then();
        if(!who){
            console.log('No Alias!');
        }else{
            //AliasTag
            //document.getElementById('AliasTag').innerText = who;
            //$("#DialogGrantAlias")['param_1']=param;
            //$("#DialogGrantAlias").dialog('open');
            //this.state.aliasgrant = who
            this.setState({aliasgrant:who});
            document.getElementById("DialogGrant").style.visibility = "hidden";
            document.getElementById("DialogGrantAlias").style.visibility = "visible";
        }
    }

    clickGrantAccess(){
        //document.getElementById("DialogGrantAlias").style.visibility = "hidden";
        //console.log("close");
        console.log("access checking...");
        let key = this.state.publickeygrant;
        //console.log(key);
        let to = this.$gun.user(key);
        let user = this.$gun.user();
        let param = document.getElementById("keyparam").value;
        //console.log(param);
        user.get('profile').get(param).grant(to);
        document.getElementById("DialogGrantAlias").style.visibility = "hidden";
    }

    //input handler
    handleChangePublicKey(event) {
        this.setState({publickeygrant: event.target.value});
    }

    render() {
        return (
            <div id="profile">

                <div id="DialogGrant" title="Alias Grant" style={this.state.dialogBoxGrant}>
                    <strong id="keyparam" value="none" />
                    <center>
                        Alias Public Key:<input value={this.state.publickeygrant} onChange={this.handleChangePublicKey.bind(this)} />
                    </center>
                    <br/>
                    <center>
                        <button onClick={this.clickPublicKeyCheck.bind(this)}>Ok</button>
                        <button onClick={this.closeDialogPublicKeyGrant.bind(this)}>Cancel</button>
                    </center>

                </div>

                <div id="DialogGrantAlias" title="Alias Permission" style={this.state.dialogBoxAccess}>
                    <center>
                        <p>Alias: <label id="AliasTag"> {this.state.aliasgrant} </label></p>
                    </center>
                    <br/>
                    <center>
                        <button onClick={this.clickGrantAccess.bind(this)}>Ok</button>
                        <button onClick={this.closeDialogPublicKeyAccess.bind(this)}>Cancel</button>
                    </center>
                </div>


                Profile: (Press Enter to update profile.)
                <table>
                    <tbody>
                    <tr>
                        <td>Alias</td>
                        <td><input 
                                value={this.state.alias} 
                                onChange={this.handleChangeAlias.bind(this)}
                                onKeyPress={this._handleKeyPressAlias.bind(this)}
                            /> <button onClick={this.openDialogPublicKeyGrantAlias.bind(this)}>+</button></td>
                    </tr>
                    <tr>
                        <td>Born</td>
                        <td><input 
                                value={this.state.born} 
                                onChange={this.handleChangeBorn.bind(this)} 
                                onKeyPress={this._handleKeyPressBorn.bind(this)}
                            /> <button onClick={this.openDialogPublicKeyGrantBorn.bind(this)}>+</button></td>
                    </tr>
                    <tr>
                        <td>Education</td>
                        <td><input 
                                value={this.state.education} 
                                onChange={this.handleChangeEducation.bind(this)} 
                                onKeyPress={this._handleKeyPressEducation.bind(this)}
                            /> <button onClick={this.openDialogPublicKeyGrantEducation.bind(this)}>+</button></td>
                    </tr>
                    <tr>
                        <td>Skills</td>
                        <td><input 
                                value={this.state.skills} 
                                onChange={this.handleChangeSkills.bind(this)} 
                                onKeyPress={this._handleKeyPressSkills.bind(this)}
                            /> <button onClick={this.openDialogPublicKeyGrantSkills.bind(this)}>+</button></td>
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