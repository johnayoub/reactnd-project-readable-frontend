import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import * as actions from '../actions';

class PostEditView extends Component {
    constructor(props) {
        super(props);

        this.postId = this.props.match.params.postId;
    }

    componentDidMount() {
        this.props.loadPost(this.postId);
    }

    handleTextFieldChange = (event, newValue) => {
        this.props.setPost({
            [event.target.name]: newValue
        });
    };

    handleSelectChange = (event, index, value) => {
        this.props.setPost({
            category: value
        });
    };

    handleSubmit = event => {
        // TODO: validateFirst

        if (this.postId) {
            this.props.editPost(this.postId, this.props.post);

            return;
        }

        this.props.createPost(this.props.post);
    };

    render() {
        const {post, categories} = this.props;

        return (
            <form className="form" name="post-form">
                <div className="form-group">
                    <TextField floatingLabelText="Title" name="title" onChange={this.handleTextFieldChange}
                               value={post.title}/>
                </div>
                <div className="form-group">
                    <TextField floatingLabelText="Body" name="body"
                               fullWidth={true} multiLine={true} onChange={this.handleTextFieldChange}
                               value={post.body}/>
                </div>
                <div className="form-group">
                    <TextField floatingLabelText="Author" name="author" onChange={this.handleTextFieldChange}
                               value={post.author}/>
                </div>
                <div className="form-group">
                    <SelectField floatingLabelText="Category" value={post.category} onChange={this.handleSelectChange}>
                        {categories.map(category => (
                            <MenuItem key={category.path} value={category.path}
                                      primaryText={category.name}/>
                        ))}
                    </SelectField>
                </div>
                <RaisedButton label={this.postId ? "Update" : "Create"} primary={true}
                              onClick={this.handleSubmit}/>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state.editPost
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadPost: (postId) => dispatch(actions.loadPostEditViewContent(postId)),
        setPost: (post) => dispatch(actions.setEditPost(post)),
        createPost: post => dispatch(actions.createPost(post)),
        editPost: (postId, post) => dispatch(actions.editPost(postId, post))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostEditView);