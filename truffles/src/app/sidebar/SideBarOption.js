import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SideBarOption extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        lastMessage: PropTypes.string,
        active: PropTypes.bool,
        onClick: PropTypes.func
    }
    static defaultProps = {
        lastMessage: "",
        active:false,
        onClick: () => { }
    }
    render() {
        const { active, lastMessage, name, onClick } = this.props
        console.log(name)
        var named
        var namen
        if(name!==null)
        {namen=name
            named=name[0].toUpperCase()
        }
        console.log(named)
        return (
            <div 
                className={`user ${active && namen !== null? 'active':''}`}
                onClick={onClick}
                >
           <div className="user-photo">{named}</div>
             
                <div className="user-info">
                    <div className="name">{namen !== null ? namen : ''}</div>   <span className={namen === 'Community' &&namen !== null? 'offline' : 'online'}></span>
                    <div className="last-message">{lastMessage}</div>
                </div>
                
            </div>
           /*  <div 
            key={chat.id} 
            className={`user ${classNames}`}
            onClick={ ()=>{ setActiveChat(chat) } }
            >
            <div className="user-photo">{sidePanelUser[0].toUpperCase()}</div>
            <div className="user-info">
                <div className="name">{sidePanelUser}</div>
                {lastMessage && <div className="last-message">{lastMessage.message}</div>}
            </div>
            
        </div> */
        )
    }
}