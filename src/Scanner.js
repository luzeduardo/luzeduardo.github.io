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
                    width: 640,
                    height: 480,
                    facingMode: "environment"
                }
            },
            locator: {
                patchSize: "small",
                halfSample: false
            },
            numOfWorkers: navigator.hardwareConcurrency,
            decoder: {
                readers : [ "ean_reader"]
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
        // Quagga.CameraAccess.enumerateVideoDevices().then(function(devices) { console.log(devices)});
        Quagga.onDetected(this._onDetected.bind(this));
    }

    componentWillUnmount() {
        Quagga.offDetected(this._onDetected.bind(this));
    }

    _onDetected(result) {
        this.props.onDetected(result);
        // Quagga.stop();
    }
}

Scanner.propTypes = {
    onDetected: PropTypes.func.isRequired
}
export default Scanner;