import React from 'react';
import $ from "jquery";
import { Modal } from 'react-bootstrap';
class Logout extends  React.Component {
    constructor(props, context) {
        super(props, context);
        this.logouts = this.logouts.bind(this);
    }
     logouts(){
        console.log("logouts   completed ");
        localStorage.clear();

    } 
    
render() {
    $('#sessionWarningModal').hide();
    return (
        
        <div className="box">
            <div id="sessionWarningModal">
            <Modal.Dialog  animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Session Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body> 
          <p>Your session will expire in: <spam id='countDown'>countDownCounter</spam></p>
          </Modal.Body>
          <Modal.Footer>
          <button type="button" class="btn btn-outline pull-left" onclick="killSession();">Log Out</button>
                    <button type="button" class="btn btn-primary" onclick="renewSession();">Reload session</button>
          </Modal.Footer>
        </Modal.Dialog>
        </div>
             <button type="button" class="btn btn-outline pull-left" onclick="logout();">Log Out</button>
             <button type="button" class="btn btn-primary" onclick={this.logouts}>Logouts</button>
                <input type="submit" name="_action_Search" value="Login"
                           className="btn  btn-sm bg-light-blue-active pull-right" /*  authenticateUser={this.validateUser}  */onClick="logout();"/>
        </div>
    );
}
}
export default Logout;
var preLoadTimer;
// Timer to logout user - After warning message ends
var killTimer;
// How much seconds the warning message will wait before logout + some time for processing
var killSessionTimeout = 361;
// Timer to update the countdown info
var countDownTimer;
// Value in seconds that decrease during the warning message show
var countDownCounter = 360;
// Information of Web title
var currentTitle = document.title;
// Holds the actual session timeout from Spring server
var currentTimeoutInMillis;

// Function that runs OnLoad page and start the counter
$(function(){
    restartCount();
    $(".wrapper").click(function(e){
        resetTimeOut();
    });
});

// Get the session timeout information from App Server configuration set timer
function restartCount(){
    currentTimeoutInMillis =  $.ajax({
        type: "GET",
        url: "/sessionTimeoutInMilliseconds",
        async: false
    }).responseText;

    currentTimeoutInMillis -= (killSessionTimeout * 1000);

    window.clearTimeout(killTimer);
    window.clearInterval(countDownTimer);

    resetTimeOut();
    // Should refresh for the next round
    countDownCounter = 360;
}

// Method to reset the timer information based on banner click
function resetTimeOut(){
    window.clearTimeout(preLoadTimer);
    preLoadTimer = window.setTimeout(timeOutAdvise, currentTimeoutInMillis);
}

// Show the banner with timeout information and update timeout option
function timeOutAdvise(){
    if(countDownCounter<61)
    $('#sessionWarningModal').show()
        killTimer = window.setTimeout(killSession, (killSessionTimeout * 1000));
    countDownTimer = setInterval(updateCountDown, 1000);
}

// Simple function to show a countdown timer
function updateCountDown(){
    if(countDownCounter>0)
   { countDownCounter--;}
   if(countDownCounter===0)
   {
    $('#sessionWarningModal').hide();
    killSession()
   }
    $('#countDown').html(countDownCounter);
    document.title = "Session close in " + countDownCounter;
}

// Force a logout by redirect
function killSession(){
    window.clearInterval(countDownTimer);
   // localStorage.clear();
    // Spring security requires a post
   // $.ajax({url:'/logout',type:'post',data:{},success:function(data){window.location.href='/';}})
}

// Banner click to renew session getting the actual value from server and reset the timer
function renewSession(){
    restartCount();
    document.title = currentTitle;
    $('#sessionWarningModal').hide();
}
function  logout(){
    console.log("+++++++++++==")
    localStorage.clear();

}