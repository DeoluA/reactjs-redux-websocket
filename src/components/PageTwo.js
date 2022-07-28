// PageTwo.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import {setCloseRequestStatus} from "../webSockets/WebSocketHelpers";

class PageTwo extends Component {

    state = {
    };

    componentDidMount() {
    };

    componentDidUpdate() {        
    };

    
    render() {
        return (
            <div>
                <h1>This is page two!</h1>
                <h2>Websocket connection status: <em>{this.props.currentWebSocketStatus}</em></h2>
                <br /><br />
                {
                    this.props.currentWebSocketStatus === "connected" ?
                
                    (<h2 onClick={() => this.props.setCloseRequestStatus(true)}>
                        <Link to="#">Click here to close websocket connection</Link>
                    </h2>)
                    :
                    (<div>To open websocket, <Link to="/">simply go back home</Link></div>)
                }
            </div>
        )
    }

}

PageTwo = withRouter(PageTwo);

const mapStateToProps = state => {
    return {
        currentWebSocketStatus: state.webSocketReducer.currentWebSocketStatus
    }
}

const mapPropsToState = dispatch => {
    return {
        setCloseRequestStatus: payload => dispatch(setCloseRequestStatus(payload))
    }
}

PageTwo = connect(mapStateToProps, mapPropsToState)(PageTwo);


export default PageTwo;