import React, { Component } from 'react';
import Header from './components/Header';
import CategoryView from "./components/CategoryView";
import PostDetails from './components/PostDetailsView';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '@material/typography/dist/mdc.typography.css';
import './App.css';
import { withRouter } from 'react-router';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="app-root">
                    <div className="app-header">
                        <Header/>
                    </div>
                    <div className="app-body">
                        <Switch>
                            <Route exact path="/:category/:postId" component={PostDetails}/>
                            <Route exact path="/:category?" component={CategoryView}/>
                        </Switch>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withRouter(connect()(App));