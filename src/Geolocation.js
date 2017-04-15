import React from 'react';
import {geolocated} from 'react-geolocated';

class Geolocation extends React.Component {
    render() {
        return !this.props.isGeolocationAvailable
            ? <div>Your browser does not support Geolocation</div>
            : !this.props.isGeolocationEnabled
                ? <div>Geolocation não habilitado</div>
                : this.props.coords
                    ? <div>{this.props.coords.latitude}{this.props.coords.longitude}</div>
                    : <div>Getting the location data&hellip;</div>;
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000
})(Geolocation);