// WebSocketReducer.js
import React, { Component } from 'react';
import { connect } from "react-redux";

import {setWebSocketOfflineStatus, loadNewMessage, setOpenRequestStatus, changeWebSocketStatus} from "./WebSocketHelpers";

let ws_client, ws_intervalCounter = 1;

class WebSocketReducer extends Component {

    state = {
    }

    async componentDidMount() {
    }

    componentDidUpdate(prevProps) {
        if(this.props.closeIsRequested) {
            this.closeWebSocket();
        }

        if(this.props.openIsRequested) {
            // if one is already connected, then ignore
            if(ws_client && ws_client.readyState === WebSocket.OPEN) {
                // do nothing
                console.log("already open.");
                this.props.changeWebSocketStatus("connected");
            }
            else {
                this.connectWebSocket();
                this.props.setOpenRequestStatus(false);
            }
        }
    }

    

    connectWebSocket = () => {
        ws_client = new WebSocket(process.env.REACT_APP_WS_URL);
        this.props.changeWebSocketStatus("attempting connection...");

        ws_client.onopen = () => {
            console.log('opening websocket...');
            this.props.setWebSocketOfflineStatus(false);
            this.props.changeWebSocketStatus("connected");
        };

        ws_client.onmessage = (incoming) => {
            this.props.loadNewMessage(incoming);
        };

        ws_client.onerror = (event) => {
            console.log("error in websocket connection:", event);
        };

        // if it closes, reconnect but warn first
        ws_client.onclose = (event) => {
            this.props.changeWebSocketStatus("disconnected");
            // ...but only if it was NOT a user requested close:
            if(!this.props.closeIsRequested) {
                console.log("Websocket connection terminated. Attempting to reconnect...");
            	this.props.setWebSocketOfflineStatus(true);
                setTimeout(() => { this.connectWebSocket() }, 1000 * ws_intervalCounter); ws_intervalCounter++;
            };
        };

    };

    closeWebSocket = () => {
        console.log("closing websocket connection...");
        if(ws_client) {
            ws_client.close();
        };
        ws_client = undefined;
        this.props.changeWebSocketStatus("disconnected");
    };


    render() {
    	return <div>{this.props.children}</div>
    }
}


const mapPropsToState = state => {
    return {
        closeIsRequested: state.webSocketReducer.closeIsRequested,
        openIsRequested: state.webSocketReducer.openIsRequested
    }
}


const mapStateToProps = dispatch => {
    return {
        loadNewMessage: payload => dispatch(loadNewMessage(payload)),
        setWebSocketOfflineStatus: payload => dispatch(setWebSocketOfflineStatus(payload)),
        setOpenRequestStatus: payload => dispatch(setOpenRequestStatus(payload)),
        changeWebSocketStatus: payload => dispatch(changeWebSocketStatus(payload))
    }
}

export default connect(mapPropsToState, mapStateToProps)(WebSocketReducer);