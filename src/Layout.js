import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Scanner from './Scanner';
import Result from './Result';

import {List} from 'material-ui/List';

class Layout extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            scanning: false,
            results: []
        }
    }

    _scan() {
        this.setState({scanning: !this.state.scanning});
    }

    _onDetected(result) {
        this.setState({results: this.state.results.concat([result])});
    }

    _onItemTouchTapDeleter(key){
        let data = this.state.results.filter(x => x !== key);
        this.setState({results: data});
    }

    render() {
        return (
            <div>
                <RaisedButton label={this.state.scanning ? 'Parar leitura' : 'Ler código de barras'}
                              primary={!this.state.scanning }
                              secondary={this.state.scanning }
                              onClick={this._scan.bind(this)} />

                <List>
                    {this.state.results.map((result) => (
                        <Result onItemTouchTap={this._onItemTouchTapDeleter(result.codeResult.code)} key={result.codeResult.code} result={result} />
                    ))}
                </List>
                {this.state.scanning ? <Scanner onDetected={this._onDetected.bind(this)}/> : null}

            </div>
        )
    }
}

export default Layout;