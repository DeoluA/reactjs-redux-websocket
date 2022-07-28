/* eslint-disable default-case */
// WebSocketHelpers.js

// actions
    // one function to rule them all...
    const handleAll = (payload, useCase) => {
        return {
            type: useCase,
            payload: payload
        }
    };

    export const setWebSocketOfflineStatus = payload => (dispatch) => {
        dispatch( handleAll({ "returnedObj": payload }, "WEB_SOCKET_IS_CLOSED") );
    };

    export const loadNewMessage = payload => (dispatch) => {
        dispatch( handleAll({ "returnedObj": payload }, "WEB_SOCKET_NEW_MESSAGE") );
    };

    export const setMessageReadStatus = payload => (dispatch) => {
        dispatch( handleAll({ "returnedObj": payload }, "WEB_SOCKET_MESSAGE_IS_READ") );
    };

    export const setCloseRequestStatus = payload => (dispatch) => {
        dispatch( handleAll({ "returnedObj": payload }, "WEB_SOCKET_HAS_CLOSE_REQUEST") );
    };

    export const setOpenRequestStatus = payload => (dispatch) => {
        dispatch( handleAll({ "returnedObj": payload }, "WEB_SOCKET_HAS_OPEN_REQUEST") );
    };


    export const changeWebSocketStatus = payload => (dispatch) => {
        dispatch( handleAll({ "returnedObj": payload }, "WEB_SOCKET_CURRENT_STATUS") );
    };

// reducer
    const initialState = {
        webSocketIsClosed: false,
        webSocketIncomingMessage: { timeStamp: 0 },
        webSocketIncomingMessageIsRead: false,
        closeIsRequested: false,
        openIsRequested: false,
        currentWebSocketStatus: "disconnected"
    }

    export const WebSocketReducer = (state = initialState, action) => {

        switch (action.type) {

            case "WEB_SOCKET_IS_CLOSED":
                return {
                    ...state,
                    webSocketIsClosed: action.payload.returnedObj
                }

            case "WEB_SOCKET_NEW_MESSAGE":
                return {
                    ...state,
                    webSocketIncomingMessage: action.payload.returnedObj
                }

            case "WEB_SOCKET_MESSAGE_IS_READ":
                return {
                    ...state,
                    webSocketIncomingMessageIsRead: action.payload.returnedObj
                }

            case "WEB_SOCKET_HAS_CLOSE_REQUEST":
                return {
                    ...state,
                    closeIsRequested: action.payload.returnedObj
                }

            case "WEB_SOCKET_HAS_OPEN_REQUEST":
                return {
                    ...state,
                    openIsRequested: action.payload.returnedObj
                }

            case "WEB_SOCKET_CURRENT_STATUS":
                return {
                    ...state,
                    currentWebSocketStatus: action.payload.returnedObj
                }

        }

        return state

    };