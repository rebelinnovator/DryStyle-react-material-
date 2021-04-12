/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import {
    Button, Grid, withStyles,
} from '@material-ui/core';
import {
    array, bool, func, number, object,
} from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setBookingService } from '../../../../state/ducks/Booking/Booking-Actions';
import { getNumberOfGuests, getServicesData, isGuestWithDifferentServices } from '../../../../state/ducks/Booking/Booking-Selectors';

const styles = () => ({
    container: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
    },
    containerMargin: {
        margin: '0px 24px 49px 24px',
    },
    serviceName: {
        fontSize: '18px',
        fontWeight: '800',
    },
    differentServicesCardContainer: {
        backgroundColor: '#fff',
        width: '100%',
    },
    guestButton: {
        maxWidth: '100%',
        width: '100%',
        height: '37px',
        textTransform: 'none',
    },
    guestNameButtons: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#E5E5E5',
    },
    guestButtonSelected: {
        borderTop: '5px solid #FFDD30',
        backgroundColor: '#FFFFFF',
        fontWeight: '800',
    },
});

const SelectUserGuest = ({
    classes,
    selectedServices,
    setSelectedService,
    guests,
    isDifferentServiceEnabled,
    location,
    setSelectedUser,
}) => {
    const [selectedGuest, setSelectedGuest] = useState('Me');
    const isAddonsLocation = location?.pathname?.includes('addons');

    useEffect(() => {
        if (!guests && selectedServices?.length) {
            setSelectedService([selectedServices.find((s) => s.user === 'Me')] || []);
        }
    }, []);

    const guestNames = [];

    if (guests) {
        for (let i = 0; i < guests + 1; i += 1) {
            if (i === 0) {
                guestNames.push('Me');
            } else {
                guestNames.push(`Guest ${i}`);
            }
        }
    }

    const handleGuestSelect = (guestName) => {
        setSelectedGuest(guestName);
        setSelectedUser(guestName);
    };

    const findServiceByUser = (user) => selectedServices?.find((s) => s.user === user);
    return (
        <Grid className={isAddonsLocation ? classes.containerMargin : classes.container}>
            {guests ? (
                <Grid className={classes.differentServicesCardContainer}>
                    <Grid className={classes.guestNameButtons}>
                        {isDifferentServiceEnabled ? guestNames.map((guestName) => (
                            <Button
                                className={`${classes.guestButton} ${selectedGuest === guestName ? classes.guestButtonSelected : ''}`}
                                variant="outlined"
                                onClick={() => handleGuestSelect(guestName)}
                            >
                                {`${guestName} ${findServiceByUser(guestName) ? ` - ${findServiceByUser(guestName).data.Name}` : ''}`}
                            </Button>
                        )) : null}
                    </Grid>

                </Grid>

            ) : null}
        </Grid>
    );
};

SelectUserGuest.propTypes = {
    classes: object.isRequired,
    selectedServices: array.isRequired,
    setSelectedService: func.isRequired,
    guests: number.isRequired,
    isDifferentServiceEnabled: bool.isRequired,
    location: object.isRequired,
};

const mapStateToProps = (state) => ({
    selectedServices: getServicesData(state),
    guests: getNumberOfGuests(state),
    isDifferentServiceEnabled: isGuestWithDifferentServices(state),
});

const mapDispatchToProps = (dispatch) => ({
    setSelectedService: bindActionCreators(setBookingService, dispatch),
});

const enhance = compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(SelectUserGuest);
