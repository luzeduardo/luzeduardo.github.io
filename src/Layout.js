import React from 'react';
import Scanner from './Scanner';
import Result from './Result';

import {List} from 'material-ui/List';
import LinearProgress from 'material-ui/LinearProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentClear from 'material-ui/svg-icons/content/clear';

class Layout extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            scanning: false,
            results: [],
            codes: [],
            modalOpen: false
        }
    }

    _modalhandleChange = (event) => {
        this.setState({[event.target.id] : event.target.value});
    };

    _modalhandleOpen = () => {
        this.setState({modalOpen: true});
    };

    _modalhandleClose = () => {
        let modalProductName = this.state.modalProductName;
        let modalProductPrice = this.state.modalProductPrice;
        let modalProductDate = new Date().toString();

        let idx = this.state.results.length - 1;
        let results = this.state.results;
        let newResult = results[idx];

        newResult = Object.assign(newResult, {
            'productName': modalProductName,
            'productPrice': modalProductPrice,
            'productDate': modalProductDate
        });
        results[idx] = newResult;
        this.setState({
            modalOpen: false,
            results
        });
    };

    _scan() {
        this.setState({scanning: !this.state.scanning});
    }

    _onDetected(result) {
        if(!this.state.codes.includes(result.codeResult.code)){

            this._modalhandleOpen();

            this.setState({
                codes: this.state.codes.concat([result.codeResult.code]),
                results: this.state.results.concat([result]),
                scanning: false,
                modalProductName: "",
                modalProductPrice: "",
                modalProductDate: ""
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
        const style = {
          margin: 0,
          top: 'auto',
          right: 20,
          bottom: 20,
          left: 'auto',
          position: 'fixed'
        };

        const modalActions = [
            <FlatButton
                label="Ok"
                primary={true}
                disabled={this.state.modalProductPrice === ""  || this.state.modalProductName === ""}
                keyboardFocused={true}
                onTouchTap={this._modalhandleClose}
            />,
        ];

        return (
            <div>
                {this.state.scanning ? <LinearProgress mode="indeterminate" /> : null }

                <List>
                    {this.state.results.map((result, index) => (
                        <Result onItemTouchTap={this._onItemTouchTapDeleter.bind(this, result)} key={index} result={result} />
                    ))}
                </List>
                {this.state.scanning ? <Scanner onDetected={this._onDetected.bind(this)}/> : null}

                <Dialog
                    title="Informe"
                    actions={modalActions}
                    modal={true}
                    open={this.state.modalOpen}
                    onRequestClose={this._modalhandleClose}>

                    <TextField
                        id="modalProductName"
                        hintText="Nome produto"
                        fullWidth={false}
                        onChange={this._modalhandleChange}/>

                    <TextField
                        id="modalProductPrice"
                        hintText="Valor"
                        fullWidth={false}
                        type="tel"
                        onChange={this._modalhandleChange}/>
                </Dialog>

                <FloatingActionButton
                  secondary={this.state.scanning }
                  onClick={this._scan.bind(this)}
                  style={style}>
                  { !this.state.scanning ? <ContentAdd /> : <ContentClear /> }
                </FloatingActionButton>

            </div>
        )
    }
}

export default Layout;
