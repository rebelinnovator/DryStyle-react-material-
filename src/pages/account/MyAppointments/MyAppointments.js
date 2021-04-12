/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { useState } from 'react';
import {
    Button, Grid, Typography, withStyles,
} from '@material-ui/core';
import { object } from 'prop-types';
import AppointmentCard from '../../../app/Components/AppointmentCard';
import BarflyImage from '../../../assets/images/barfly-membership.svg';
import AppointmentDetails from './AppointmentDetails';

// const data = [
//     {
//         date: 'Dec 10 2020',
//         location: 'Drybar Huntington Beach in Pacific City',
//         services: [{ user: 'Me', service: 'Blowout' }],
//         status: 'upcoming',
//     },
//     {
//         date: 'July 20 2020',
//         location: 'Drybar Huntington Beach in Pacific City',
//         services: [{ user: 'Me', service: 'Blowout' }],
//         status: 'past',
//     },
//     {
//         date: 'July 20 2020',
//         location: 'Drybar Huntington Beach in Pacific City',
//         services: [{ user: 'Me', service: 'Blowout' }, { user: 'Guest1', service: 'Uptini' }],
//         status: 'past',
//     },
// ];

const styles = () => ({
    container: {
        backgroundColor: '#fff',
        padding: '36px 22px',
        marginLeft: '15px',
        height: '100%',
    },
    heading: {
        fontWeight: '800',
        marginBottom: '15px',
    },
    noAppointmentText: {
        backgroundColor: '#F9F9F9',
        padding: '80px 45px',
        fontSize: '18px',
        textAlign: 'center',
        borderTop: '1px solid #D1D1D1',
        marginBottom: '35px',
    },
    bookButton: {
        width: '378px',
        maxWidth: '100%',
        height: '63px',
        fontSize: '18px',
    },
    noUpcomingContainer: {
        textAlign: 'center',
    },
    barfleyContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '45px 0',
        textDecoration: 'underline',
        textUnderlinePosition: 'under',
    },
});

const MyAppointments = ({ classes, upcoming, past }) => {
    const [selectedAppointment, setSelectedAppointment] = useState();

    if (selectedAppointment) {
        return (
            <AppointmentDetails
                selectedAppointment={selectedAppointment}
                setSelectedAppointment={setSelectedAppointment}
            />
        );
    }

    return (
        <Grid className={classes.container}>
            <Typography className={classes.heading}>
                Upcoming
            </Typography>
            {upcoming?.length
                ? upcoming?.map((appointment) => (
                    <AppointmentCard
                        isUpcoming
                        appointment={appointment}
                        setSelectedAppointment={setSelectedAppointment}
                    />
                ))
                : (
                    <Grid className={classes.noUpcomingContainer}>
                        <Grid className={classes.noAppointmentText}>
                            <Typography style={{ lineHeight: '2' }}>
                                You do not have any upcoming appointments.
                                <br />
                                Book one from here or easily rebook from one of your previous visits.
                            </Typography>
                        </Grid>
                        <Button variant="contained" color="secondary" className={classes.bookButton}>
                            Book an Appointment
                        </Button>
                        <Grid className={classes.barfleyContainer}>
                            <img style={{ margin: '0 32px' }} src={BarflyImage} alt="Barfly" />
                            <Typography>
                                Save 10% on your rebook with a Barfly Membership
                            </Typography>
                        </Grid>

                    </Grid>
                )}
            <Typography className={classes.heading} style={{ marginTop: '30px' }}>
                Past
            </Typography>
            {past.length
                ? past.map((appointment) => (
                    <AppointmentCard
                        appointment={appointment}
                        setSelectedAppointment={setSelectedAppointment}
                    />
                ))
                : null}
        </Grid>
    );
};

MyAppointments.propTypes = {
    classes: object.isRequired,
};

export default withStyles(styles)(MyAppointments);
