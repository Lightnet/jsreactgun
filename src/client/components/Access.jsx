import React from "react";

class Access extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            access:'signin',//status for render
            alias:'',//input variable
            passphrase:'',//input variable
            aliaskooup:'',//input variable
            lookpublickey:'',
            question1:'',//input variable
            question2:'',//input variable
            hint:'',//input variable
        }
    }

    //input handler
    handleChangealias(event) {
        this.setState({alias: event.target.value});
    }
    //input handler
    async handlelookalias(event) {
        this.setState({aliaskooup: event.target.value});

        let gun = this.$gun;
        let alias = await gun.get('~@'+event.target.value).then(); //broken or remove?
        console.log(alias);
        if(!alias){
            //this.statusdisplay = 'Not Found!';
            console.log('Not Found!');
            return;
        }else{
            //this.statusdisplay = 'Found!';
            console.log('Found!');
        }
        let publickey = '';
        for(var obj in alias){
            console.log(obj);
            publickey = obj;
        }
        publickey = publickey.substring(1,publickey.length);//remove ~ string begin
        this.setState({lookpublickey:publickey});
        //this.publickey = publickey;

    }
    //input handler
    handleChangePassphrase(event) {
        this.setState({passphrase: event.target.value});
    }
    //input handler
    handleChangequestion1(event) {
        this.setState({question1: event.target.value});
    }
    //input handler
    handleChangequestion2(event) {
        this.setState({question2: event.target.value});
    }
    //input handler
    handleChangeHint(event) {
        this.setState({hint: event.target.value});
    }

    async clickRecover(){
        let gun = this.$gun;
        //let user = this.$gun.user();
        let alias = (this.state.aliaskooup || '').trim(); //get alias input
        let q1 =  (this.state.question1 || '').trim(); //get q1 input
        let q2 = (this.state.question2 || '').trim(); //get q2 input
        //console.log('get forgot hint');
        if(!alias|| !q1 || !q2 ){
            console.log('Empty!');
            return;
        }
        //console.log(alias);
        //Make sure the alias and public key are working
        alias = await gun.get('~@'+alias).then();//look for hash id
        let publickey = '';
        for(var obj in alias){
            //console.log(obj);
            publickey = obj;
        }
        publickey = publickey.substring(1,publickey.length);
        if(!publickey){
            return;
        }
        //let publickey = this.publickey;
        let to = this.$gun.user(publickey);
        let who = await to.get('alias').then();
        //console.log(who);
        if(!who){
            //console.log(who);
            console.log('Not Alias!');
            return;
        }
        //let hint = await gun.get('alias/'+alias).map().get('hint').then();//get hash hint string
        let hint = hint = await to.get('hint').then();
        let dec = await Gun.SEA.work(q1,q2);//get q1 and q2 string to key hash
        hint = await Gun.SEA.decrypt(hint,dec);//get hint and key decrypt message
        //console.log('hint',hint);
        if(hint !=null){//check if hint is string or null
            //$('#hint').val(hint);//get hint and set input value
            hint = hint;
        }else{
            //$('#hint').val('Fail Decrypt!');//if null set input to message user.
            hint = 'Fail Decrypt!';
        }
        this.setState({hint:hint});
        console.log("end checked...");
    }



    //render signin html
    DrawSignIn(){
        return (<table>
            <tbody>
                <tr>
                    <td>
                        Alias:
                    </td>
                    <td>
                        <input value={this.state.alias} onChange={this.handleChangealias.bind(this)} />
                    </td>
                </tr><tr>
                    <td>
                        Passphrase:
                    </td>
                    <td>
                        <input value={this.state.passphrase} onChange={this.handleChangePassphrase.bind(this)} />
                    </td>
                </tr><tr>
                    <td>
                    </td>
                    <td>
                        <button onClick={()=>this.clickSignin()}>Login</button>
                        <button onClick={()=>this.clickSignup()}>Sign up</button>
                        <button onClick={()=>this.clickForgot()}>Forgot</button>
                    </td>
                </tr>
            </tbody>
        </table>);
    }
    //render signup html
    DrawSignUp(){
        return (<table>
            <tbody>
                <tr>
                    <td>
                        Alias:
                    </td>
                    <td>
                        <input value={this.state.alias} onChange={this.handleChangealias.bind(this)} />
                    </td>
                </tr><tr>
                    <td>
                        Passphrase:
                    </td>
                    <td>
                        <input value={this.state.passphrase} onChange={this.handleChangePassphrase.bind(this)} />
                    </td>
                </tr><tr>
                    <td>
                    </td>
                    <td>
                        <button onClick={()=>this.clickRegister()}>Register</button>
                        <button onClick={()=>this.clickBackLogin()}>Cancel</button>
                    </td>
                </tr>
            </tbody>
        </table>);
    }
    //render forgot html
    DrawForgot(){
        return (<div><table>
            <tbody>
                <tr>
                    <td>
                        Alias:
                    </td>
                    <td>
                        <input value={this.state.aliaskooup} onChange={this.handlelookalias.bind(this)} />
                    </td>
                </tr><tr>
                    <td>
                        Question 1:
                    </td>
                    <td>
                        <input value={this.state.question1} onChange={this.handleChangequestion1.bind(this)} />
                    </td>
                </tr><tr>
                    <td>
                        Question 2:
                    </td>
                    <td>
                        <input value={this.state.question2} onChange={this.handleChangequestion2.bind(this)} />
                    </td>
                </tr><tr>
                    <td>
                        Hint:
                    </td>
                    <td>
                        <input value={this.state.hint} onChange={this.handleChangeHint.bind(this)} />
                    </td>
                </tr><tr>
                    <td>
                    </td>
                    <td>
                        <button onClick={()=>this.clickRecover()}>Recover</button>
                        <button onClick={()=>this.clickBackLogin()}>Cancel</button>
                    </td>
                </tr>
            </tbody>
        </table></div>);
    }

    //user login
    clickSignin(){
        //console.log("clickSignin...");
        //console.log(this.$gun);
        //console.log(this.state.alias);
        //console.log(this.state.passphrase);
        //this.props.onClick('key');
        let self = this;
        let user = this.$gun.user();
        user.auth(this.state.alias, this.state.passphrase,(ack)=>{
            //console.log(ack);
            if(ack.err){
                console.log("fail!");
            }else{
                console.log("Authorized!");
                self.props.onClick('key');
            }
        });
    }

    //register user
    clickRegister(){
        //console.log(this.state.alias);
        //console.log(this.state.passphrase);
        let user = this.$gun.user();
        user.create(this.state.alias, this.state.passphrase, function(ack){
            //console.log(ack);
            if(ack.err){
                console.log("fail!");
                //self.msg = "Register Alias Fail!";
            }
            if(ack.pub){
                console.log("created!", ack.pub);
                //self.msg = "Alias Created!";
                //self.bregister = false;
            }
        });
    }

    

    //go to sign up
    clickSignup(){
        console.log("clickSignup...");
        this.setState({access:'signup'});
    }
    //go to forgot
    clickForgot(){
        console.log("clickForgot...");
        this.setState({access:'forgot'});
    }
    //go back to login
    clickBackLogin(){
        console.log("clickBackLogin...");
        this.setState({access:'signin'});
    }

    //render html 
    render() {
        let access = this.state.access;
        let accessElement;
        if (access == 'signin'){
            accessElement = this.DrawSignIn();
        }
        if (access == 'signup'){
            accessElement = this.DrawSignUp();
        }
        if (access == 'forgot'){
            accessElement = this.DrawForgot();
        }
        return accessElement;
    }
}
export default Access;