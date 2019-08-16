import React from 'react';
//import FAVideo from 'react-icons/lib/fa/video-camera'
import { FaVideo } from "react-icons/fa";
import {FaUserPlus} from 'react-icons/fa'
/* import MdEllipsisMenu from 'react-icons/md' */
import { IoMdMenu } from "react-icons/io";
export default function({name, numberOfUsers}) {
	
	return (
		<div className="chat-header">
			<div className="user-info">
				<div className="user-name">{name}</div>
				<div className="status">
					<div className="indicator"></div>
					<span>{numberOfUsers ? numberOfUsers : null}</span>
				</div>
			</div>
			<div className="options">
				<FaVideo />
				<FaUserPlus />
				<IoMdMenu />
			</div>
		</div>
	);
	
}