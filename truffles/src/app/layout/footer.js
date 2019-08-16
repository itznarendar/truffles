/**
 * Created by narendar on 3/21/2019.
 */
import React from 'react';
import ReactDOM from 'react-dom';

class Footer extends React.Component{
    render() {
        return (
            <footer className="main-footer">
                <div className="pull-right hidden-xs">
                    Powered by Node + React
                </div>
                <strong>Copyright &copy; 2019 <a href="https://www.pennywisesolutions.com/">Pennywise</a>.</strong> All rights reserved.
            </footer>
        )
    }
}

export default Footer;