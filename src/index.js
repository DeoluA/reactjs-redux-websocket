import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from "react-redux";
import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";


import Home from './components/Home';
import PageTwo from './components/PageTwo';

import WebSocketWrapper from "./webSockets/WebSocketWrapper";
import {WebSocketReducer} from "./webSockets/WebSocketHelpers";

class Root extends Component {

  render() {

    const rootReducer = combineReducers({
      webSocketReducer: WebSocketReducer
    });

    const composeEnhancer =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
      rootReducer,
      composeEnhancer(applyMiddleware(thunk))
    );

    return (
      <Provider store={store}>
        <WebSocketWrapper>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/page-two" component={PageTwo} />
            </Switch>

          </Router>
        </WebSocketWrapper>
      </Provider>
    )
  }

}


ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
