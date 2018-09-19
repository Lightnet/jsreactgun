import React from "react";

//import Account from './MainIndexNav.jsx';

class GToDoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toDoList:[],
            toDoListInput:'',
        };

        this.styleInputHide = {
            "visibility":"hidden"
        }
    }

    componentDidMount(){
        let user = this.$gun.user();
        //let gun = this.$gun;
        let gun_todolist = this.gun_todolist = user.get('todolist');
        let self = this;
		gun_todolist.map().once(function(data, id){
			if ((data == null)||(data == 'null'))
				return;
			self.state.toDoList.push({
				id: id,
				text: data.text,
				bedit: false,
            });
            self.setState({toDoList:self.state.toDoList});
      	});
    }

    //input handler
    handleChangeToDoListInput(event) {
        this.setState({toDoListInput: event.target.value});
    }

    _handleKeyPressToDoList(e) {
        //e.preventDefault();
        if (e.key === 'Enter') {
            console.log('do validate');
            console.log(this.state.toDoListInput);
            let toDoListInput = this.state.toDoListInput;
            //let user = this.$gun.user();
            let trimmedText = toDoListInput.trim();
            if (trimmedText) {
				//this.todos.push({
					//id: nextTodoId++,
					//text: trimmedText
				//})
				this.gun_todolist.set({
					text:trimmedText,
					//bedit:false
				});
				//newTodoText = ''
			}
        }
    }
    editchange(id){
        console.log("id",id);
        console.log(document.getElementById(id+'label'));
        document.getElementById(id+'label').style.visibility = "hidden";
        document.getElementById(id+'input').style.visibility = "visible";

    }

    removeToDoList(idToRemove){
        console.log("remove?",idToRemove);
        var user = this.$gun.user();
        user.get('todolist').get(idToRemove).put('null');
        this.state.toDoList = this.state.toDoList.filter(todo => {
            return todo.id !== idToRemove
        });
        this.setState({toDoList:this.state.toDoList});
    }

    handleInputChange(event,id) {
        const target = event.target;
        //id = target.value;
        console.log("???");
        console.log(target.value);
        for(var item in this.state.toDoList){
            console.log(this.state.toDoList[item]);
            if(this.state.toDoList[item].id  == id){
                this.state.toDoList[item].text = target.value;
                this.setState({toDoList:this.state.toDoList});
                break;
            }
        }
    }

    _handleKeyPressInput(event,id) {
        if (event.key === 'Enter') {
            console.log("enter???");
            document.getElementById(id+'label').style.visibility = "visible";
            document.getElementById(id+'input').style.visibility = "hidden";
            const target = event.target;
            console.log(target.value);
            let isempty = target.value;
            if(!isempty){
                console.log('empty!');
                return;
            }

            let user = this.$gun.user();

            user.get('todolist').get(id).put({text:target.value},function(ack){
				//console.log(ack);
			});

        }
    }

    render() {
        return (
            <div>
                <label> ToDoList </label>
                <br/>
                <input 
                    value={this.state.toDoListInput}
                    onChange={this.handleChangeToDoListInput.bind(this)}
                    onKeyPress={this._handleKeyPressToDoList.bind(this)}
                    />

                <ul>
                {this.state.toDoList.map(d => <li id={d.id} key={d.id}><label id={d.id+'label'}> {d.text} </label>
                                                    <input id={d.id+'input'} value={d.text} onChange={(e)=>{this.handleInputChange(e,d.id)}} style={this.styleInputHide} onKeyPress={(e)=>{this._handleKeyPressInput(e,d.id)}} />  
                                                    <button onClick={()=>this.editchange(d.id)}>Edit</button> 
                                                    <button onClick={()=>this.removeToDoList(d.id)}>Delete</button> 
                                                </li>)}
                </ul>

            </div>
        );
    }

}
export default GToDoList;