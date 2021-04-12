/* eslint-disable max-len */
import React from 'react';
import {
    Grid, Typography, withStyles,
} from '@material-ui/core';
import { array, func, object } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Media from 'react-media';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import MapContainer from './Partials/MapContainer';
import { setLocationData } from '../../../state/ducks/Booking/Booking-Actions';
import SectionTitle from '../../../app/Components/SectionTitle';
import ConnectedLocationSelection from './Partials/LocationNearbyFavourite';
import { MOBILE_BREAKPOINT } from '../../../Helpers/breakpoints';

const styles = (theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        maxWidth: '1600px',
        height: '580px',
        position: 'relative',
        margin: 'auto',
        marginBottom: '20px',
    },
    mapContainer: {
        width: '100%',
        '& > div:first-child': {
            height: '100%',
        },
        [theme.breakpoints.down('sm')]: {
            '& > div:first-child': {
                height: '360px',
            },
        },
    },
    leftContent: {
        width: '40%',
        overflowY: 'scroll',
        minWidth: '350px',
        padding: '20px',
        backgroundColor: '#FFFFFF',
        [theme.breakpoints.down('sm')]: {
            height: '406px',
            minWidth: '581px',
        },
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            height: '337px',
            minWidth: '431px',
            padding: '0px 28px 10px 11px',
        },
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
    selectDrybarCopy: {
        background: '#FFFFFF',
        padding: '13px 2px 2px 2px',
        textAlign: 'center',
    },
});

const SelectLocation = ({
    classes, goToNextPage, setLocation, storeCollectionData,
}) => {
    const onLocationSelect = (location) => {
        setLocation(location);
        goToNextPage();
    };
    return (
        <>
            <Media query={{ maxWidth: 599 }}>
                {(matches) => (matches ? (
                    <>
                        {/* <SectionTitle title="SELECT A DRYBAR LOCATION" /> */}
                        <Grid className={classes.container}>
                            <Grid className={classes.mapContainer}>
                                <MapContainer mapLocatorData={storeCollectionData} onLocationSelect={onLocationSelect} />
                                <Grid className={classes.selectDrybarCopy}>
                                    <ExpandLessIcon />
                                    <Typography>
                                        Select a Drybar Shop
                                    </Typography>
                                </Grid>
                                <ConnectedLocationSelection locationData={storeCollectionData} onLocationSelect={onLocationSelect} classes={classes} />

                            </Grid>
                        </Grid>
                    </>

                ) : (
                    <>
                        <SectionTitle title="SELECT A DRYBAR LOCATION" />
                        <Grid className={classes.container}>
                            <ConnectedLocationSelection locationData={storeCollectionData} onLocationSelect={onLocationSelect} classes={classes} />
                            <Grid className={classes.mapContainer}>
                                <MapContainer mapLocatorData={storeCollectionData} onLocationSelect={onLocationSelect} />
                            </Grid>
                        </Grid>
                    </>

                )
                )}

            </Media>

        </>
    );
};

SelectLocation.propTypes = {
    classes: object.isRequired,
    goToNextPage: func.isRequired,
    setLocation: func.isRequired,
    storeCollectionData: array.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    setLocation: bindActionCreators(setLocationData, dispatch),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(SelectLocation));
