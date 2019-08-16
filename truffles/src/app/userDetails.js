

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
import axios from 'axios';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';



    import React from 'react';
    import ReactDOM from 'react-dom';
    import { Link } from 'react-router-dom';
import LoadingSpinner from './utils/LoadingSpinner';
import Logout from './logout';

    class UserDetails extends React.Component{
    
    constructor(props){  
        super(props);
        this.state = { expanded: false, 
          authenticated:true,
          loading:true,
        data:[],
        getData:true
       };
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
  

     componentWillMount() {
      var load =localStorage.getItem('getReq')
      console.log(load)
      console.log(load==0)
      console.log(load===0)
      console.log(load==1)
    if(0==0)
    {

      axios.get('http://localhost:8081/postList/'+localStorage.getItem('userdetails')     
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
    render() {
            let img64
      if (this.state.data.length) {
        
        let renderItems = this.state.data.map(function(item, i) {
          console.log(item.message)
          img64 ='data:image/jpeg;base64,'+(item.message);
          console.log(img64)
          return <li key={i}>{item.postText}
          <div>{item.postText}</div>
          Image here
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
              var  url="http://localhost:8000/"+ localStorage.getItem('userdetails')+".jpg"
              img64 ='data:image/jpeg;base64,'+(post.message);
              return ( <div key={index}>
<CardHeader
          avatar={
            <Avatar aria-label="Recipe"  rounded
            src={url} >
             
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={localStorage.getItem('userdetails')}
          subheader={post.time}
        />
        
               
                  <CardContent>
          <Typography component="p">
          {post.postText}
      
          </Typography>
          </CardContent>
                  <div>{post.postText}</div>
                 
                  <CardMedia
       
          image={img64} alt="" />
          title="Paella dish"
        /> <img src={img64} alt="" />
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
          return (
            <div key={index}>
              <div>{post.postText}</div>
              <img src={post.message.slice(0,post.message.length - 1).replace("\"","")} alt="" />
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
  
export default withStyles(styles)(UserDetails);