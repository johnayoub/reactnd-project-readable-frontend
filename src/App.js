import React, { Component } from 'react';
import Header from './components/Header';
import CategoryView from "./components/CategoryView";
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '@material/typography/dist/mdc.typography.css';
import './App.css';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div className="app-root">
                    <div className="app-header">
                        <Header/>
                    </div>
                    <div className="app-body">
                        <CategoryView/>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default connect()(App);