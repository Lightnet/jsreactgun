import React from "react";

//import Account from './MainIndexNav.jsx';

class Access extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            access:'signin',//status for render
            alias:'guest',//input variable
            passphrase:'guest',//input variable
            aliaskooup:'guest',//input variable
            question1:'test',//input variable
            question2:'test',//input variable
            hint:'',//input variable
        }
    }
    //input handler
    handleChangealias(event) {
        this.setState({alias: event.target.value});
    }
    //input handler
    handlelookalias(event) {
        this.setState({aliaskooup: event.target.value});
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

    clickRecover(){

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