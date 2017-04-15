import React, { Component } from 'react';
import './App.css';
import Scanner from './Scanner';
import Result from './Result';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

class App extends Component {

    constructor(props){
        super(props)
        this.state = {
            scanning: false,
            results: []
        }
    }

    render() {
        return (
            <div>

                    <button onClick={this._scan.bind(this)}>{this.state.scanning ? 'Stop' : 'Start'}</button>
                    <ul className="results">
                        {this.state.results.map((result) => (<Result key={result.codeResult.code} result={result} />))}
                    </ul>
                    {this.state.scanning ? <Scanner onDetected={this._onDetected.bind(this)}/> : null}

            </div>
        );
    }

    _scan() {
        this.setState({scanning: !this.state.scanning});
    }

    _onDetected(result) {
        this.setState({results: this.state.results.concat([result])});
    }

  // render() {
  //   return (
  //     <div className="App">
  //       <div className="App-header">
  //         <h2>Welcome</h2>
  //       </div>
  //     </div>
  //   );
  // }
}

export default App;
