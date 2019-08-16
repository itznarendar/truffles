import MoreVertIcon from '@material-ui/icons/MoreVert';
import React from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {Bootstrap, Badge , Row, Col} from 'react-bootstrap';
//import { Button } from '@material-ui/core/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
/* import "~slick-carousel/slick/slick.css";
import "~slick-carousel/slick/slick-theme.css"; */
import Slider from "react-slick";
import Chat from './../chat/Chat';
import Navbar from './../Navbar';
import $ from "jquery";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
/* import Form from '../../app/chat/Form'; */
import firebase from 'firebase';
 import firebaseConfig from '../../config/config';
import { Form } from 'react-bootstrap/Form';
import Popup from "reactjs-popup";
import LoadingSpinner from './../utils/LoadingSpinner';
import Logout from './../logout';
import { default as Chatkit } from '@pusher/chatkit-server';
import ChatMessage from './../chatkit/ChatMessage';
import Signup from './../chatkit/Signup';
import ChatApp from './../chatkit/ChatApp';
import Layout from '../chats/Layout';
firebase.initializeApp(firebaseConfig);


    const chatkit = new Chatkit({
      instanceLocator: "v1:us1:0435e247-0b0f-46eb-894d-653c2f2fe03d",
      key: "735b5988-e8e2-424c-82ac-803e5f846fb5:S4mDB6W6/Sx7AjBiat5x1ZIj9rVJ4lm9R7wZ2MBry7I="
    })

class Home extends React.Component {
  _isMounted = false;

  constructor(props, context) {
    super(props, context);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onfollowingRetrive = this.onfollowingRetrive.bind(this);
    this.onfollowersRetrive = this.onfollowersRetrive.bind(this);
    const {username}=this.props
    // Handle state
    this.postLikes=this.postLikes.bind(this);
this.postComments=this.postComments.bind(this);
    this.state = {
        show: false,
        file:true,
        loaded:null,
        uploadedImage:null,
        selectedFile: null,
        init:true,
        loading:null,
        mypost:true,
        upload:false,
 
        uploadfile:null,
        img64:null,
        postfile:null,
        filePriview:null,
        profilePriview:null,
        postsfromFollowing:[],
        followSugggestions:[],
        followersList:[{followers:[]}],
        followingListSize:null,
        followersCount:null,
        followingList:[],
      postText:null,
      showfollowing:true,   
      showfollowers:true,  
      spinner:"", 
      follow:true,
      priviewDP:false,
      currentUsername: '',
      currentId: '',
      user:localStorage.getItem('username'),
      currentView: 'signup',
      commentParameters:null,
      likeParameters:null,
    postResponse:{  postfileResp:null,
      postTextResp:null},
      
     
        
    };
    this.changeView = this.changeView.bind(this);
  this.createUser = this.createUser.bind(this);
    if(this.props.location.state !== undefined ) {
    const { getData } =  this.props.location.state
    }
    this.onPostTextHandler = this.onPostTextHandler.bind(this);
  }
  componentWillUnmount() {
   
  }
  componentWillReceiveProps(nextProps) {

    if(nextProps.location.state !== undefined ) {
      const { getData } =  this.props.location.state
    }
}
follow= (user) => {
  console.log("follow ==============="+user)
 var formData = new FormData();
  formData.append("followingUser",user)
  formData.append("Tt","user")
  /*      $.ajax({
          url: 'http://localhost:8000/follow/'+localStorage.getItem('username'),         
          type: 'POST',
          data: "formData",
          async: false,
          cache: false,
          contentType: false,
          processData: false,
          success: function () {
              alert('Form Submitted!');
          },
          error: function(){
              alert("error in ajax form submission");
          }
      }); */
  let   url="http://localhost:8000/follow/"+localStorage.getItem('username');
  const config = {     
    headers: { 'content-type': 'application/json' }
  }
  const data = new FormData();
  data.append("followingUser",user)
  data.append("Tt","user")
  const params = {    
    username: localStorage.getItem('username')

  };
 axios.post(url, {"followingUser":user} ,config)

}
getfollowingList(){
  return fetch('http://localhost:8000/getfollowingList/'+localStorage.getItem('username'), {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(( response) =>     
    response.json())
};

  getfollowersList(){
 
  return  fetch('http://localhost:8000/getfollowersList/'+localStorage.getItem('username'),{
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(( response) =>     
    response.json())
};
getfollowingListPromise(){
  return Promise.all([this.getfollowingList(),this.getfollowersList()])
}
postLikes(likeParameters,postId){
  console.log("posts")
  console.log(likeParameters)

  this.setState({likeParameters: likeParameters})
 // this.setState({postsfromFollowing: posts})
        let formData = new FormData();
        formData.append('username',localStorage.getItem('username'));
        formData.append('Likes',likeParameters.incrLikes);
        formData.append('postId',likeParameters.postId);
     /*    formData.append('commentId',likeParameters.commentId); */
        axios({
          method: 'post',
          url: 'http://localhost:8081/addPostLikes/',
          data: {username:localStorage.getItem('username'),/* 'commentId':commentId, */'postId':postId,'Likes':likeParameters.incrLikes},
          config: { headers: {'Content-Type': 'multipart/form-data' }}
          })
   .then(response=>{  
             console.log(response);
             this.setState({postsfromFollowing :response.data});
            
      
     })}

postComments(commentParameters,postId){
  console.log(commentParameters)
  console.log(postId)
  this.setState({commentParameters: commentParameters})
  
    let formData = new FormData();
    formData.append('username',localStorage.getItem('username'));
    formData.append('comment',commentParameters.comment);
    formData.append('postId',postId);
    var options = { content: formData};
    console.log(formData)
    console.log(JSON.stringify(formData))
    for(var pair of formData.entries()) {
      console.log(pair[0]+', '+pair[1]);
    }
    const config = {     
      headers: { 'content-type': 'multipart/form-data' }
    }
     axios({
      method: 'post',
      url: 'http://localhost:8081/addPostComments/',
      data: {username:localStorage.getItem('username'),'comment':commentParameters.comment,'postId':postId},
      config: { headers: {'Content-Type': 'multipart/form-data' }}
      })    
       
.then(response=>{  
         console.log(response);
        
        
  
 })}
async componentDidMount() {
debugger
  let formData = new FormData();
  formData.append('users',this.state.followingList);
 var userlist=this.state.followingList
 console.log(userlist);

 this.getfollowingListPromise()
 .then(([followingList,followersList]) => {
   // both have loaded!
   console.log(followingList);
   console.log(followersList);
   this.setState({followingListSize :followingList.length});
   this.setState({followersCount :followersList.length});
   this.setState({followingList :followingList});
   this.setState({followersList :followersList[0]});
  /*  this.setState({showfollowers:false}) */
   console.log(followersList[0])
   console.log(followersList)
   axios.post('http://localhost:8081/getPostsfromfollowings/',{followingList},{}  
   ).then(response=>{  
        console.log(response);
        this.setState({postsfromFollowing :response.data});
       
 })
 
})
 var followingList=this.state.followingList;
 console.log(followingList);
/*  if(!this.state.isLoading){
  console.log(followingList);
 $.ajax({
  "url": 'http://localhost:8000/getPostsfromfollowing/',
  "data": {
      usersList: this.state.followingList,
     
  },
/*   beforeSend: function() { $('.overlay').show(); },
  complete:   function() { $('.overlay').hide(); }, 
  success: function (data) {
console.log("success")
console.log(data)
  }})
     axios.post('http://localhost:8000/getPostsfromfollowings/',{formData},{}  
  ).then(response=>{  
       console.log(response);
       this.setState({followersList :response.data});
       if (this._isMounted) {
        this.setState({isLoading: "false"})
      }})} */
 /* 
  if(!this.state.isLoading)
   await   axios.get('http://localhost:8000/getPostsfromfollowing/'+userlist   
  ).then(response=>{  
       console.log(response);
       this.setState({followersList :response.data});
       if (this._isMounted) {
        this.setState({isLoading: "false"})
      }}) */
    



  console.log("follow sugggestions           ========================================="+localStorage.getItem('username'));
   await   axios.get('http://localhost:8000/getsuggestedToFollow/'+localStorage.getItem('username')     
  ).then(response=>{  
       console.log(response);
       this.setState({ followSugggestions :response.data});
       if (this._isMounted) {
        this.setState({isLoading: "false"})
      }
   
      
  }) 
  

  console.log("follow sugggestions      post req     =========================================");
  firebase.auth().onAuthStateChanged(user => {
    this.setState({ user });
  });
}
handleSignIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}
_handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    console.log('do validate');
  }
}
handleLikes(){
  console.log('do validate');
}
handleLogOut() {
  firebase.auth().signOut();
}

    //to restrict back in browser
   async componentWillMount() {

   // this.initSocket();
    
    console.log("componentWillMount    ===================="); 
      console.log(localStorage.getItem('getReq'))
      console.log(localStorage.getItem('getReq')!==1)
      if(localStorage.getItem('getReq')!==1)
    {  localStorage.setItem('getReq', 0);
  }
  console.log("componentWillMount 2   ===================="); 
  await   axios.get('http://localhost:8000/getfollowingList/'+localStorage.getItem('username')     
  ).then(response=>{  
       console.log(response);
       console.log("componentWillMount 3   ====================");
       this.setState({followingList :response.data});
       this.setState({isLoading: false})
       if (this._isMounted) {
        this.setState({isLoading: false})
      }
   
      
  }) 
      console.log(localStorage.getItem('username')+this.props.username)
   await   axios.get('http://localhost:8000/getProfileImg/'+localStorage.getItem('username')     
      ).then(response=>{
        
         if(!response.data.includes('error'))
        {
          console.log(response.data);
          var img64=response.data
         img64='data:image/jpeg;base64,'+img64
          console.log(img64)
          this.setState(
            {  init: false,
             img64:img64,
             priviewDP:false,
            });

        } 
        console.log(response);
      })
      console.log(this.getData);
      if(!this.getData)
      {
        this.setState(
          {  mypost:false
          });
      }
      
      
    

      
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event){
            window.history.pushState(null, document.title,  window.location.href);
        });
     
    }
    onChangeHandler=event=>{
      console.log("______________+++++++++++++++++++");
      this.setState({
        selectedFile: event.target.files[0],
        loaded: 0,
        show:true,
      })
     
      console.log(this.state.show);
    }
    onClickHandler = () => {
console.log("started")
      const data = new FormData() 
      let file=this.state.selectedFile
      console.log(file);
      console.log(localStorage.getItem('username'));
      const newName =localStorage.getItem('username');
      console.log(newName);
      data.append('file',this.state.selectedFile,newName+".jpg");
      data.set('username',localStorage.getItem('username'))
      data.append('usernames', localStorage.getItem('username') )
     let   url="http://localhost:8000/upload";
const config = {     
  headers: { 'content-type': 'multipart/form-data' }
}

const params = {
  postText: this.state.postText,
  username: localStorage.getItem('username')
};
axios.post(url, data, {params})
     /*  axios({
        method: 'post',
       url: "http://localhost:8000/upload", 
      data:data 
     /*   config: { headers: {'content-type': 'application/x-www-form-urlencoded' } }  }
 //   ) */
    .then(res => { // then print response status
      //console.log(res)
      console.log(JSON.stringify(res.data))
      console.log(res.data)
      this.setState(
        {                init: false,
        upload:true,
       
        });
      this.setState(
        {                init: false,
        upload:true,
        uploadfile: JSON.stringify(res.data),
        show: false,
        });
    let imageDataUrl
      //var reader = new window.FileReader();
      /* reader.readAsDataURL(res.data); 
      const scope = this
      reader.onload =  function() {

           imageDataUrl = reader.result;
          console.log(imageDataUrl)
          //imageElement.setAttribute("src", imageDataUrl);
        //  this.risA[i].foto = imageDataUrl.replace(new RegExp('' , 'g'), '+');
       
        imageDataUrl=imageDataUrl.replace("application/json","image/jpg")
          console.log(imageDataUrl)
          scope.setState(
            {                init: false,
            upload:true,
            uploadfile: imageDataUrl
          
            }); */
     /*   const base64 = btoa(
        new Uint8Array(res.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          '',
        ),
      );  */
      
    //  }
      console.log(imageDataUrl)
     
    })
    
    console.log("started 2")
    /* this.setState(
      {  init: false,
        upload:true,
        uploadfile: JSON.stringify(res.data),
                       
        
      }); */
  }
  onChange(e) {
    this.setState({file:e.target.files[0],
    profilePriview:URL.createObjectURL(e.target.files[0]) ,  
    priviewDP:true})
  }
    handleFileUpload(e){
     
         //localStorage.getItem('username') + e.target.files[0].split('.').pop();
    
      //this.setState({ selectedFile:})
    }
    renderEmptyPic(){
      
      console.log("Hiiiiiii")
     return <img id="emptyPhoto" src="images/empty_userPhoto.jpeg"/>
    }
setUserDetails(user){
  localStorage.setItem('userdetails', user);
console.log(user)
}
    renderPic(){
      
      console.log("Hi=======================================================")
      if(this.state.init){
        return <img id="emptyPhoto"  alt="profile" src="/images/profile.png"/>
      }
      let img64 
      
        if(null!=this.state.uploadfile)
        { img64 ='data:image/jpeg;base64,'+this.state.uploadfile.slice(0,this.state.uploadfile.length - 1).replace("\"","");
        this.setState(
          {  
           img64:img64
          });
      }
       else{  img64=this.state.img64}
        console.log(img64);
      return  <img id="t"  alt="profile" src={img64}/>
    }
    onPostHandler = (e) => {
      e.preventDefault()
      console.log("===========================================================================")
      console.log(localStorage.getItem('username'))
     console.log(this.state.postfile)
     console.log(this.state.postText)
      let formData = new FormData();
      formData.append('file',this.state.postfile);
      formData.append('postText', this.state.postText); 
      formData.append('username',  localStorage.getItem('username'));
      formData.append('postFlag',  true);  
      var options = { 'Content-Type': 'application/x-www-form-urlencoded'};
      let   url="http://localhost:8081/sharepost";
      const config = {     
        headers: { 'content-type': 'multipart/form-data', 'Accept': 'application/json' }
      }
  
      const params = {
        postText: this.state.postText,
        postFlag:true,
        username: localStorage.getItem('username')
      };
      axios.post(url, formData,{params})
           .then( res => { // then print response status
            //console.log(res)
            console.log(JSON.stringify(res))
            console.log(res.data)
            console.log(res)
            this.setState(
              { postResponse:{ postTextResp: res.data.postText,
               postfileResp:res.data.message
              }}
              );
           
              })}

    
    onPostTextHandler(e){

      this.setState({
        postText: e.target.value      
      })
      
    }
    onfollowingRetrive(){
      console.log("woks   == showfollowing  "+this.state.showfollowing)
       this.setState({showfollowing:false,
        showfollowers:true,
        spinner:"spinner" }
        );
return false; 
        
    
      }
      onfollowersRetrive(){
console.log("woks   ==")
        this.setState({showfollowing:true,
          showfollowers:false,
          spinner:"spinner"
         }
         );
 return false; 
         
     
       }

    
    onPostfileHandler=event=>{
      console.log("############# onPostfileHandler    ##################");
      this.setState({
        postfile: event.target.files[0] ,
        filePriview:URL.createObjectURL(event.target.files[0])   
      })  
    }
    createUser(username) {
      chatkit.createUser({
          id: username,
          name: username,
      })
      .then((currentUser) => {
          this.setState({
              currentUsername: username,
              currentId: username,
              currentView: 'chatApp'
          })
      }).catch((err) => {
               if(err.status === 400) {
              this.setState({
                  currentUsername: username,
                  currentId: username,
                  currentView: 'chatApp'
              })
          } else {
              console.log(err.status);
          }
      });
  }
  changeView(view) {
    this.setState({
        currentView: view
    })
}
getPosts(){

}
    render() {
      const { user, socket } = this.props
      const postss=this.state.postsfromFollowing
      if(postss===undefined){
this.getPosts()
      }
      const  username=localStorage.getItem('username')
      console.log(postss)
      console.log(user+"--------------------"+socket+"    "+username)
      let view ='';
      if (this.state.currentView === "ChatMessage") {
          view = <ChatMessage  changeView={this.changeView}/>
      }
      else if (this.state.currentView === "signup") {
        view = <Signup onSubmit={this.createUser}/>
    }
      else if (this.state.currentView === "chatApp") {
        view = <ChatApp currentId={this.state.currentId} />
    }
      let close = () => {
        this.setState({ show: false});
    };
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
   var preview= this.state.postfile
   var loading=this.state.loading
    console.log("###############################"+loading);
    console.log(this.state.img64);
    console.log(this.state.uploadfile);
    var img64;
    if(null!=this.state.uploadfile)
    { img64 ='data:image/jpeg;base64,'+this.state.uploadfile.slice(0,this.state.uploadfile.length - 1).replace("\"","");}
   else{  img64=this.state.img64}
    console.log(this.state.uploadfile);
    if(null!=this.state.uploadfile)
    console.log(this.state.uploadfile.slice(0,this.state.uploadfile.length - 1).replace("\"",""))
    console.log(this.state.init);
    console.log(img64)
    localStorage.setItem('avatar', img64);
        return (
        
          <div className="container1">
           {/*  <Logout/> */}

       
           {/*  <div className="app">
         <div className="app__header">
          <img src="./resources/pexels-photo-1851415.jpeg" className="app__logo" alt="logo" />
          <h2>
            SIMPLE APP WITH REACT
          </h2>
          { !this.state.user ? (
            <button
              className="app__button"
              onClick={this.handleSignIn.bind(this)}
            >
              Sign in
            </button>
          ) : (
            <button
              className="app__button"
              onClick={this.handleLogOut.bind(this)}
            >
              Logout
            </button>
          )}
        </div>
        <div className="app__list">
          <Form user={this.state.user} />
        </div>
      </div> */} 

<Col xs={6} md={4}>
    
    
    {/*  <img alt="Smiley face"src="holder.js/171x180" rounded />
     upload */}
 <input type="file" onChange={this.onChange} />
     {/*  {this.state.init ?<img id="emptyPhoto" src="images/empty_userPhoto.jpeg"/>:<img  src={img64}/>}
    
    <img  src={img64}/>  */}
  {/*   <div className="gallery">{uploadfile}</div> */}
  
   <div className="profile">
     {/* <img src="/images/profile.png"  alt="profile" width="121" height="130" /> */}
     
   {/*   {this.state.priviewDP ? <img  width="231" height="270" alt="preview" src={this.state.profilePriview}/> :{}} */}
      {this.state.init ?<img src="/images/profile.png"  alt="profile" width="121" height="130" />:<img  src={img64}/>}
     
     <div className="content" /* onClick={() => this.imageChange.bind(this)} */>
     <label className="custom-file-upload">
   <input type="file" onChange={this.onChangeHandler}/>
   <i className="fa fa-cloud-upload"></i> Change
</label>    
{this.state.show ?<button type="button"  onClick={this.onClickHandler}>Upload</button>   : ''}

 </div>
 <ol >
                        <li><a href="#"><i className="fa fa-dashboard"/> Home</a></li>
                        <li><Link to="/posts" className="dashboard" profile={this.state.img64} >My Posts</Link></li>
                       
                    </ol>
 </div>
 
         {/*    <nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item active" aria-current="page">Home</li>
  </ol>
</nav> */}

<div  className="menuItem">
<Card  className="items1">
  <button  onClick={this.onfollowersRetrive} class="btn success">followers</button>     :{this.state.followersCount}
    <button  onClick={this.onfollowingRetrive} class="btn success">following</button>     :{this.state.followingListSize}
  <div>
            {this.state.showfollowers ? <LoadingSpinner className={this.state.spinner} /> :   
             <div>   {this.state.followersList.followers.map((user, index) => {
               console.log(user)
           // var  baseImg64 ='data:image/jpeg;base64,'+(post.message);
          var  url="http://localhost:8000/"+user+".jpg"
          var userHref="http://localhost:8000/getHomepage"+user
          console.log(url)
         //   console.log(baseImg64)
              return ( <div key={index}>
<CardHeader
          avatar={
            <Avatar aria-label="Recipe"  rounded
            src={url}>
             
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={user}
        
        />
        
     <div>
     {/*    <a title={user.username} onClick={handleClick} href={userHref}</a> */}
     <Link to="/userdetails" onClick={this.setUserDetails.bind(this, user.username)}>
              Visit  {user}'s Profile to know more </Link>
          
                  <CardContent>
          
          {user}
      
        </CardContent>
        </div>
                </div>
              );
            })}
          </div>
        }</div>
        </Card>
     <Card  >
  <div>
            {this.state.showfollowing ? <LoadingSpinner  className={this.state.spinner} /> :   
             <div>   {this.state.followingList.map((user, index) => {
               console.log(user.username)
           // var  baseImg64 ='data:image/jpeg;base64,'+(post.message);
          var  url="http://localhost:8000/"+user.username+".jpg"
          var userHref="http://localhost:8000/getHomepage"+user.username
          console.log(url)
         //   console.log(baseImg64)
              return ( <div key={index}>
<CardHeader
          avatar={
            <Avatar aria-label="Recipe"  rounded
            src={url}>
             
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={user.username}
        
        />
     <div>
     {/*    <a title={user.username} onClick={handleClick} href={userHref}</a> */}
               <Link to="/userdetails" onClick={this.setUserDetails.bind(this, user.username)}>
              Visit  {user.username}'s Profile to know more </Link>
          
                  <CardContent>
          
        {/*   {user.username} */}
      
        </CardContent>
        </div>
                </div>
              );
            })}
          </div>
        }</div>
        </Card>
     
 
        </div>
       
      
          </Col>

<form >
  
 {/*  <Row>
    
  
    <Col xs={6} md={4}>
    
   
    </Col>
    
    
  </Row> */}

      
        <Chat />
        <Layout user={username}/>
            <div class="chat-popup" id="myForm">
  <form action="/action_page.php" class="form-container">
  <React.Fragment>
             
                <Layout/>
              
                layout :)
             
            </React.Fragment>
 <React.Fragment>
                <Navbar/>
                <Layout socket={socket} user={user}/>
                <Chat/>
                layout :)
             
            </React.Fragment>
            </form>
</div>
  <Row>
   
  <textarea name="postText"className="form-control" id="exampleFormControlTextarea1" rows="3"  onChange={this.onPostTextHandler}>
  
  </textarea>
  <label color="blue">
    <input type="file" name="postfile" accept="video/*,  video/x-m4v, video/webm, video/x-ms-wmv, video/x-msvideo, video/3gpp, video/flv, video/x-flv, video/mp4, video/quicktime, video/mpeg, video/ogv, .ts, .mkv, image/*, image/heic, image/heif" onChange={this.onPostfileHandler}/>
        <i className="fa fa-cloud-upload"></i> Image/Video
</label>



 <img  width="231" height="270" alt="preview" src={this.state.filePriview}/> 
<button type="button"  onClick={this.onPostHandler}>Post</button>
  {/* <input type="file">image/Video</input> */}
  {/* <ReactUploadFile ref={(upload) => {this.upload = upload;}}  chooseFileButton={<YourChooseButton />} uploadFileButton={<YourUploadButton />} didChoose={this.todo} /> */}
    </Row>
    </form>
    <table>
    <Card  >
  <div>
            {this.state.loading ? <LoadingSpinner /> :   
             <div>   {this.state.postsfromFollowing.map((post, index) => {
               console.log(post)
            var  baseImg64 ='data:image/jpeg;base64,'+(post.message);
          var  url="http://localhost:8000/"+post.user+".jpg";
          var postId=post.postID
          
          console.log(postId)
          var likes
          if(post.likes===undefined){
            likes=0
          }
          else{
            likes=post.likes
          }
        
          var comments=post.comments
          console.log(url)
          console.log(comments)
            console.log(baseImg64)
              return ( <div key={index}>
<CardHeader
          avatar={
            <Avatar aria-label="Recipe"  rounded
            src={url}>
             
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={post.username}
          subheader={post.time}
        />
        
               
                  <CardContent>
          <Typography component="p">
          {post.postText}
       {/*    <img src={baseImg64} alt="" /> */}
          </Typography>
          </CardContent>

                  {/* div>{post.postText}</div> */}
                  <img src={baseImg64} alt="" />
                
                  <Like onPostLikes={this.postLikes}
                   
                   comments={comments}  getPosts={this.getPosts}     posts={this.state.postsfromFollowing}     likes={likes}  postId={postId}
                 />
                   <Comment  onPostComments={this.postComments}  comments={comments}               
                postId={postId}
                 />
                  Like      <i onclick="{this.handleLikes}" class="fa fa-thumbs-up"></i>
    <label htmlFor="exampleFormControlTextarea1">Comment</label>
    <textarea className="form-control" id="exampleFormControlTextarea1"  onKeyDown={this._handleKeyDown} rows="3"></textarea>
                  <CardMedia
       
          image={baseImg64} alt="" />
          title="Paella dish"
        
                </div>
              );
            })}
          </div>
        }</div>
        </Card>
      <Row>
    <div className="card-body"  >

    <div>  
          {this.state.followSugggestions.map((user, index) => {
              img64 ='data:image/jpeg;base64,'+(user.profilepicPath);
              return (
                <div key={index}>
                  <CardContent>
          <Typography component="p">
          {user.username}
      
          </Typography>
          </CardContent>                
                 
            <img src={img64} alt="" />
                </div>
              );
            })}
          </div>

  {this.state.loading===null ? <LoadingSpinner /> : 

    <Slider {...settings} >
       
        <div>  
          {this.state.followSugggestions.map((user, index) => {
              img64 ='data:image/jpeg;base64,'+(user.profilepicPath);
              return (
                <div key={index}>
                  
                  <CardContent>
          <Typography component="p">
          {user.username}
      
          </Typography>
          </CardContent>                
                 
            <img src={img64} alt="" />
         
    

                </div>
              );
            })}
          </div>
        }
          
     
        </Slider>}
      
        
      {/*  /*  <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
        */ }
      {/*  } */} </div>
    MyFeed:
     <div >

     </div>
     
      </Row>
      </table>
  
 
<nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    <li className="breadcrumb-item"><a href="#">Home</a></li>
    <li className="breadcrumb-item active" aria-current="page">Library</li>
  </ol>
</nav>

<nav aria-label="breadcrumb" >
  <ol class="breadcrumb">
    <li className="breadcrumb-item"><a href="#">Home</a></li>
    <li className="breadcrumb-item"><a href="#">Library</a></li>
    <li className="breadcrumb-item active" aria-current="page">Data</li>
  </ol>
 
  <div  className="menuItem">
  <Card  className="items1">
  <button  onClick={this.onfollowersRetrive} class="btn success">followers</button>     :{this.state.followersCount}
    <button  onClick={this.onfollowingRetrive} class="btn success">following</button>     :{this.state.followingListSize}
  <div>
            {this.state.showfollowers ? <LoadingSpinner className={this.state.spinner} /> :   
             <div>   {this.state.followersList.followers.map((user, index) => {
               console.log(user)
           // var  baseImg64 ='data:image/jpeg;base64,'+(post.message);
          var  url="http://localhost:8000/"+user+".jpg"
          var userHref="http://localhost:8000/getHomepage"+user
          console.log(url)
         //   console.log(baseImg64)
              return ( <div key={index}>
<CardHeader
          avatar={
            <Avatar aria-label="Recipe"  rounded
            src={url}>
             
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={user}
        
        />
        
     <div>
     {/*    <a title={user.username} onClick={handleClick} href={userHref}</a> */}
     <Link to="/userdetails" onClick={this.setUserDetails.bind(this, user.username)}>
              Visit  {user}'s Profile to know more </Link>
          
                  <CardContent>
          
          {user}
      
        </CardContent>
        </div>
                </div>
              );
            })}
          </div>
        }</div>
        </Card>
     <Card  >
  <div>
            {this.state.showfollowing ? <LoadingSpinner  className={this.state.spinner} /> :   
             <div>   {this.state.followingList.map((user, index) => {
               console.log(user.username)
           // var  baseImg64 ='data:image/jpeg;base64,'+(post.message);
          var  url="http://localhost:8000/"+user.username+".jpg"
          var userHref="http://localhost:8000/getHomepage"+user.username
          console.log(url)
         //   console.log(baseImg64)
              return ( <div key={index}>
<CardHeader
          avatar={
            <Avatar aria-label="Recipe"  rounded
            src={url}>
             
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={user.username}
        
        />
     <div>
     {/*    <a title={user.username} onClick={handleClick} href={userHref}</a> */}
               <Link to="/userdetails" onClick={this.setUserDetails.bind(this, user.username)}>
              Visit  {user.username}'s Profile to know more </Link>
          
                  <CardContent>
          
        {/*   {user.username} */}
      
        </CardContent>
        </div>
                </div>
              );
            })}
          </div>
        }</div>
        </Card>
        </div>
</nav>
  <h1>
    Example heading <Badge variant="secondary">New</Badge>
  </h1>
  Profile <Badge variant="light">9</Badge>
  <span className="sr-only">unread messages</span>
  <div className="App">
                   
                </div>
  <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
  <div className="btn-group mr-2" role="group" aria-label="First group">
    <button type="button" className="btn btn-secondary">Logout</button>
    <button type="button" className="btn btn-secondary">2</button>
    <button type="button" className="btn btn-secondary">3</button>
    <button type="button" className="btn btn-secondary">4</button>
  </div>
  <div className="btn-group mr-2" role="group" aria-label="Second group">
    <button type="button" className="btn btn-secondary">5</button>
    <button type="button" className="btn btn-secondary">6</button>
    <button type="button" className="btn btn-secondary">7</button>
  </div>
  <div className="btn-group" role="group" aria-label="Third group">
    <button type="button" className="btn btn-secondary">8</button>
  </div>

</div>
<div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
    Test file Uplaod<input type="file" name="files"/>
  </div>
  expected carasoul here 
  <Carousel >
  {this.state.followSugggestions.map((user, index) => {
              img64 ='data:image/jpeg;base64,'+(user.profilepicPath);
              return (
                <div key={index}>
                
          {user.username}
      
                Test Text 
                 
            <img src={img64} alt=""  width="121" height="130"/>
            <p>   {user.username}</p>
        
            {this.state.follow ?<button type="button"  class="btn btn-outline pull-left" onClick={() =>this.follow(user.username)}>follow </button>:<p>following</p>}        
                </div>
              );
            })}
            </Carousel>

           
  <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
  <div className="carousel-inner">
  
          {this.state.followSugggestions.map((user, index) => {
              img64 ='data:image/jpeg;base64,'+(user.profilepicPath);
              return (
                <div className="carousel-item" key={index}>
                  <CardContent>
          <Typography component="p">
          {user.username}
      
          </Typography>
          </CardContent>                
                 
            <img src={img64} alt="" />
                </div>
              );
            })}
        
        
    
        </div>
  
  </div>
  <Card  >
  <div>
            {this.state.loading ? <LoadingSpinner /> :   
             <div>   {this.state.postsfromFollowing.map((post, index) => {
               console.log(post)
            var  baseImg64 ='data:image/jpeg;base64,'+(post.message);
          var  url="http://localhost:8000/"+post.user+".jpg";
          var postId=post.postID
          console.log(postId)
          var likes
          if(post.likes===undefined){
            likes=0
          }
          else{
            likes=post.likes
          }
        
          var comments=post.comments
          console.log(url)
          console.log(comments)
            console.log(baseImg64)
              return ( <div key={index}>
<CardHeader
          avatar={
            <Avatar aria-label="Recipe"  rounded
            src={url}>
             
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={post.username}
          subheader={post.time}
        />
        
               
                  <CardContent>
          <Typography component="p">
          {post.postText}
       {/*    <img src={baseImg64} alt="" /> */}
          </Typography>
          </CardContent>

                  {/* div>{post.postText}</div> */}
                  <img src={baseImg64} alt="" />
                
                  <Like onPostLikes={this.postLikes}
                   
                   comments={comments}           likes={likes}  postId={postId}
                 />
                   <Comment  onPostComments={this.postComments}  comments={comments}               
                postId={postId}
                 />
                  Like      <i onclick="{this.handleLikes}" class="fa fa-thumbs-up"></i>
    <label htmlFor="exampleFormControlTextarea1">Comment</label>
    <textarea className="form-control" id="exampleFormControlTextarea1"  onKeyDown={this._handleKeyDown} rows="3"></textarea>
                  <CardMedia
       
          image={baseImg64} alt="" />
          title="Paella dish"
        
                </div>
              );
            })}
          </div>
        }</div>
        </Card>
  

  <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src="..." alt="First slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="..." alt="Second slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="..." alt="Third slide"/>
   
  
  </div>

  </div>
  <div id="accordion">
  <button  onClick={this.onfollowingRetrive} class="btn success">following</button>     :{this.state.followingListSize}
  <div className="card">
    <div className="card-header" id="headingOne">
      <h5 className="mb-0">
        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Collapsible Group Item #1
        </button>
      </h5>
    </div>

    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
      <div className="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <div className="card">
    <div className="card-header" id="headingTwo">
      <h5 className="mb-0">
        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Collapsible Group Item #2
        </button>
      </h5>
    </div>
    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
      <div className="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <div className="card">
    <div className="card-header" id="headingThree">
      <h5 className="mb-0">
        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Collapsible Group Item #3
        </button>
      </h5>
    </div>
    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
      <div className="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
</div>
<div className="btn-group">
  <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Action
  </button>
  <div className="dropdown-menu">
    <a className="dropdown-item" href="#">Action</a>
    <a className="dropdown-item" href="#">Another action</a>
    <a className="dropdown-item" href="#">Something else here</a>
    <div className="dropdown-divider"></div>
    <a className="dropdown-item" href="#">Separated link</a>
  </div>
</div>
<div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown button
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a className="dropdown-item" href="#">Action</a>
    <a className="dropdown-item" href="#">Another action</a>
    <a className="dropdown-item" href="#">Something else here</a>
  </div>
</div>

  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>
  <div>
  <label htmlFor="exampleFormControlSelect1">Example select</label>
    <select className="form-control" id="exampleFormControlSelect1">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlSelect2">Example multiple select</label>
    <select multiple className="form-control" id="exampleFormControlSelect2">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select>
  </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlTextarea1">Example textarea</label>
    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
  <div className="form-group">
    <label htmlFor="exampleFormControlFile1">Example file input</label>
    <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
  </div>
  <div className="form-check">
  <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
  <label className="form-check-label" htmlFor="defaultCheck1">
    Default checkbox
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" disabled/>
  <label className="form-check-label" htmlFor="defaultCheck2">
    Disabled checkbox
  </label>
</div>
<div className="input-group mb-3">
  <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon1">@</span>
  </div>
  <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/>
</div>

<div className="input-group mb-3">
  <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
  <div className="input-group-append">
    <span className="input-group-text" id="basic-addon2">@example.com</span>
  </div>
</div>

<label htmlFor="basic-url">Your vanity URL</label>
<div className="input-group mb-3">
  <div className="input-group-prepend">
    <span className="input-group-text" id="basic-addon3">https://example.com/users/</span>
  </div>
  <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
</div>

<div className="input-group mb-3">
  <div className="input-group-prepend">
    <span className="input-group-text">$</span>
  </div>
  <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)"/>
  <div className="input-group-append">
    <span className="input-group-text">.00</span>
  </div>
</div>
<nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    <li className="page-item"><a className="page-link" href="#">2</a></li>
    <li className="page-item"><a className="page-link" href="#">3</a></li>
    <li className="page-item"><a className="page-link" href="#">Next</a></li>
  </ul>
</nav>
<div className="input-group">
  <div className="input-group-prepend">
    <span className="input-group-text">With textarea</span>
  </div>
  <textarea className="form-control" aria-label="With textarea"></textarea>
</div>
  <div className="form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>

</div>
{/*   <Button variant="primary">
  Profile <Badge variant="light">9</Badge>
  <span classNameName="sr-only">unread messages</span>
</Button>; */}
  </div>

        );
    }
}
class Comment extends  React.Component {

  constructor(props, context) {
    super(props, context);
    
    //const { postId } = this.props;
    this.state = {  Likes:0,
      comments:[],
      comment:'',
      postId:'',
      comment1:'',
      postId1:'',
   
  }
  const { postId,comments } = this.props;
  console.log(postId);
  console.log(comments);
  this.setState({
    postId:this.postId,
    comments:comments
  })
   console.log(this.state.postId);
  console.log(this.state.comments);
}

  handleClick = () => {
    this.props.onHeaderClick(this.props.value);
  }
  
  onSubmitComment(){

  }
  postCommentsLikes(){   
  
    var userlist=this.state.followingList
    console.log(userlist);
   
    
      // both have loaded!
      
    //  this.setState({comment :comments});
     
     // this.setState({comments :comments});
      let formData = new FormData();
      formData.append('username',localStorage.getItem('username'));
      formData.append('comment',this.state.comment);
      formData.append('postId',this.state.postId);
      axios.post('http://localhost:8081/addPostComments/',{formData},{}  
      ).then(response=>{  
           console.log(response);
           this.setState({postsfromFollowing :response.data});
          
    
   })}
onChangeComment(e){
  this.setState({
      comment : e.target.value
  })
}


addComment(postId) {
  console.log(postId)
  this.setState({
    postId:postId,
  
  })
  this.props.onPostComments(this.state,postId);
  this.setState({
    comment:"",
  
  })
    console.log('do validate');
  }

  render() {
    const { postId,comments } = this.props;
    console.log("hi")
    console.log(comments)
    return (
      <div>

           <div>   {comments.map((comment, index) => {
             var  url="http://localhost:8000/"+comment.userId+".jpg"
             
               console.log(comment)
       
          const commentId=comment._id
        
              return ( <div key={index}>
                Hello
                <Card>
    <CardHeader
          avatar={
            <Avatar aria-label="Recipe"  rounded
            src={url} >
             
            </Avatar>
          }
          title={comment.userId}
          subheader={comment.time}
        />
<CardContent>{comment.commentText}</CardContent>
</Card>
{/*  <Like commentId={commentId}></Like> */}
                </div>
              );
            })}
          </div>
       
      <label htmlFor="exampleFormControlTextarea1">Comment</label>
      <textarea className="form-control" id="exampleFormControlTextarea1"  onChange={this.onChangeComment.bind(this)} value={this.state.comment}   rows="3"></textarea>
      <button type="button"  onClick={this.addComment.bind(this,postId)}>Upload</button>
      </div>);
  }
}
class Like extends  React.Component {

  constructor(props, context) {
    super(props, context);
  
    this.state = {  Likes:0,
      comments:[],
      postId:null,
      UserLikes:[],
      showLikes:false
   
  }
  const { postId,likes,commentId,user,posts} = this.props;
 /*  this.setState({
    postId:postId,
    Likes:likes,
    commentId:commentId,
    user:user
  }) */
}
onSubmitLike(postId){
  this.setState({postId :postId});
  
}
 handleLikes(postId,commentId,posts){
 
  console.log('do validate');
  var likes=Number(this.state.Likes)
  var incrLikes=likes+1

  this.setState({Likes:incrLikes});
  this.setState({
    postId:postId,
  
  })
  //this.props.onPostComments(this.state,postId);
  //this.props.getPosts(true);
//   localStorage.setItem("Likes",incrLikes);

//  localStorage.setItem("updateLike",1);

 axios({
  method: 'post',
  url: 'http://localhost:8081/addPostLikes/',
  data: {username:localStorage.getItem('username'),/* 'commentId':commentId, */'postId':postId,'Likes':incrLikes},
  config: { headers: {'Content-Type': 'multipart/form-data' }}
  })
.then(response=>{  
     console.log(response);
     this.setState({postsfromFollowing :response.data});
 // this.props.onPostLikes(this.state,postId/* incrLikes,commentId,posts */);
 
//  postCommentsLikes(this.state.Likes,null,postId)
})}

   componentDidMount() {
    const { postId} = this.props;
   var  url= 'http://localhost:8081/getPostLikes/'
   const config = {
    params: {commentId:this.state.commentId,postId:postId,user:this.state.user}
  }
  $.get(url, {commentId:this.state.commentId,postId:postId,user:this.state.user})
 /*  $.ajax({
    url: url,         
    type: 'GET',
    data:{postId:postId},
    async: false,
    cache: false,
    contentType: false,
    processData: false,
    success: function (response) {
      //  alert('Form Submitted!');
        console.log(response);
    },
    error: function(){
        alert("error in ajax form submission");
    }
});
    axios.get(url,{ params:config }) */
    /* axios({
      method: 'get',
      url: 'http://localhost:8081/getPostLikes/',
      data: {username:localStorage.getItem('username'),},
     
      }) */
.then(response=>{  
         console.log(response);
         this.setState({Likes :response[0].username.length});
         this.setState({UserLikes :response});
        
  
 })

    //call to get Likes and diplay

  }
  postCommentsLikes(){
/*   
    var userlist=this.state.followingList
    console.log(userlist);
   
    
      // both have loaded!
      
      this.setState({Likes :likes});
      */
     // this.setState({comments :comments});
      let formData = new FormData();
      formData.append('username',localStorage.getItem('username'));
      formData.append('Likes',this.state.Likes);
      formData.append('postId',this.state.postId);
      formData.append('commentId',this.state.commentId);
      axios.post('http://localhost:8081/addPostLikes/',{formData},{}  
      ).then(response=>{  
           console.log(response);
           this.setState({postsfromFollowing :response.data});
          
    
   })}
   getUsers(){
    this.setState({showLikes :true});
   }
  render() {
   //var comment=this.state.comments
   const { postId,comments,commentId,user,setUserDetails,posts} = this.props;
 const {Likes}=this.state
 const {UserLikes}=this.state
 const {showLikes}=this.state
 
 
    console.log("hi")
    console.log(postId)
    return (
      <div>
        Like for Post:  <i   onClick={this.handleLikes.bind(this,postId)} class="fa fa-thumbs-up"></i>
      
      <div>   {UserLikes.map((userLike, k) => {
        console.log(userLike)

   const likes=userLike.likes
   const users=userLike.username
       return ( <div key={k}>

{/* <i   onClick={this.getUsers.bind()} class="fa fa-thumbs-up">Liking</i> */}
<Popup trigger={<button>Likes</button>} position="top left">
    {close => (
      <div>
        {userLike.username}
        {users.map((user, index) => {
        console.log(userLike)

  
       return ( <div key={index}>
       {/*   {user} */}
         </div>)})}
       {/*  <Link to="/userdetails" onClick={setUserDetails(userLike.username)}>
              Visit  {userLike.username}'s Profile to know more </Link> */}
        <a className="close" onClick={close}>
          &times;
        </a>
      </div>
    )}
  </Popup>:
cap {Likes} 
ss
{likes}
{/* <Like commentId={commentId}></Like> */}
         </div>
       );
     })}
   </div>
     {/*  <div>UserLikes.map((userLike, index) => {
     return(   <div key={index}>
Like for Post:  <i   onClick={this.handleLikes.bind(this,postId,this.commentId)} class="fa fa-thumbs-up"></i>
<i   onClick={this.getUsers.bind(this,postId,this.commentId)} class="fa fa-thumbs-up">Liking</i>
{Likes}

</div>);
      }) */}
    {/*  {   <div>   {comments.map((comment, index) => {
               console.log(comment)
       
          const commentId=comment._id
        
              return ( <div key={index}>


 <Like commentId={commentId}></Like>
                </div>
              );
            })}
          </div>} */}
              <i onClick={this.handleLikes.bind(this)} class="fa fa-thumbs-up">Likes</i>
               {/*    <i class="mdi-action-favorite red-text text-lighten-1"></i> <a href="#" onClick={this.AddValue.bind(this)}> */}{this.state.Likes}{/* </a> */}
                  <button class="btn-secondary like-review">
    <i class="fa fa-heart" onClick={this.handleLikes.bind(this)} aria-hidden="true"></i> Like
   
  </button>
  </div>
    /*   </div> */
    );
  }
}
class TableHeader extends  React.Component {
  handleClick = () => {
    this.props.onHeaderClick(this.props.value);
  }

  render() {
    console.log("hi")
    return (
      <th onClick={this.handleClick}>
        tableheader
        {this.props.column}
      </th>
    );
  }
}
/* var Follow = React.createClass({
  render: function() {
    let img64
      return (
        <Slider  >
       
        <div>  
          {this.props.followSugggestions.map((user, index) => {
              img64 ='data:image/jpeg;base64,'+(user.profilepicPath);
              return (
                <div key={index}>
                  <CardContent>
          <Typography component="p">
          {user.username}
      
          </Typography>
          </CardContent>                
                 
            <img src={img64} alt="" />
                </div>
              );
            })}
          </div>
        }
          
     
        </Slider>
      );
  }
});
 */
export default Home;