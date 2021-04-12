/* eslint-disable max-len */
import {
    Button, Checkbox, Grid, Typography, withStyles,
} from '@material-ui/core';
import {
    array,
    bool, func, number, object,
} from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { overwriteServicesData, setDifferentServiceEachUser } from '../../../state/ducks/Booking/Booking-Actions';
import ServiceButton from './Partials/ServiceButton';

const styles = (theme) => ({
    container: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
    },
    buttonsWrapper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        padding: '60px',
        [theme.breakpoints.down('sm')]: {
            padding: '20px',
        },
    },
    differentServicesCardContainer: {
        backgroundColor: theme.palette.common.white,
        width: '100%',
    },
    differentServiceCard: {
        padding: '32px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkbox: {
        marginRight: '40px',
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
        backgroundColor: theme.palette.secondary[100],
    },
    guestButtonSelected: {
        borderTop: `5px solid ${theme.palette.primary.main}`,
        backgroundColor: theme.palette.common.white,
        fontWeight: '800',
    },
});

const MultipleUserServices = ({
    classes,
    isDifferentServiceEnabled,
    guests,
    setDifferentServiceAction,
    selectedServices,
    services,
    overwriteServicesStateData,
    goToNextPage,
}) => {
    const [selectedGuest, setSelectedGuest] = useState('Me');

    /* =================== Complex logic -- Refactor ======================= */
    const findServiceByUser = (user) => selectedServices.find((s) => s.user === user);

    // Set the same service for alll users
    const setAllToSameService = (selected) => {
        const service = selected || findServiceByUser('Me')?.data;
        if (service) {
            const newServices = [];
            for (let i = 0; i < guests + 1; i += 1) {
                if (i === 0) {
                    newServices.push({ user: 'Me', data: service });
                } else {
                    newServices.push({ user: `Guest ${i}`, data: service });
                }
            }
            if (newServices?.length) {
                overwriteServicesStateData(newServices);
            }
        }
    };

    // Handle click check box, if disabled after getting enabled - reset
    const handleSelectDifferentService = (enabled) => {
        if (!enabled) {
            setAllToSameService();
        } else {
            overwriteServicesStateData([]);
        }
        setDifferentServiceAction(enabled);
    };

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

    /* ========================================= */

    return (
        <Grid className={classes.container}>
            {guests ? (
                <Grid className={classes.differentServicesCardContainer}>
                    <Grid className={classes.differentServiceCard}>
                        <Checkbox
                            checked={isDifferentServiceEnabled}
                            onClick={() => handleSelectDifferentService(!isDifferentServiceEnabled)}
                            className={classes.checkbox}
                        />
                        <Typography>
                            My guests and I will be will be getting different services
                        </Typography>
                    </Grid>
                    <Grid className={classes.guestNameButtons}>
                        {isDifferentServiceEnabled ? guestNames.map((guestName) => (
                            <Button
                                className={`${classes.guestButton} ${selectedGuest === guestName ? classes.guestButtonSelected : ''}`}
                                variant="outlined"
                                onClick={() => setSelectedGuest(guestName)}
                            >
                                {`${guestName} ${findServiceByUser(guestName) ? ` - ${findServiceByUser(guestName).data.Name}` : ''}`}
                            </Button>
                        )) : null}
                    </Grid>
                </Grid>
            ) : null}
            <Grid className={classes.buttonsWrapper}>
                {services.map((service) => (
                    <ServiceButton
                        selectedGuest={selectedGuest}
                        service={service}
                        isSelected={selectedServices.some((s) => s.user === selectedGuest && s.data?.Name === service.Name)}
                        differentServicesSelected={isDifferentServiceEnabled}
                        guests={guests}
                        setAllToSameService={setAllToSameService}
                        goToNextPage={goToNextPage}
                    />
                ))}
            </Grid>
        </Grid>
    );
};

MultipleUserServices.propTypes = {
    classes: object.isRequired,
    isDifferentServiceEnabled: bool.isRequired,
    guests: number.isRequired,
    overwriteServicesStateData: func.isRequired,
    setDifferentServiceAction: func.isRequired,
    selectedServices: array.isRequired,
    services: array.isRequired,
    goToNextPage: func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    setDifferentServiceAction: bindActionCreators(setDifferentServiceEachUser, dispatch),
    overwriteServicesStateData: bindActionCreators(overwriteServicesData, dispatch),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(MultipleUserServices));
