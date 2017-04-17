import React from 'react';
import Quagga from 'quagga';
import PropTypes from 'prop-types';

class Scanner extends React.Component {

    _stopScan(){
      Quagga.stop();
    }

    render() {
        return (
            <div id="interactive" onClick={this._stopScan.bind(this)} className="viewport"/>
        );
    }

    componentDidMount() {
        Quagga.init({
            inputStream: {
                type : "LiveStream",
                constraints: {
                    width: 480,
                    height: 320,
                    facingMode: "environment"
                }
            },
            locator: {
                patchSize: "small",
                halfSample: false
            },
            numOfWorkers: navigator.hardwareConcurrency > 1 ? navigator.hardwareConcurrency -1 : navigator.hardwareConcurrency ,
            decoder: {
                readers : [ "ean_reader"]
            },
            debug: {
                drawBoundingBox: false,
                showFrequency: false,
                drawScanline: false,
                showPattern: false
            },
            singleChannel: false,
            locate: true
        }, function(err) {
            // if (err.name === "NotAllowedError") {
            // }

            if (err) {
                return console.log(err);
            }
            Quagga.start();
        });
        Quagga.onDetected(this._onDetected.bind(this));
    }

    componentWillUnmount() {
        Quagga.offDetected(this._onDetected.bind(this));
    }

    _onDetected(result) {
        this.props.onDetected(result);
    }
}

Scanner.propTypes = {
    onDetected: PropTypes.func.isRequired
}
export default Scanner;
