import React, { Component } from 'react';
import Header from './components/Header';
import CategoryView from "./components/CategoryView";
import PostDetailsView from './components/PostDetailsView';
// import PostEditView from './components/PostEditView';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '@material/typography/dist/mdc.typography.css';
import './App.css';
import { withRouter } from 'react-router';
import RefreshIndicator from 'material-ui/RefreshIndicator';

class App extends Component {
    render() {
        const {viewLoading} = this.props;

        const style = {
            container: {
                position: 'relative',
                textAlign: 'center',
                display: viewLoading ? 'block' : 'none'
            },
            refresh: {
                display: 'inline-block',
                position: 'relative'
            }
        };

        return (
            <MuiThemeProvider>
                <div className="app-root">
                    <div className="app-header">
                        <Header/>
                    </div>
                    <div className="app-body">
                        <div style={style.container}>
                            <RefreshIndicator
                                size={40}
                                left={10}
                                top={0}
                                status={viewLoading ? "loading" : "hide"}
                                style={style.refresh}
                            />
                        </div>
                        <div className={viewLoading ? "view-loading" : ""}>
                            <Switch>
                                {/*<Route exact path="/posts/new" component={PostEditView}/>*/}
                                {/*<Route exact path="/posts/:postId/edit" component={PostEditView}/>*/}
                                <Route exact path="/:category/:postId" component={PostDetailsView}/>
                                <Route exact path="/:category?" component={CategoryView}/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => {
    return {
        viewLoading: state.ui.viewLoading
    };
};

export default withRouter(connect(mapStateToProps)(App));