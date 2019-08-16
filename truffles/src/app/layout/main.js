import React from "react";
import ReactDOM from "react-dom";
import {Route, Router, Switch} from "react-router-dom";
import { Redirect } from 'react-router';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {teal, orange} from '@material-ui/core/colors'
import UserDetails from '../userDetails.js'
import { hot } from 'react-hot-loader'
// import MessageModificationDetail from "components/messageModification/messageModificationDetail";
// import MessageModificationEdit from "components/messageModification/messageModificationEdit";
// import MessageModificationList from "components/messageModification/messageModificationList";
// import MessageModificationSelect from "components/messageModification/messageModificationSelect";
import $ from 'jquery';
import Login from '../login/login';
import Footer from './footer';
import Register from './../login/register';
import Home from '../home/home';
import { BrowserRouter } from 'react-router-dom'; 
import MyPosts from './../posts/myposts';
class AppLayout extends React.Component{
   
constructor(props){  
  super(props);
  const { authenticated } = this.props;
  console.log(authenticated)
this.state={ 
  authenticated:Boolean
  
  }}

  validateUser(authenticated){
  console.log("#@@@@@@@@@@@@@")
  this.setState(
    {
      authenticated: authenticated
    
    })

}



    render() {
      const { authenticated } = this.props;
      var auth=this.state.authenticated

      console.log(authenticated)
      console.log(auth)
        function PrivateRoute({component: Component, authenticated, ...rest}) {
          
          console.log("auth #################")
            return (
              <Route
                {...rest}
                render={(props) => authenticated === true|| localStorage.getItem("authenticated")
                  ? <Component {...props} />
                  : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
              />
            )
          }
        return(
            <div className="wrapper">
            
                <Switch history={BrowserRouter}>
                <MuiThemeProvider theme={theme}>
                 {/*    <Route exact path="/" authenticated={this.state.authenticated}  loginUser={this.validateUser.bind(this)}  component={Login} /> */}
                   <Route  exact path="/" render={(props) =><Login  {...this.props} {...props} authenticated={this.state.authenticated}  loginUser={this.validateUser.bind(this)}/>} />
                     <Route exact path="/register" render={()=><Register/>}/>
                    {/*  <Route exact path="/home" render={()=><Home/>}/> */}
                  {/*    <PrivateRoute path='/home' component={Home} /> */}
                     <PrivateRoute authenticated={this.state.authenticated} path='/home' component={Home} user={this.state.user}/>
                     <Route exact path="/posts" render={()=><MyPosts  /* currentUser={currentUser} *//>}/>
                     <Route exact path="/userdetails" render={()=><UserDetails  /* currentUser={currentUser} *//>}/>
                    
              </MuiThemeProvider>
                </Switch>
                <Footer />
            
            </div>
        );
    }
}

const theme = createMuiTheme({
  palette: {
    primary: {
    light: '#52c7b8',
    main: '#009688',
    dark: '#00675b',
    contrastText: '#fff',
  },
  secondary: {
    light: '#ffd95b',
    main: '#ffa726',
    dark: '#c77800',
    contrastText: '#000',
  },
    openTitle: teal['700'],
    protectedTitle: orange['700'],
    type: 'light'
  }
})


export default AppLayout;
