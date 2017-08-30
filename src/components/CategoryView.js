import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PostList from "./PostList";
import PropTypes from 'prop-types';

class CategoryView extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        return (
            <div className="view view-category">
                <PostList posts={this.props.posts}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts.map(post => ({
            ...post,
            createdOn: new Date(post.timestamp)
        }))
    };
};

const mapDispatchToProps = dispatch => ({
    fetchPosts: () => dispatch(actions.fetchPosts())
});

CategoryView.PropTypes = {
    category: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);