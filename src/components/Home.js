// Home.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import {setOpenRequestStatus, setCloseRequestStatus} from "../webSockets/WebSocketHelpers";

class Home extends Component {

    state = {
        messagesReceived: []
    };

    componentDidMount() {
        this.props.setCloseRequestStatus(false);
        // send request to open the websocket
        // This same command can be used in any of the pages or components.
        // It won't open multiple connections. If one has already been created previously somewhere, the websocket wrapper will ignore, else it will (re)connect.
        this.props.setOpenRequestStatus(true);
    };

    componentDidUpdate(prevProps) {  
        // if a new websocket message comes in
        if(this.props.webSocketIncomingMessage && this.props.webSocketIncomingMessage.data && prevProps.webSocketIncomingMessage.timeStamp !== this.props.webSocketIncomingMessage.timeStamp) {
            if(!this.incomingMsgObj[this.props.webSocketIncomingMessage.timeStamp]) {
                this.incomingMsgObj[this.props.webSocketIncomingMessage.timeStamp] = this.props.webSocketIncomingMessage
            };
            this.treatWsMessages();
        };      
    };

    incomingMsgObj = {};
    treatWsMessages = () => {
        Object.keys(this.incomingMsgObj).forEach((eachKey) => {
            if(!this.incomingMsgObj[eachKey].isTreated) {
                this.incomingMsgObj[eachKey].isTreated = true;

                let received;
                // if it's JSON object that was stringified, this will work
                try{
                    received = JSON.parse(this.incomingMsgObj[eachKey].data);
                }
                // else, it's just a plain string
                catch(c) {
                    received = this.incomingMsgObj[eachKey].data;
                }

                /* do stuff with the message */
                let messagesReceived_copy = JSON.parse(JSON.stringify(this.state.messagesReceived));
                messagesReceived_copy.push(received);
                this.setState({
                    "messagesReceived": messagesReceived_copy
                });
            };
        });

        // if it gets too big, clear it, to save memory
        if(Object.keys(this.incomingMsgObj).length > 10) {
            this.incomingMsgObj = {};
        };
    };

    
    render() {
        return (
            <div>
                <h1>This is home!</h1>
                <h2>Websocket connection status: <em>{this.props.currentWebSocketStatus}</em></h2>
                <div>To close websocket, <Link to="/page-two">go to page two</Link></div>
                <h2>Number of messages received: {this.state.messagesReceived.length.toLocaleString()}</h2>
                {
                    this.state.messagesReceived.length > 0 ?
                    (
                        <ul>{
                            this.state.messagesReceived.map((eachMessage, eachKey) => {
                                return <li key={eachKey}>{eachMessage}</li>;
                            })
                        }</ul>
                    )
                    :
                    ""
                }

            </div>
        )
    }

}

Home = withRouter(Home);

const mapStateToProps = state => {
    return {
        webSocketIncomingMessage: state.webSocketReducer.webSocketIncomingMessage,
        currentWebSocketStatus: state.webSocketReducer.currentWebSocketStatus
    }
}

const mapPropsToState = dispatch => {
    return {
        setOpenRequestStatus: payload => dispatch(setOpenRequestStatus(payload)),
        setCloseRequestStatus: payload => dispatch(setCloseRequestStatus(payload))
    }
}

Home = connect(mapStateToProps, mapPropsToState)(Home);


export default Home;