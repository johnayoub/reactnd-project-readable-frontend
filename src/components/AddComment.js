import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AddComment extends Component {
    handleAddComment = () => {
        const value = this.input.getValue();
        const input = this.input.getInputNode();

        if (!value) {
            return;
        }

        this.props.addComment(this.props.postId,
            {getValue: () => input.value, setValue: (value) => input.value = value});
    };

    render() {
        return (
            <div className="add-comment">
                <TextField floatingLabelText='Add comment'
                           fullWidth={true}
                           multiLine={true}
                           rows={3}
                           name='comment'
                           ref={(input) => this.input = input}/>
                <RaisedButton label='Post comment' primary={true} onClick={this.handleAddComment}
                              style={{marginTop: 10}}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addComment: (postId, input) => dispatch(actions.createComment(postId, input))
    };
};

export default connect(undefined, mapDispatchToProps)(AddComment);