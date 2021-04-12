/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid, Typography, Button, Box,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import BookedTime from '../../../assets/images/BookedTime.svg';
import CalendarBooked from '../../../assets/images/CalendarBooked.svg';
import BlowoutAddOns from '../../../assets/images/BlowoutAddOns.svg';
import ChaseShine from '../../../assets/images/ChaserShine.svg';
import {
    getAddOnsServiceData, getSelectedDate, getSelectedSlot, getServicesData,
} from '../../../state/ducks/Booking/Booking-Selectors';
import { getDateDDmm, getNumberOfDaysBetween, getTimeFromDate } from '../../../Helpers/dateTime';

const useStyles = makeStyles((theme) => ({
    summaryCopy: {
        marginTop: '20px',
        textAlign: 'center',
        fontFamily: theme.typography.fontFamily[0],
        fontWeight: '800',
    },
    summaryCopySub: {
        fontWeight: '300',
        fontStyle: 'oblique',
    },
    summaryCopyLocation: {
        margin: '10px auto 15px auto',
        textAlign: 'center',
        fontWeight: '600',
        fontFamily: theme.typography.fontFamily[0],
    },
    requestNoteDetails: {
        float: 'right',
        background: theme.palette.common.white,
        boxShadow: '2px 2px 17px rgba(235, 235, 235, 0.5)',
    },
    allSetTitle: {
        fontFamily: 'DINCondensed',
        fontSize: '39px',
        fontWeight: '800',
        textTransform: 'uppercase',
        color: theme.palette.common.grey,
    },
    allSetCopy: {
        margin: '25px auto 38px',
    },
    requestServiceContainer: {
    },
    locationSummary: {
        background: theme.palette.common.lightGrey[3],
    },
    BookedTime: {
        background: theme.palette.common.white,
        border: `1px solid ${theme.palette.common.lightGrey[0]}`,
        boxSizing: 'border-box',
        borderRadius: '4px',
        textAlign: 'center',
        width: '208px',
        height: '208px',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'space-aaround',
        padding: '50px 0',
    },
    gridAll: {
        margin: '0 auto',
        borderRadius: '0px',
        background: '#fff',
        boxShadow: '2px 2px 46px rgba(235, 235, 235, 0.5)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        padding: '19px',
    },
    parentGrid: {
        margin: '5px 0px 0px 40px',
    },
    parentDiv: {
        background: theme.palette.secondary[200],
        width: '100%',
        backgroundColor: '#F8F8F8',
        borderTop: '1px solid #D1D1D1',
        padding: '23px',
        display: 'flex',
        justifyContent: 'space-around',
    },
    nextAction: {
        background: theme.palette.common.lightGrey[1],
    },
    nextClick: {
        fontFamily: theme.typography.fontFamily[0],
        fontSize: '18px',
        lineHeight: '45px',
        color: theme.palette.common.black,
        width: '378px',
        maxWidth: '100%',
        textTransform: 'capitalize',
        margin: '32px auto',
    },
    addToCalendar: {
        fontFamily: theme.typography.fontFamily[0],
        fontSize: '15px',
        textDecoration: 'underline',
    },
    alignItemCenter: {
        textAlign: 'center',
    },
    displayFlex: {
        display: 'flex',
    },
    borderBottomCopy: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'MrsEavesSmallCaps',
        fontSize: '20px',
        '&::before': {
            content: '""',
            borderTop: '2px dashed #BDBDBD',
            flex: '1 0 20px',
            marginRight: '10px',
        },
        '&::after': {
            content: '""',
            borderTop: '2px dashed #BDBDBD',
            flex: '1 0 20px',
            marginLeft: '10px',
        },
        margin: '40px auto',
    },
    dashedBorder: {
        borderBottom: `3px dashed ${theme.palette.common.lightGrey[2]}`,
    },
    chaserShine: {
        textAlign: 'center',
    },
    container: {
        background: theme.palette.common.lightGrey[3],
        maxWidth: '800px',
        margin: '75px auto',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        textAlign: 'center',
    },
    showCalendarAction: {
        display: 'flex',
        color: '#42413D',
        textTransform: 'none',
        [theme.breakpoints.down('sm')]: {
            whiteSpace: 'nowrap',
        },
    },
}));

function BookingConfirmationContainer({
    location,
}) {
    const classes = useStyles();
    const locationState = location?.state || '';
    // const { appointmentDetails: { Treatment, AddOnItems } } = location.state;
    const StartDateTimeOffset = locationState?.appointmentDetails?.StartDateTimeOffset || '';
    const Treatment = locationState?.appointmentDetails?.Treatment || '';
    const AddOnItems = locationState?.appointmentDetails?.AddOnItems || '';
    return (
        <Grid className={classes.container}>
            <Typography className={classes.allSetTitle}>
                you’re all set!
            </Typography>
            <Typography className={classes.allSetCopy}>
                Some last minute notes will go here lorem ipsum dolor consectuer.
            </Typography>
            <Grid className={classes.gridAll}>
                <Typography className={classes.summaryCopyLocation}>
                    Drybar Huntington Beach in Pacific City
                </Typography>
                <Grid className={classes.parentDiv}>
                    <Grid className={classes.BookedTime}>
                        <img src={BookedTime} alt="booked-time" />
                        <Typography className={classes.summaryCopy}>
                            {getTimeFromDate(StartDateTimeOffset)}
                            {' '}
                        </Typography>
                    </Grid>
                    <Grid className={classes.BookedTime}>
                        <img src={CalendarBooked} alt="booked-time" />
                        <Typography className={classes.summaryCopy}>
                            <Box>
                                {getDateDDmm(new Date(StartDateTimeOffset))}
                            </Box>
                            <Box className={classes.summaryCopySub}>
                                {`in ${getNumberOfDaysBetween(new Date(StartDateTimeOffset))} days` || 'Today'}
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid className={classes.BookedTime}>
                        <img src={BlowoutAddOns} alt="booked-time" />
                        <Typography className={classes.summaryCopy} style={{ marginTop: '14px' }}>
                            {Treatment.Name ? (
                                <Box>
                                    {Treatment.Name}
                                </Box>
                            ) : null}
                            <Box className={Treatment.Name ? classes.summaryCopySub : ''}>
                                {`${AddOnItems.length || 'No'} add ons`}
                            </Box>
                        </Typography>
                    </Grid>
                </Grid>
                <Button
                    className={classes.nextClick}
                    variant="contained"
                    color="primary"
                >
                    Manage Appointments
                </Button>
                <Button variant="container" className={classes.showCalendarAction}>
                    <CalendarTodayIcon style={{ height: '15px', marginRight: '3px' }} />
                    <Typography style={{ borderBottom: '0.5px solid #42413D', fontSize: '15px', height: '20px' }}>
                        Add To Calendar
                    </Typography>
                </Button>
            </Grid>
            <Typography className={classes.borderBottomCopy}>OUR SPECIAL OFFER</Typography>
            <Grid className={classes.chaserShine}><img src={ChaseShine} alt="chase-shine" /></Grid>
        </Grid>

    );
}

const mapStateToProps = (state) => ({
    slot: getSelectedSlot(state),
    date: getSelectedDate(state),
    services: getServicesData(state),
    addons: getAddOnsServiceData(state),
});

export default withRouter(connect(mapStateToProps)(BookingConfirmationContainer));
