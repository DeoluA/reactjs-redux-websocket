# reactjs-redux-websocket
Example code using websockets with ReactJS and Redux

# How to run
Clone repo, then:
- install modules: `npm i`
- start website: `npm start`

Don't forget to set your websocket url inside your environment file!
(or, if you want to play around, use the test websocket serve available at https://socketsbay.com/test-websockets )

# What this code can do

- all routes are wrapped in a `Websocket` component, so all other components can control/interact with the connection.
- connect/disconnect to a websocket server via function call
- once connected, it will automatically reconnect should connection be terminated, _unless told (via function call) to **not** reconnect_ (probably on session log out or something)
- incoming messages get propagated to `props`.