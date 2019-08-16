import React from 'react';
import $ from 'jquery';
import axios from 'axios';
//import {NotificationContainer, NotificationManager} from 'react-notifications';
import Notifications, {notify} from 'react-notify-toast';
import Form from 'react-bootstrap/Form'
import { Modal,ModalManager,Effect} from 'react-dynamic-modal';


export default class Register extends React.Component {
    submitting;
    value;
    constructor(props) {
        super(props);
        this.state = {formFields: 
            {username: "",
            email : "",
            firstname: "",
            lastname: "",
        phone:"",
        dob:"",
        project:"",
        department:"",
        technology:"",
        manager:"",
        address:"",       
        profilepicPath:String,},
            stockLocationsdata: [],
            vendordata: [],
            partConditionsdata: [],
            status:"",
            phoneWarning:"",
            show:false,
        };

      this.handleLastnameChange = this.handleLastnameChange.bind(this);
        this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this); 
        this.handlePhoneChange = this.handlePhoneChange.bind(this); 
        this.handleconfirmpasswordChange = this.handleconfirmpasswordChange.bind(this); 
        this.clearForm = this.clearForm.bind(this);
       
       
        this.baseState = this.state;
        this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

   
    }
    handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
       
        this.setState({ show: true });
      
      }
    
    clearForm(){
        this.setState(this.baseState);
    }
    
    componentDidMount () {
        console.log("component did mount   about to call   calling  api methods");
       
                console.log("component did mount   after   calling  api methods");
    }
    // input change handlers
    handleLastnameChange(e) {
     /*    this.state.formFields.map(function(formField) {
            formField.Username=e.target.value;
        }); */
        this.state.formFields[e.target.name] = e.target.value;
    }

    handleFirstnameChange(e) {
        console.log("handleStockingLocationIdChange"+e.target.value);
       /*  this.state.formFields.map(function(formField) {
            formField.email=e.target.value;
        }); */
        this.state.formFields[e.target.name] = e.target.value;
    }

    handleEmailChange(e) {
       /*  this.state.formFields.map(function(formField) {
            formField.firstname=e.target.value;
        }); */
        this.state.formFields[e.target.name] = e.target.value;
    }
    handlePhoneChange(e) {
     
        this.state.formFields[e.target.name] = e.target.value;
     }
    handlePasswordChange(e) {
       /*  this.state.formFields.map(function(formField) {
            formField.lastname=e.target.value;
        }); */

       this.state.formFields[e.target.name] = e.target.value;
    }
    handleconfirmpasswordChange(e) {
     
        this.state.formFields[e.target.name] = e.target.value;
     }
    formHandler() {
     
        console.log(this.state.formFields);
        var self = this;
        console.log("http://localhost:8000/users  ----------->");
                 axios.post('http://localhost:8000/users',this.state.formFields)
                  .then((response)=> {
                    console.log("response   $$$$$$$$$$$$$");
                    console.log(response);
                    console.log(response.data+"  "+response.data.emailWarning+" "+response.data["emailWarning"]);
                  
                    if (response.status === 200&&response.data.emailWarning!==undefined) {
                        console.log("this.state"+this.state);
                        console.log(this.state);
                       // this.setState({status:  "RESPONSE TEXT"})
                       this.setState({ status: response.data.message });
                       const text = response.data.emailWarning;
                       response.data.emailWarning=undefined;
                       ModalManager.open(<MyModal text={text} onRequestClose={() => true}/>);
                       this.handleShow();
                      //  this.dialog.showAlert('Hello Dialog!');            
                    }
                    if (response.status === 200&&response.data.phoneWarning!==undefined) {
                        console.log("this.state"+this.state);
                        console.log(this.state);
                       // this.setState({status:  "RESPONSE TEXT"})
                       this.setState({ status: response.data.phoneWarning });
                       const text = response.data.phoneWarning;
                       response.data.phoneWarning=undefined;
                       ModalManager.open(<MyModal text={text} onRequestClose={() => true}/>);
                       this.handleShow();
                      //  this.dialog.showAlert('Hello Dialog!');            
                    }                    

                    if (response.status === 200&&(response.data.success1!==undefined|response.data.statusMessage!==undefined)) {
                        console.log("this.state"+this.state);
                       
                        console.log(this.state);
                       // this.setState({status:  "RESPONSE TEXT"})
                       let myColor = { background: '#0E1717', text: "#FFFFFF" };
                       notify.show( response.data.success1, "success", 1000, myColor);
                       response.data.success1=undefined;
                          
                    } 
                    else if (response.status === 409) {
                        console.log("created  successfully"+response.message);
                      
                        //  this.createNotification("error",response.message);
                          console.log("created  successfully");
                      }
                      
                  
                })
                 .catch((err) => {
                    console.log("some thing went wrong ocurred"+err);
                  }) ;
            }
            
    inputChangeHandler(e) {
        
        e.preventDefault();
        console.log( e.target.value);
        console.log( e.target.name);
        const formFields = [{...this.state.formFields}];
       let name= e.target.name;
       let value= e.target.value;
       console.log(formFields[e.target.name]);
 
     console.log(value);
    var name1= [e.target.name];
    console.log(name1);
    console.log(name1[0]);
    var key1=name1[0];
    console.log(key1);
 this.state.formFields.map(function(formField) {
  
      });

    const filteredItems = Object.keys(formFields).reduce( (accumulator, key) => (
        formFields[key].id === key1 ? accumulator : {...accumulator, [key]: formFields[key] }), {});   
        console.log(filteredItems); 
      console.log( this.state);
       }
   
       

    render() {
        console.log(this.state);
       
let formFields=this.state.formFields;
console.log(formFields);
        return ( 
            <div className="content-wrapper">
            <section className="content-header">
           
                <h1>
                 Truffles
                    <small>internl portal</small>
                </h1>
                <ol className="breadcrumb">
                    <li><a href="#"><i className="fa fa-dashboard"> </i> Login</a></li>                   
                    <li><a href="#/register">Register User</a></li>
                </ol>
            </section>
            <Notifications />
            <section className="content">
            <Notifications />
        <div className="box">

            <div className="box-header  with-border">
                <h3 className="box-title">
                  New User
                </h3>
                <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse">
                        <i className="fa fa-minus"> </i>
                    </button>
                </div>
            </div>
            <div className="box-body">
<form>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" name="firstname" className="form-control" id="firstname"
                            onChange= {this.handleFirstnameChange}
                            
                                   placeholder="Enter firstname"/>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" name="lastname" className="form-control" id="lastname"
                            onChange= {this.handleLastnameChange}
                            
                                   placeholder="Enter lastname "/>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="text" name="phone" className="form-control" id="phone"
                            onChange= {this.handlePhoneChange} placeholder="Enter mobile no."></input>
                            
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" name="email" className="form-control" id="email"
                            onChange= {this.handleEmailChange} placeholder="Enter email Id"></input>
                            
                        </div>
                    </div>
                    <div className="col-md-4">
                      
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" className="form-control" id="email"
                            onChange= {this.handlePasswordChange} placeholder="Enter password"></input>
                            
                        </div>
                      
                    </div>
                    <div className="col-md-4">
                    <div className="form-group">
                            <label> confirm Password</label>
                            <input type="password" name="confirmpassword" className="form-control" id="confirmpassword"
                            onChange= {this.handleconfirmpasswordChange} placeholder="confirm password"></input>
                            
                        </div>
                    </div>
                </div>
                </form>
       
        

            </div>
            <div className="box-footer">
            
            <button type="submit" className="btn btn-sm btn-primary pull-right" style={{marginRight: "5px"}} onClick={this.formHandler.bind(this)} >Register</button>
    
             
                <button type="button" className="btn btn-sm btn-primary pull-right" style={{marginRight: "5px"}} id="clear" onClick={this.clearForm}>Clear</button>
            </div>
        
    </div>
    </section>
    </div>
);
    }
}
class MyModal extends  React.Component {
    submitting;
    render(){
        

        console.log("My model");
       const { text,onRequestClose } = this.props;
       return (
          <Modal 
             onRequestClose={onRequestClose}
             effect={Effect.Newspaper} 
             className="Modal-overlay">
             <tr>{text}</tr>
             <tr align="right">  <button onClick={ModalManager.close}>Close Modal</button></tr>
          </Modal>
       );
    }
 }