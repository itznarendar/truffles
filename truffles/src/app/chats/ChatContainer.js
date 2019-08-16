import React, { Component } from 'react';
import SideBar from '../sidebar/SideBar';
import ChatHeading from './ChatHeading';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { COMMUNITY_CHAT, MESSAGE_SENT, MESSAGE_RECIEVED, TYPING,PRIVATE_MESSAGE,USER_CONNECTED, USER_DISCONNECTED} from '../../Events'
import { values } from 'lodash'
export default class ChatContainer extends Component {
    constructor(props) {
        super(props);	
      
        this.state = {
            chats:[],
			activeChat:null,
			users:[{name:"a", id:1},{name:"b", id:2},{name:"c", id:3}]
		};
		const { socket } = this.props
		console.log(socket)
		
        this.initSocket(socket);
      }
      
	componentDidMount() {
      
	
	}
	componentWillUnmount() {
        const { socket } = this.props
		socket.off(PRIVATE_MESSAGE)
		socket.off(USER_CONNECTED)
		socket.off(USER_DISCONNECTED)
		socket.off(COMMUNITY_CHAT)
	}
    initSocket(socket){
	
		const { user } = this.props
		console.log(user)
       // socket.emit(COMMUNITY_CHAT, this.resetChat)
        socket.on(PRIVATE_MESSAGE, this.addChat)
        socket.on("connect",()=>{
            socket.emit(COMMUNITY_CHAT, this.resetChat)
		})
		socket.on(USER_CONNECTED,(users)=>{
			console.log("USER_CONNECTED "+users)
			this.setState({users:values(users)})
		})
		socket.on(USER_DISCONNECTED,(users)=>{
			this.setState({users:values(users)})
		})
       //socket.emit(PRIVATE_MESSAGE, {reciever:"naren",sender:user.name})
    }
	/*
	*	Reset the chat back to only the chat passed in.
	* 	@param chat {Chat}
	*/
	resetChat = (chat)=>{
		return this.addChat(chat, true)
    }
    sendOpenPrivateMessage=(reciever)=>{
		const { socket,user } = this.props
		const { activeChat } = this.state
        socket.emit(PRIVATE_MESSAGE,{reciever,sender:user.name,activeChat})
    }
    addChat = (chat, reset=false)=>{
		console.log("waiting for message")
        const { socket } = this.props
		const { chats } = this.state
        console.log("waiting for message"+chats)
		const newChats = reset ? [chat] : [...chats, chat]
		this.setState({chats:newChats,activeChat:reset?chat:this.state.activeChat})
        const messageEvent = `${MESSAGE_RECIEVED}-${chat.id}`
		const typingEvent = `${TYPING}-${chat.id}`

		socket.on(typingEvent, this.updateTypingInChat(chat.id))
		socket.on(messageEvent, this.addMessageToChat(chat.id));
    }
    	/*
	* 	Returns a function that will 
	*	adds message to chat with the chatId passed in. 
	*
	* 	@param chatId {number}
	*/
	addMessageToChat = (chatId)=>{
        console.log(" addMessageToChat waiting for messag")
		return message => {
			const { chats } = this.state
			let newChats = chats.map((chat)=>{
				if(chat.id === chatId)
                    chat.messages.push(message)
                    console.log(chat)
				return chat
			})

			this.setState({chats:newChats})
		}
    }
    updateTypingInChat = (chatId) =>{
		return ({isTyping, user})=>{
			if(user !== this.props.user.name){

				const { chats } = this.state

				let newChats = chats.map((chat)=>{
					if(chat.id === chatId){
						if(isTyping && !chat.typingUsers.includes(user)){
							chat.typingUsers.push(user)
						}else if(!isTyping && chat.typingUsers.includes(user)){
							chat.typingUsers = chat.typingUsers.filter(u => u !== user)
						}
					}
					return chat
				})
				this.setState({chats:newChats})
			}
		}
	}
      setActiveChat = (activeChat)=>{
        this.setState({activeChat})
    }
    /*
	*	Adds a message to the specified chat
	*	@param chatId {number}  The id of the chat to be added to.
	*	@param message {string} The message to be added to the chat.
	*/
	sendMessage = (chatId, message)=>{
		const { socket } = this.props
		socket.emit(MESSAGE_SENT, {chatId, message} )
	}

	/*
	*	Sends typing status to server.
	*	chatId {number} the id of the chat being typed in.
	*	typing {boolean} If the user is typing still or not.
	*/
	sendTyping = (chatId, isTyping)=>{
		const { socket } = this.props
		socket.emit(TYPING, {chatId, isTyping})
	}
    render() {
        
        const { user, logout } = this.props
		const { chats, activeChat,users } = this.state
		const userss=this.state.users
		console.log(userss)

		return (
			<div>
          <SideBar onPrivateMessage={this.sendOpenPrivateMessage}
					logout={logout}
					chats={this.state.chats}
					user={user}
					users={userss}
					activeChat={this.state.activeChat}
					setActiveChat={this.setActiveChat}
					/>
                    <div className="chat-room-container">
					{
						this.state.activeChat !== null ? (

							<div className="chat-room">
								<ChatHeading name={this.state.activeChat.name} />
								<Messages 
									messages={this.state.activeChat.messages}
									user={user}
									typingUsers={this.state.activeChat.typingUsers}
									/>
								<MessageInput 
									sendMessage={
										(message)=>{
											this.sendMessage(this.state.activeChat.id, message)
										}
									}
									sendTyping={
										(isTyping)=>{
											this.sendTyping(this.state.activeChat.id, isTyping)
										}
									}
									/>

							</div>
						):
						<div className="chat-room choose">
							<h3>Choose a chat!</h3>
						</div>
					}
				</div>

			</div>
	
			
		);
	}
}