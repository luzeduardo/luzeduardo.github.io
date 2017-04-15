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
            results: [],
            codes: []
        }
    }

    _scan() {
        this.setState({scanning: !this.state.scanning});
    }

    _onDetected(result) {
        if(!this.state.codes.includes(result.codeResult.code)){
            this.setState({
                codes: this.state.codes.concat([result.codeResult.code]),
                results: this.state.results.concat([result]),
                scanning: false
            });
        }
    }

    _onItemTouchTapDeleter(result){
        let codes = this.state.codes.filter(key => result.codeResult.code === key);
        let results = this.state.results.filter(obj => result.codeResult.code !== obj.codeResult.code);

        this.setState({
            codes,
            results,
            scanning: false
        });
    }

    render() {
        return (
            <div>
                <RaisedButton label={this.state.scanning ? 'Parar leitura' : 'Ler código de barras'}
                              primary={!this.state.scanning }
                              secondary={this.state.scanning }
                              onClick={this._scan.bind(this)} />

                <List>
                    {this.state.results.map((result, index) => (
                        <Result onItemTouchTap={this._onItemTouchTapDeleter.bind(this, result)} key={index} result={result} />
                    ))}
                </List>
                {this.state.scanning ? <Scanner onDetected={this._onDetected.bind(this)}/> : null}

            </div>
        )
    }
}

export default Layout;