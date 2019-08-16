const io=require('./index.js').io;
const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, 
    LOGOUT, COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT,
    TYPING,PRIVATE_MESSAGE  } = require('../Events')   
    const { createUser, createMessage, createChat } = require('../Factories')
    let communityChat = createChat({isCommunity:true})
    let connectedUsers = { }
    
    var names=[]
module.exports=function(socket){
    
	let sendMessageToChatFromUser;

	let sendTypingFromUser;
console.log("socket id ===========>"+socket.id)
socket.on(VERIFY_USER, (nickname, callback)=>{
    
    console.log("nickname" + nickname);
    if(isUser(connectedUsers, nickname)){
        console.log("nickname connectedUsers " + nickname);
        callback({ isUser:true, user:null })
    }else{
        console.log("nickname createUser " + nickname);
        callback({ isUser:false, user:createUser({name:nickname,socketId:socket.id})})
    }
})
socket.on(USER_CONNECTED, (user)=>{
    user.socketId=socket.id
    connectedUsers = addUser(connectedUsers, user)
    socket.user = user
    console.log("sendMessageToChat   connectedUsers  b4 ======="+connectedUsers)
    sendMessageToChatFromUser = sendMessageToChat(user.name)
    console.log("sendMessageToChat    after =======")
   sendTypingFromUser = sendTypingToChat(user.name)

    io.emit(USER_CONNECTED, connectedUsers) 
    console.log(connectedUsers);

})
socket.on(COMMUNITY_CHAT, (callback)=>{
    callback(communityChat)
})
socket.on('disconnect', ()=>{
    if("user" in socket){
        connectedUsers = removeUser(connectedUsers, socket.user.name)

        io.emit(USER_DISCONNECTED, connectedUsers)
        console.log("Disconnect", connectedUsers);
    }
})
socket.on(LOGOUT, ()=>{
    connectedUsers = removeUser(connectedUsers, socket.user.name)
    io.emit(USER_DISCONNECTED, connectedUsers)
    console.log("Disconnect", connectedUsers);

})
socket.on(MESSAGE_SENT, ({chatId, message})=>{
  
    sendMessageToChatFromUser(chatId, message)
})
socket.on(TYPING, ({chatId, isTyping})=>{
   
    sendTypingFromUser(chatId, isTyping)
})
socket.on(PRIVATE_MESSAGE, ({reciever,sender,activeChat })=>{
    console.log(sender+"sendMessageToChat    PRIVATE_MESSAGE make ======="+reciever+"connected users  "+connectedUsers)
    console.log(connectedUsers)
    var name
    var newChat
    if(reciever in connectedUsers ){
        const recievedSocket=connectedUsers[reciever].socketId
        console.log(activeChat+"activeChat =======  activeChat.id "+activeChat.id+" communityChat.id    "+communityChat.id)
        if(activeChat===null||activeChat.id===communityChat.id){
        console.log(sender+" is sender sendMessageToChat    PRIVATE_MESSAGE connectedUsers ======="+reciever+"   names"+names)
       /*  if(!names.includes(sender+"="+reciever)&&!names.includes(reciever+"="+sender)) */
       { names.push(reciever+"="+sender)
       name=`${reciever}&${sender}`
        newChat=     createChat({name:name,users:[reciever,sender]})
       console.log(sender+" is sender  normal:  "+name+" names :   " +names);
       console.log("----------------------");
       console.log(connectedUsers[reciever]);
       console.log("----------------------");
       console.log(connectedUsers[reciever].socket);
      
       const senderSocket=connectedUsers[sender].socket
       socket.to(recievedSocket).emit(PRIVATE_MESSAGE,newChat)
      // io.to(senderSocket).emit(PRIVATE_MESSAGE,newChat)
       socket.emit(PRIVATE_MESSAGE,newChat)
    }}
    
       else{
        console.log(recievedSocket)
        socket.to(recievedSocket).emit(PRIVATE_MESSAGE,activeChat)
       } 
        
      

   
    }
  //  sendTypingFromUser(chatId, isTyping)
})
}


function sendMessageToChat(sender){

	return (chatId, message)=>{
        io.emit(`${MESSAGE_RECIEVED}-${chatId}`, createMessage({message, sender}))
        console.log(message+"sendMessageToChat  inside    ======= sender   "+sender)
    }
 
}
function sendTypingToChat(user){
	return (chatId, isTyping)=>{
		io.emit(`${TYPING}-${chatId}`, {user, isTyping})
	}
}

/*
* Adds user to list passed in.
* @param userList {Object} Object with key value pairs of users
* @param user {User} the user to added to the list.
* @return userList {Object} Object with key value pairs of Users
*/
function addUser(userList, user){
	let newList = Object.assign({}, userList)
	newList[user.name] = user
	return newList
}

/*
* Removes user from the list passed in.
* @param userList {Object} Object with key value pairs of Users
* @param username {string} name of user to be removed
* @return userList {Object} Object with key value pairs of Users
*/
function removeUser(userList, username){
	let newList = Object.assign({}, userList)
	delete newList[username]
	return newList
}

/*
* Checks if the user is in list passed in.
* @param userList {Object} Object with key value pairs of Users
* @param username {String}
* @return userList {Object} Object with key value pairs of Users
*/
function isUser(userList, username){
    console.log(userList);
  	return username in userList
}
