import React from 'react';
import Quagga from 'quagga';
import PropTypes from 'prop-types';

class Scanner extends React.Component {

    render() {
        return (
            <div id="interactive" className="viewport"/>
        );
    }

    componentDidMount() {
        Quagga.init({
            inputStream: {
                type : "LiveStream",
                constraints: {
                    width: 408,
                    height: 392,
                    facing: "environment"
                }
            },
            locator: {
                patchSize: "medium",
                halfSample: true
            },
            numOfWorkers: navigator.hardwareConcurrency > 1 ? navigator.hardwareConcurrency-1 : 1,
            decoder: {
                readers : [ "ean_reader"]
            },
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