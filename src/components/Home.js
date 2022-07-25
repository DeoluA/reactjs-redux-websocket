// Home.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

class Home extends Component {

    state = {
    };

    componentDidMount() {
    };

    componentDidUpdate() {        
    };

    
    render() {
        return (
            <div>
                <h1>This is home!</h1>
                <Link to="/page-two">Go to page two</Link>
            </div>
        )
    }

}

Home = withRouter(Home);

const mapStateToProps = state => {
    return {
    }
}

const mapPropsToState = dispatch => {
    return {
    }
}

Home = connect(mapStateToProps, mapPropsToState)(Home);


export default Home;