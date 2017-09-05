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
        this.props.loadContent(this.props.match.params.category);
    }

    handleSortField = (event, index, value) => {
        this.props.setSortField(value);
    };

    handleSortDirection = (event, index, value) => {
        this.props.setSortDirection(value);
    };

    handleCategory = (event, index, value) => {
        this.props.history.push(`/${value}`);
    };

    render() {
        const categories = this.props.categories.map(category => {
            return <MenuItem key={category.path} value={category.path}
                             primaryText={category.name}/>;
        });

        const { category } = this.props.match.params;

        return (
            <div className="view view-category">
                <div className="view-controls-container">
                    <div className="view-controls view-controls-categories">
                        <SelectField value={category || ''} floatingLabelText="Category"
                                    onChange={this.handleCategory}>
                            <MenuItem value={''} primaryText="" />
                            {categories}
                        </SelectField>
                    </div>
                    <div className="view-controls view-controls-sort">
                        <SelectField value={this.props.sortField} floatingLabelText="Sort by"
                                     onChange={this.handleSortField}>
                            <MenuItem value="voteScore" primaryText="Vote score"/>
                            <MenuItem value="timestamp" primaryText="Created on"/>
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

const mapStateToProps = (state, props) => {
    const { match } = props;
    const sortField = state.ui.postSortField,
          sortDirection = state.ui.postSortDirection;

    // to - create a new array
    let posts = state.posts;

    if (match.params.category) {
        posts = posts.filter(post => post.category === match.params.category);
    }

    posts.sort(sortBy(`${sortDirection === 'asc' ? '' : '-'}${sortField}`));

    return {
        categories: [...state.categories],
        posts,
        sortField: sortField,
        sortDirection: sortDirection
    };
};

const mapDispatchToProps = dispatch => ({
    loadContent: (category) => dispatch(actions.loadCategoryViewContent(category)),
    setSortField: (field) => dispatch(actions.setPostSortField(field)),
    setSortDirection: (direction) => dispatch(actions.setPostSortDirection(direction))
});

CategoryView.PropTypes = {
    category: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);