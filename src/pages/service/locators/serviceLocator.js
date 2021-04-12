/* eslint-disable max-len */
import React from 'react';
import {
    Grid, withStyles,
} from '@material-ui/core';
import { func, object, array } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MapContainer from '../../booking/SelectLocation/Partials/MapContainer';
import { setLocationData } from '../../../state/ducks/Booking/Booking-Actions';
import SectionTitle from '../../../app/Components/SectionTitle';
import ConnectedLocationSelection from '../../booking/SelectLocation/Partials/LocationNearbyFavourite';
import ConnectedLocatorMixoGlass from './LocatorMixoGlass';

const styles = () => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        maxWidth: '1903px',
        height: '800px',
        position: 'relative',
        margin: 'auto',
        marginBottom: '20px',
    },
    mapContainer: {
        width: '100%',
        '& > div:first-child': {
            height: '100%',
        },
    },
    leftContent: {
        width: '573px',
        overflowY: 'scroll',
        minWidth: '350px',
        padding: '20px',
        backgroundColor: '#FFFFFF',
    },
    searchField: {
        display: 'flex',
        flexDirection: 'row',
        height: '40px',
        paddingTop: '10px',
        marginBottom: '20px',
    },
    searchFieldHeight: {
        height: '100%',
    },
    searchButton: {
        marginTop: '-5px',
        background: '#54575A',
        borderRadius: '0px',
        color: '#FFFFFF',
        fontSize: '13px',
        width: '79px',
        height: '35px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'rgb(58, 60, 62);',
        },
    },
    locationTypeButton: {
        width: '50%',
        borderRadius: '0',
        boxSizing: 'border-box',
        height: '38px',
        borderLeft: '1px solid #E5E5E5',
        borderRight: '1px solid #E5E5E5',
        borderBottom: '1px solid #E5E5E5',
        borderTop: '5px solid transparent',
        textTransform: 'none',
        backgroundColor: '#E5E5E5',
    },
    selected: {
        borderTop: '5px solid #FFDD30',
        backgroundColor: '#ffffff',
        fontWeight: '800',
    },
    locationMap: {
        padding: '12px 0px 12px 0px',
    },
    notFoundLocator: {
        backgroundColor: '#F9F9F9',
        borderTop: '1px solid #D1D1D1',
        width: '393px',
        height: '195px',
    },
    notResultFoundCopy: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#767676',
        fontFamily: 'AvenirNext',
        marginTop: '54px',
    },
    searchAnotherLocation: {
        textAlign: 'center',
        fontSize: '18px',
        color: '#767676',
        fontFamily: 'AvenirNext',
    },
    displayFlex: {
        display: 'flex',
    },
});

const ServiceLocator = ({
    classes, goToNextPage, setLocation, marketingComponentCollection, storeCollectionData,
}) => {
    const onLocationSelect = (location) => {
        setLocation(location);
        goToNextPage();
    };

    const LocatorShopTitle = marketingComponentCollection.title || '';
    return (
        <>
            <SectionTitle title={LocatorShopTitle} />
            <Grid className={classes.container}>
                <ConnectedLocationSelection locationData={storeCollectionData} onLocationSelect={onLocationSelect} classes={classes} />
                <Grid className={classes.mapContainer}>
                    <MapContainer mapLocatorData={storeCollectionData} onLocationSelect={onLocationSelect} />
                </Grid>
            </Grid>
            <ConnectedLocatorMixoGlass marketingData={marketingComponentCollection} />
        </>

    );
};

ServiceLocator.propTypes = {
    classes: object.isRequired,
    goToNextPage: func.isRequired,
    setLocation: func.isRequired,
    marketingComponentCollection: object.isRequired,
    storeCollectionData: array.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    setLocation: bindActionCreators(setLocationData, dispatch),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(ServiceLocator));
