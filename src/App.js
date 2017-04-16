import React from 'react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppRouter from './AppRouter';

class App extends React.Component {

    render() {
        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                    <AppRouter />
                </MuiThemeProvider>
            </div>
        );
    }

}

export default App;
