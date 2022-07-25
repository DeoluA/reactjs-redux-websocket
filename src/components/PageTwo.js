// PageTwo.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

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
                <Link to="/">Go back home</Link>
            </div>
        )
    }

}

PageTwo = withRouter(PageTwo);

const mapStateToProps = state => {
    return {
    }
}

const mapPropsToState = dispatch => {
    return {
    }
}

PageTwo = connect(mapStateToProps, mapPropsToState)(PageTwo);


export default PageTwo;