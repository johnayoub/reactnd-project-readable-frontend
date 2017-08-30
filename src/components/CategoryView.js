import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PostList from "./PostList";
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import sortBy from 'sort-by';

class CategoryView extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    handleSortField = (event, index, value) => {
        this.props.setSortField(value);
    };

    handleSortDirection = (event, index, value) => {
        this.props.setSortDirection(value);
    };

    render() {
        return (
            <div className="view view-category">
                <div className="view-controls-container">
                    <div className="view-controls view-controls-sort">
                        <SelectField value={this.props.sortField} floatingLabelText="Sort by"
                                     onChange={this.handleSortField}>
                            <MenuItem value="voteScore" primaryText="Vote score"/>
                            <MenuItem value="createdOn" primaryText="Created on"/>
                        </SelectField>
                        <SelectField value={this.props.sortDirection} floatingLabelText="Sort direction"
                                     onChange={this.handleSortDirection}>
                            <MenuItem value="asc" primaryText="A-Z"/>
                            <MenuItem value="desc" primaryText="Z-A"/>
                        </SelectField>
                    </div>
                </div>
                <PostList posts={this.props.posts}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const posts = state.posts.map(post => ({
        ...post,
        createdOn: new Date(post.timestamp)
    }));

    posts.sort(sortBy(`${state.ui.sortDirection === 'asc' ? '' : '-'}${state.ui.sortField}`));

    return {
        posts,
        sortField: state.ui.sortField,
        sortDirection: state.ui.sortDirection
    };
};

const mapDispatchToProps = dispatch => ({
    fetchPosts: () => dispatch(actions.fetchPosts()),
    setSortField: (field) => dispatch(actions.setSortField(field)),
    setSortDirection: (direction) => dispatch(actions.setSortDirection(direction))
});

CategoryView.PropTypes = {
    category: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);