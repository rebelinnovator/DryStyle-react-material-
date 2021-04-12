/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import {
    Map, GoogleApiWrapper, Marker, InfoWindow,
} from 'google-maps-react';
import {
    Button, ButtonBase, Grid, Typography, withStyles,
} from '@material-ui/core';
import { array, object, func } from 'prop-types';
import DirectionsOutlinedIcon from '@material-ui/icons/DirectionsOutlined';
import inactiveMarker from '../../../../assets/images/inactiveMarker.svg';
import phoneMapVector from '../../../../assets/images/phoneMapVector.svg';
import activeMarker from '../../../../assets/images/activePin.svg';

const styles = () => ({
    infoWindowContainer: {
        width: '304px',
        padding: '0 15px',
    },
    infoWindowText: {
        display: 'block',
        fontFamily: 'AvenirNext',
        marginBottom: '12px',
    },
    infoWindowHeading: {
        display: 'flex',
        margin: '16px 0',
        flexDirection: 'row',
        fontFamily: 'AvenirNext',
        fontSize: '18px',
        fontWeight: '600',
    },
    inforWindowAddress: {
        fontSize: '15px',
        marginBottom: '8px',
    },
    infoWindowDistance: {
        fontSize: '14px',
        color: '#989898',
    },
    selectMapLatitude: {
        background: '#54575A',
        borderRadius: '0px',
        fontSize: '13px',
        width: '79px',
        height: '45px',
        textTransform: 'none',
        color: '#54575A',
        backgroundColor: '#FFDD30',
        '&:hover': {
            backgroundColor: '#b29a21',
        },
    },
    displayInline: {
        display: 'flex',
        whiteSpace: 'nowrap',
        fontSize: '14px',
        justifyContent: 'space-between',
        alignContent: 'center',
        marginBottom: '5px',
    },
    marginRight: {
        marginRight: '5px',
    },
});

const mapStyle = [
    {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [
            {
                saturation: 36,
            },
            {
                color: '#333333',
            },
            {
                lightness: 40,
            },
        ],
    },
    {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [
            {
                visibility: 'on',
            },
            {
                color: '#ffffff',
            },
            {
                lightness: 16,
            },
        ],
    },
    {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#fefefe',
            },
            {
                lightness: 20,
            },
        ],
    },
    {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#fefefe',
            },
            {
                lightness: 17,
            },
            {
                weight: 1.2,
            },
        ],
    },
    {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
            {
                color: '#f5f5f5',
            },
            {
                lightness: 20,
            },
        ],
    },
    {
        featureType: 'landscape.natural.landcover',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#ffffff',
            },
        ],
    },
    {
        featureType: 'landscape.natural.terrain',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#ffffff',
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
            {
                color: '#f5f5f5',
            },
            {
                lightness: 21,
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
            {
                color: '#dedede',
            },
            {
                lightness: 21,
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#b1f1bb',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#ffffff',
            },
            {
                lightness: 17,
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#ffffff',
            },
            {
                lightness: 29,
            },
            {
                weight: 0.2,
            },
        ],
    },
    {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
            {
                color: '#ffffff',
            },
            {
                lightness: 18,
            },
        ],
    },
    {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [
            {
                color: '#ffffff',
            },
            {
                lightness: 16,
            },
        ],
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
            {
                color: '#f2f2f2',
            },
            {
                lightness: 19,
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
            {
                color: '#e9e9e9',
            },
            {
                lightness: 17,
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [
            {
                visibility: 'on',
            },
            {
                color: '#ade8ff',
            },
        ],
    },
];

const mapStyles = {
    width: '100%',
    height: '100%',
};

const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
};

const MapContainer = ({
    google, classes, onLocationSelect, mapLocatorData,
}) => {
    const [marker, setMarker] = useState({});
    const points = mapLocatorData.map((data) => ({ lat: Number(data?.contact?.coordinates?.[0]), lng: Number(data?.contact?.coordinates?.[1]) }));
    const markersAddress = marker?.contact || {};
    const _mapLoaded = (mapProps, map) => {
        map.setOptions({
            styles: mapStyle,
        });
    };

    const bounds = new google.maps.LatLngBounds();
    points.forEach((point) => bounds.extend(point));

    const handleClick = (e, data) => {
        setMarker(data);
        e.map.setZoom(15);
        e.map.setCenter(e.position);
    };

    const handleClose = () => {
        setMarker(null);
    };
    return (
        <Map
            google={google}
            containerStyle={containerStyle}
            zoom={14}
            style={mapStyles}
            initialCenter={
                {
                    lat: points?.[0]?.lat,
                    lng: points?.[0]?.lng,
                }

            }
            // bounds={bounds}
            onReady={(mapProps, map) => _mapLoaded(mapProps, map)}
        >
            {mapLocatorData.map((data) => (
                <Marker
                    key={`${Number(data?.contact?.coordinates?.[0])}`}
                    title={data.contact.street1}
                    name={data.title}
                    position={{ lat: Number(data?.contact?.coordinates?.[0]), lng: Number(data?.contact?.coordinates?.[1]) }}
                    icon={(Number(marker?.contact?.coordinates?.[0]) === Number(data?.contact?.coordinates?.[0])) && (Number(marker?.contact?.coordinates?.[1]) === Number(data?.contact?.coordinates?.[1])) ? activeMarker : inactiveMarker}
                    onClick={(e) => handleClick(e, data)}
                />
            ))}
            <InfoWindow
                off
                visible={marker}
                position={{ lat: marker?.contact?.coordinates?.[0] + 0.003, lng: marker?.contact?.coordinates?.[1] }}
                onClose={() => handleClose()}
            >
                <div className={classes.infoWindowContainer}>
                    <h3 className={classes.infoWindowHeading}>
                        {marker?.title}
                        <DirectionsOutlinedIcon style={{ marginLeft: '84px' }} />
                    </h3>
                    <span className={`${classes.infoWindowText} ${classes.inforWindowAddress}`}>
                        {markersAddress.street1}
                        {markersAddress.city}
                        {markersAddress.region}
                        ,
                        {markersAddress.state}
                        {' '}
                        {markersAddress.postalCode}

                    </span>
                    <Grid className={classes.displayInline}>
                        <Grid>
                            <span className={`${classes.infoWindowText} ${classes.infoWindowDistance}`}>
                                {marker?.distance}
                            </span>
                            <div className={classes.displayInline}>
                                <img src={phoneMapVector} alt="phone-vector" className={classes.marginRight} />
                                <span>{marker?.contact?.phoneNumber}</span>
                            </div>
                        </Grid>
                        <Grid>
                            <ButtonBase className={classes.selectMapLatitude} variant="outlined">
                                Select
                            </ButtonBase>
                        </Grid>
                    </Grid>
                </div>
            </InfoWindow>
        </Map>
    );
};

MapContainer.propTypes = {
    classes: object.isRequired,
    google: object,
    onLocationSelect: func.isRequired,
    mapLocatorData: array.isRequired,
};

MapContainer.defaultProps = {
    google: {},
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDKfzUhxvQz6v6Meo34CYtav4M2X-Wmx6I',
})(withStyles(styles)(MapContainer));
