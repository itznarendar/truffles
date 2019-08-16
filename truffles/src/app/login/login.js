/* import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'; */
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { client_id } from '../../config/client.json';
import { client_secret } from '../../config/client.json';
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT } from '../../Events'
import { Buffer } from 'buffer'
import qs from 'qs';
import { VERIFY_USER } from '../../Events'
const socketUrl = "http://localhost:3231"
/*import $ from 'jquery';
 import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Notifications, {notify} from 'react-notify-toast';
import Dialog from 'rc-dialog';
import { Button, ToastContainer, toast } from 'mdbreact'; */
//import { Modal } from 'react-bootstrap-modal';
//import { Modal } from 'react-bootstrap';
/* import { Modal,ModalManager,Effect} from 'react-dynamic-modal'; */
class Login extends  React.Component {
    
constructor(props){
    super(props);
    const { authenticated,login } = this.props;
  this.state={
  username:'',
  password:'',
  authenticated:Boolean,
  nickname:'',
  user:'',
  socket:null,
  
  }
  //localStorage.clear();
  this.handleusernameChange = this.handleusernameChange.bind(this);
        this.handlepasswordChange = this.handlepasswordChange.bind(this);
        this.signUp = this.signUp.bind(this);
        
 }
 signUp(){
    this.setState(this.baseState);
}

/* componentWillMount() {
  this.initSocket()
}
 */

// input change handlers
handlepasswordChange(e) {
    this.setState({
        password: e.target.value
    });
}

handleusernameChange(e) {
    this.setState({
        username: e.target.value
    });
}

a(){
  
  this.props.loginUser(true);
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  
}


login(e) {
 
    let headers = new Headers();    
    e.preventDefault();
    let data = qs.stringify({
        "grant_type": "password", 
        password: this.state.password,
        username: this.state.username
    })
    let url=  'http://localhost:8000/oauth/token';
    const options = {
        method: 'POST',
        url: url,
        data,
        headers: { "Content-Type": "application/x-www-form-urlencoded"},
        auth: {
            username:client_id,password:client_secret}
        ,
       
        /* url, */
      };
      
      axios(options).then((response)=> {
        ;
        console.log("response   $$$$$$$$$$$$$"+  this.state.username);
        console.log(response['data']);
        console.log("response   $$$$$$$$$$$$$");
        console.log(response.data['access_token']);
        localStorage.setItem('accessToken', response.data.access_token);
        

        localStorage.setItem('username',  this.state.username);
  console.log(this.state.username);
       /*  const [value, setValue] = React.useState(
            localStorage.getItem('accessToken') || ''
          );
        
          React.useEffect(() => {
            localStorage.setItem('accessToken', );
          },response.data['access_token']);
         */
        }).catch((err) => {
            console.log("some thing went wrong ocurred"+err);
          }) .catch(function (error) {
            console.log("Post Error : " +error);
          });
          console.log("user ##########auth"+localStorage.getItem('accessToken'));
          if(localStorage.getItem('accessToken')!==null){
            const { state = {} } = this.props.location;
            const { prevLocation } = state;
            console.log(localStorage.getItem('accessToken')===null);
            console.log(localStorage.getItem('accessToken')!==null);
            if(localStorage.getItem('accessToken')!==null)
        {    this.props.loginUser(true);
          console.log(this.state.username);
          localStorage.setItem("username",this.state.username)
          let uname=localStorage.getItem('username');
          console.log(localStorage.getItem('username')+uname);

          localStorage.setItem("authenticated",true)
          this.setState({nickname:this.state.username})
          const nickname=this.state.username
          //const { socket } = this.state
      
            this.setState(
              {                authenticated: true,
              
              },
              () => {
                console.log("user auth$$$$$$$$$$$$$"+prevLocation);
               
               this.props.history.push(prevLocation || "/home");
              },
            );}
          }
           
            console.log("user auth");
          }

        
        
  /*  axios.post(
        'http://localhost:8000+oauth/token', {
            headers: {                
                'content-type': 'application/x-www-form-urlencoded'
            }, auth: {
                username:this.client_id,password:client_secret}
            }, data: {
                password: this.state.password,
                username: this.state.username,
                grant_type: 'password',
                scope: 'read write',
                client_secret: client_secret,
                client_id:client_id
            }
        }); */
  /*   axios.post('http://localhost:8000/oauth/token',{"username":this.state.username,"password":this.state.password},{ headers: headers})
    .then((response)=> {

        console.log("response   $$$$$$$$$$$$$");
        console.log(response);}).catch((err) => {
            console.log("some thing went wrong ocurred"+err);
          }) */
       //   console.log("response   completed ");

  /*   this.setState({
        PartCondition: e.target.value
    }); */

render() {
  const { socket, user } = this.state
    return (
        <div className="box">
            <form>
                
                <div className="box-header  with-border">
                    <h3 className="box-title">
                       Login
                    </h3>
                    <div className="box-tools pull-right">
                        <button type="button" className="btn btn-box-tool" data-widget="collapse">
                            <i className="fa fa-minus"> </i>
                        </button>
                    </div>
                </div>
                <div className="box-body">

                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" name="username" className="form-control" id="username"
                                       value={this.state.username} onChange={this.handleusernameChange}
                                       placeholder="Enter Username"/>
                            </div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" className="form-control" id="password"
                                       value={this.state.password} onChange={this.handlepasswordChange}
                                       placeholder="Enter password"/>
                            </div>
                        </div>
                        </div>
                      
                    

                </div>
                <div className="box-footer">
                    <input type="submit" name="_action_Search" value="Login"
                           className="btn  btn-sm bg-light-blue-active pull-right"  socket={socket} user={user} logout={this.logout} /*  authenticateUser={this.validateUser}  */authenticated={this.state.authenticated} onClick={this.login.bind(this)}/>
                            <li><Link to="/register">Registration</Link></li>
                    <button type="button" className="btn btn-sm btn-primary pull-right" style={{marginRight: "5px"}} id="clear" onClick={this.signUp}>Sign Up</button>
                </div>
            </form>
        </div>
    );
} 
    /*  return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Login"
           />
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }  */
}
const style = {
 margin: 15,
};
export default Login;