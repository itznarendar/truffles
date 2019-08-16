import React, { Component } from 'react';
import io from 'socket.io-client';
import  {USER_CONNECTED, LOGOUT,VERIFY_USER } from '../../Events'
import ChatContainer from './ChatContainer'
import LoginForm from './LoginForm'
const socketUrl = "http://localhost:3231"
export default class Layout extends Component {
	
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	socket:null,
	  	user:'null',error:''
	  };
    }
    componentWillMount() {
		this.initSocket()
	}
	setUser = ({user, isUser})=>{
		console.log(user,isUser);
		console.log(user);
if(isUser){
	this.setError("User name taken")
}else{
	this.setError("")
	const { socket } = this.state
	
		socket.emit(USER_CONNECTED, user);
		
		this.setState({user})

}
}
setError = (error)=>{
	this.setState({error})
}

    initSocket = ()=>{
		const socket = io(socketUrl)

		socket.on('connect', ()=>{
			console.log("Connected");
		})
		const { nickname } = localStorage.getItem('username')
		const { user } = this.props
		console.log(nickname+"   "+user)
		if(user!==null)
		{
			console.log(user)
			socket.emit(VERIFY_USER, user, this.setUser)}
		this.setState({socket})
    }
/*     setUser = (user)=>{
		const { socket } = this.state
		socket.emit(USER_CONNECTED, user);
		this.setState({user})
    } */
    logout = (user)=>{
		const { socket } = this.state
		socket.emit(LOGOUT, user);
		this.setState({user:null})
	}
	render() {
		const { title } = this.props
		const { socket, user } = this.state
	console.log("socket"+socket+"user   "+user)
		return (
			<div className="chat-con">
            
		{/* 	/* 		!user ?	
					<LoginForm socket={socket} setUser={this.setUser} />
					: */ }
					<ChatContainer socket={socket} user={user} logout={this.logout}/>
				
			</div>
		);
	}
}