/* eslint-disable max-len */
import {
    Button, Grid, Typography, withStyles,
} from '@material-ui/core';
import {
    func, object, shape, string,
} from 'prop-types';
import { withRouter } from 'react-router-dom';
import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import MapSideBarVector from '../../../../assets/images/mapVector.svg';

const styles = () => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        padding: '16px',
        justifyContent: 'space-between',
    },
    locationName: {
        fontWeight: '800',
        margin: '16px 0',
        marginRight: '8px',
    },
    distance: {
        margin: '6px 14px 6px 38px',
        color: '#989898',
    },
    textWrapper: {
        display: 'flex',
        alignItems: 'center',
        lineHeight: '1.5',
        // marginBottom:'10px!important'
    },
    textWriapperDiv:{
        marginBottom:'10px'
    },
    icon: {
        marginRight: '15px',
        alignSelf: 'flex-start',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    optionsButton: {
        color: '#989898',
    },
    optionsButtonsContainer: {
        padding: '13px 7px 13px 15px',
        backgroundColor: '#F9F9F9',
        color: '#989898',
    },
    locationCardTopContainer: {
        backgroundColor: '#F9F9F9',
        borderTop: '1px solid #D1D1D1',
    },
    borderPixelLocation: {
        border: '1px solid #D1D1D1',
        margin: '0px 15px 0px 15px',
    },
    mapSelectionVector: {
        margin: '24px 26px 0px 0px',
    },
    bookMapLocation: {
        background: '#54575A',
        borderRadius: '0px',
        fontSize: '13px',
        width: '79px',
        height: '35px',
        textTransform: 'none',
        whiteSpace: 'nowrap',
        color: '#54575A',
        backgroundColor: '#FFDD30',
        '&:hover': {
            backgroundColor: '#b29a21',
        },
    },
});

const LocationCard = ({
    classes, onLocationSelect, locationData, location,
}) => {
    const isAccountShop = location.pathname.includes('/account/favorites');
    const shopAddressDetails = locationData?.contact || {};
    return (
        <Grid className={classes.locationCardTopContainer}>
            <Grid className={classes.container}>
                <Grid>
                    <div className={`${classes.textWriapperDiv}`}>
                        <Typography className={`${classes.textWrapper} ${classes.locationName}`}>
                            <InfoIcon className={classes.icon} />
                            {locationData.title}
                        </Typography>
                    </div>
                    <div className={`${classes.textWriapperDiv}`}>
                        <Typography className={classes.textWrapper}>
                            <LocationOnOutlinedIcon className={classes.icon} />
                            {shopAddressDetails.street1}
                            {' '}
                            {shopAddressDetails.city}
                            {' '}
                            {shopAddressDetails.region}
                            {' '}
                            ,
                            {' '}
                            {shopAddressDetails.state}
                            {' '}
                            {shopAddressDetails.postalCode}
                        </Typography>
                    </div>
                    <Typography className={classes.distance}>
                        {/* {distance} */}
                    </Typography>
                </Grid>
                <Grid className={classes.buttonContainer}>
                    <Button onClick={() => onLocationSelect(locationData)} className={classes.bookMapLocation} variant="outlined">
                        {isAccountShop ? 'View Shop' : 'Book'}
                    </Button>
                    <img src={MapSideBarVector} alt="map-vector" className={classes.mapSelectionVector} />
                    <Button>
                        Get Directions
                    </Button>
                </Grid>
            </Grid>
            <Grid className={classes.borderPixelLocation} />
            <Grid className={classes.optionsButtonsContainer}>
                {/* <Button variant="text" className={classes.optionsButton}>
                More Details
            </Button> */}
                <Typography>{locationData.information}</Typography>
            </Grid>
        </Grid>
    );
};

LocationCard.propTypes = {
    classes: object.isRequired,
    locationData: shape({
        title: string.isRequired,
        information: string.isRequired,
    }).isRequired,
    location: object.isRequired,
    onLocationSelect: func.isRequired,
};

export default withRouter(withStyles(styles)(LocationCard));
