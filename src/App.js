import React, { Component } from 'react';
import Header from './components/Header';
import PostList from "./components/PostList";
import { connect } from 'react-redux';
import * as actions from './actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '@material/typography/dist/mdc.typography.css';
import './App.css';

class App extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="app-root">
                    <div className="app-header">
                        <Header/>
                    </div>
                    <div className="app-body">
                        <PostList posts={this.props.posts}/>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts.map(post => ({
            ...post,
            timestamp: new Date(post.timestamp)
        }))
    };
};

const mapDispatchToProps = dispatch => ({
    fetchPosts: () => dispatch(actions.fetchPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);