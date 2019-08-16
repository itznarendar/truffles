

import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Layout from '../chats/Layout';
import $ from 'jquery';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popup from "reactjs-popup";


    import React from 'react';
    import ReactDOM from 'react-dom';
    import { Link } from 'react-router-dom';
import LoadingSpinner from './../utils/LoadingSpinner';
import Logout from './../logout';
import { CardColumns } from 'react-bootstrap';

    class MyPosts extends React.Component{
    
    constructor(props){  
        super(props);
        this.state = { expanded: false, 
          authenticated:true,
          loading:true,
          commentParameters:null,
        data:[],
        getData:true
       };
       this.postComments=this.postComments.bind(this);
    //   const { mypost} = this.props.location.mypost
     
        /* const { initLoad} = this.props.initLoad;
        console.log(initLoad) */

       

    }
    componentWillUnmount(){
      this.setState({data:[],
        loading:false,
        getData:0
     })
      var load =localStorage.getItem('getReq')
      console.log(load)
      let ver =this.state.getData
      console.log(ver)
      console.log("compoent will unmount   ")
      localStorage.setItem('getReq', 1);
  }
      componentDidMount() {
     
 
     }
  

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
        $.ajax({
          method: 'post',
          url: 'http://localhost:8081/addPostComments/',
          data: {username:localStorage.getItem('username'),'comment':commentParameters.comment,'postId':postId},
          config: { headers: {'Content-Type': 'multipart/form-data' }}
          })    
           
    .then(response=>{  
             console.log(response);
            
            
      
     })}
     componentDidMount() {
      var load =localStorage.getItem('getReq')
      console.log(load)
      console.log(load==0)
      console.log(load===0)
      console.log(load==1)
    if(0==0)
    {

      axios.get('http://localhost:8081/postList/'+localStorage.getItem('username')     
     ).then(response=>{

      /*  
        if(!response.data.includes('error'))
       {
         console.log(response.data);
         var img64=response.data
        img64='data:image/jpeg;base64,'+img64
         console.log(img64)
         this.setState(
           {  init: false,
            img64:img64
           });

       }  */
       this.setState({data:response.data,
       loading:false,
       getData:0
    })
    localStorage.setItem('chachedData',response.data);
  
   let getd= this.state.getData
    console.log(getd)
       console.log(response);
       console.log(response.data);
     }) 
     localStorage.setItem('getReq', 1);}
 if(load==1)
     {
      console.log(load)
      console.log(localStorage.getItem('chachedData'))
     /*  this.setState({data:localStorage.getItem('chachedData'),
        loading:false,
        getData:0
     }) */
     console.log("waiting +++++++++++++")
     }

    }
    onChangeComment(e){
      this.setState({
          comment : e.target.value
      })
    }
    
    
    addComment(postId) {
      console.log(postId)
      this.setState({
        postId:postId,
      
      })}
    render() {
            let img64
      if (this.state.data.length) {
        
        let renderItems = this.state.data.map((item, i) =>{
          console.log(item.message)
          console.log(item)
          img64 ='data:image/jpeg;base64,'+(item.message);
          var postId=item.postID
            console.log(postId)
            var likes=item.likes
            var comments=item.comments
          console.log(img64)
          return(
          <div>
          <Layout/>
          
          <li key={i}>{item.postText}
          <div>{item.postText}</div>
          Image her
          <div><img  src={img64}/></div>
         
          <Card  >
          <CardHeader
          avatar={
            <Avatar aria-label="Recipe" >
              R
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={item.postText}
          subheader="September 14, 2092"
        />
                 <CardMedia
      
         image={img64} alt="" />
         title="Paella dish"
       /> <img src={img64} alt="" />
              </Card>
          </li>
          </div>)
        });} 
        console.log(localStorage.getItem('accessToken'))
        return (
            <div>
              <Logout/>
            <ol className="breadcrumb">
            <li><a href="/home"><i className="fa fa-dashboard"/> Home</a></li>
            <li><Link to="/home"  > back to Home</Link></li>
           
        </ol>
       

            <Card  >
            <div>
            {this.state.loading ? <LoadingSpinner /> :   
             <div>   {this.state.data.map((post, index) => {
              var postId=post.postID
              console.log(postId)
              var likes=post.likes
              var comments=post.comments
              img64 ='data:image/jpeg;base64,'+(post.message);
              return ( <div key={index}>
<CardHeader
          avatar={
            <Avatar aria-label="Recipe"  rounded
            src={localStorage.getItem('avatar')} >
             
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={localStorage.getItem('username')}
          subheader={post.time}
        />
        
               
                  <CardContent>
          <Typography component="p">
          {post.postText}
      
          </Typography>
          </CardContent>
                  <div>{post.postText}</div>
                  <CardContent>
                    
                  <Like
                   
                   comments={comments}          likes={likes}  postId={postId}
                 />
                  <CardMedia
       
          image={img64} alt="" />
          title="Paella dishes"
        /> <img src={img64} alt="" />
        <Typography component="p">
          Commnets:
      
          </Typography>
        <Comments onPostComments={this.postComments} comments={comments}
                postId={postId} />
                </CardContent>
                </div>
              );
            })}
          </div>
        }</div>
          
        <CardMedia
       
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        />
        <CardContent>
          <Typography component="p">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
            Hello ========
      
          </Typography>
        </CardContent>
        <CardActions  disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton
           
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            Hello ========
          <div>
            
        {this.state.data.map((post, index) => {
            var postId=post.postID
            console.log(postId)
            var likes=post.likes
            var comments=post.comments
            console.log(comments)
          return (
            <div key={index}>
            
            {/*   <div>{post.postText}</div> */}
              <img src={post.message.slice(0,post.message.length - 1).replace("\"","")} alt="" />
           
           
              <Comments onPostComments={this.postComments} comments={comments}
                postId={postId} />
              
                  <div>
           <div>   {comments.map((comment, index) => {
               console.log(comment)
       
          const commentId=comment._id
        
              return ( <div key={index}>

{comment.userId}
{comment.commentText}
{/*   <Like commentId={commentId}></Like> */}
                </div>
              );
            })}
          </div>
       
      <label htmlFor="exampleFormControlTextarea1">Comment</label>
      <textarea className="form-control" id="exampleFormControlTextarea1"  onChange={this.onChangeComment.bind(this)} value={this.state.comment}   rows="3"></textarea>
      <button type="button"  onClick={this.addComment.bind(this,postId)}>post</button>
      </div>);
            </div>
          );
        })}
      </div>
          </CardContent>
        </Collapse>
            </Card>)
            </div>
           
            
        )}

}
class Comments extends  React.Component {

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
  this.props.onPostComments(this.state,postId)
  this.setState({
    comment:"",
  
  })
    console.log('do validate');
  }

  render() {

    const { postId,comments } = this.props;
    console.log("hi")
    console.log(postId)
    console.log(comments)
   
    return (
      <div>
           <div>   {comments.map((comment, index) => {
               console.log(comment)
               var  url="http://localhost:8000/"+comment.userId+".jpg";
          const commentId=comment._id
        
              return ( 
                
              <div key={index}>
         
          <CardHeader
          avatar={
            <Avatar aria-label="Recipe"  rounded
            src={url} >
             
            </Avatar>
          }
          title={comment.userId}
          subheader={comment.time}
        />

{/* <CardHeader>{comment.userId}</CardHea/* der> */}
{/* <CardColumns>{comment.userId}</CardColumns>  */}
<CardContent>{comment.commentText}</CardContent>


{/*   <Like commentId={commentId}></Like> */}
                </div>
              );
            })}
          </div>
       
      <label htmlFor="exampleFormControlTextarea1">Comment</label>
      <textarea className="form-control" id="exampleFormControlTextarea1"  onChange={this.onChangeComment.bind(this)} value={this.state.comment}   rows="3"></textarea>
      <button type="button"  onClick={this.addComment.bind(this,postId)}>post</button>
      </div>
      );
  }
}

const styles = theme => ({
    card: {
      maxWidth: 400,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  });
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
  
   axios({
    method: 'post',
    url: 'http://localhost:8081/addPostLikes/',
    data: {username:localStorage.getItem('username'),/* 'commentId':commentId, */'postId':postId,'Likes':incrLikes},
    config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
  .then(response=>{  
       console.log(response);
       this.setState({postsfromFollowing :response.data});
  
  })}
  
     componentDidMount() {
      const { postId} = this.props;
     var  url= 'http://localhost:8081/getPostLikes/'
     const config = {
      params: {commentId:this.state.commentId,postId:postId,user:this.state.user}
    }
    $.get(url, {commentId:this.state.commentId,postId:postId,user:this.state.user})
 
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

export default withStyles(styles)(MyPosts);