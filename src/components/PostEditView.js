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

    setRequiredErrorIfEmpty = (validation) => {
        const errorMessages = [];

        let newValue, fieldName, errorCount = 0;

        for(let v of validation) {
            [fieldName, newValue] = v;

            const errorMessage = !newValue ? 'Required' : '';

            if (errorMessage) {
                errorCount += 1;
            }

            errorMessages.push({
                [fieldName]: errorMessage
            });
        }

        this.props.setErrors(errorMessages);

        return errorCount;
    };

    handleTextFieldChange = (event, newValue) => {
        const fieldName = event.target.name;

        this.setRequiredErrorIfEmpty([[fieldName, newValue]]);

        this.props.setPost({
            [fieldName]: newValue
        });
    };

    handleSelectChange = (event, index, value) => {
        this.setRequiredErrorIfEmpty([['category', value]]);

        this.props.setPost({
            category: value
        });
    };

    handleCancel = () => {
        const { post } = this.props;

      if (this.postId) {
          this.props.history.push(`/${post.category}/${post.id}`);

          return;
      }

      this.props.history.push('/');

    };

    handleSubmit = () => {
        const keys = Object.keys(this.props.errors);

        // validate input
        if (keys.length !== 0) {
            const errorCount = this.setRequiredErrorIfEmpty(keys.map(key => {
                return [key, this.props.post[key]]
            }));

            if (errorCount > 0) {
                return;
            }
        }

        if (this.postId) {
            this.props.editPost(this.postId, this.props.post);

            return;
        }

        this.props.createPost(this.props.post);
    };

    render() {
        const { post, categories, errors } = this.props;

        return (
            <form className="form" name="post-form">
                <div className="form-group">
                    <TextField floatingLabelText="Title" name="title" onChange={this.handleTextFieldChange}
                               value={post.title} errorText={errors.title}/>
                </div>
                <div className="form-group">
                    <TextField floatingLabelText="Body" name="body"
                               fullWidth={true} multiLine={true} onChange={this.handleTextFieldChange}
                               value={post.body} errorText={errors.body}/>
                </div>
                <div className="form-group">
                    <TextField floatingLabelText="Author" name="author" onChange={this.handleTextFieldChange}
                               value={post.author} errorText={errors.author}/>
                </div>
                <div className="form-group">
                    <SelectField floatingLabelText="Category" value={post.category}
                                 onChange={this.handleSelectChange}
                                 errorText={errors.category}>
                        {categories.map(category => (
                            <MenuItem key={category.path} value={category.path}
                                      primaryText={category.name}/>
                        ))}
                    </SelectField>
                </div>
                <RaisedButton label="Cancel" onClick={this.handleCancel} style={{marginRight: 10}}/>
                {' '}
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
        editPost: (postId, post) => dispatch(actions.editPost(postId, post)),
        setErrors: (errors) => dispatch(actions.setEditPostError(errors))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostEditView);