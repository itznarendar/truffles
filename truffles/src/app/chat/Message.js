import React, {Component} from 'react';
import './Message.css';
export default class Message extends Component {
  render() {
    return (
      <div className="message">
                <span className="message__author">
                    {this.props.message.userName}:
                </span>
        {this.props.message.message}
      </div>
    )
  }
}



/* import React from 'react';

const Message = (props) => {
    return (
        <div className="message">
            <div className="username">
                <b>{props.message.username}</b> :
            </div>

            <div className="data">
                {props.message.message.type === 'message' ? (
                    <div className="text">
                        {props.message.message.text}
                    </div>
                ) : (
                    <div className="image">
                        <img src={props.message.message.url} alt=""/>
                    </div>
                )}
            </div>

        </div>
    )
};

export default Message; */