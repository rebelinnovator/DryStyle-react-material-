/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/require-default-props */
import {
    Button, Grid, Typography, withStyles,
} from '@material-ui/core';
import { object } from 'prop-types';
import React, { useState } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import Media from 'react-media';
import { bindActionCreators } from 'redux';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DateCard from './Partials/DateCard';
import { getSelectedDateTime, getSelectedSlot } from '../../../state/ducks/Booking/Booking-Selectors';
import {
    getDateStringMMDDYY, monthNames, getWeekByFirstDate,
} from '../../../Helpers/dateTime';
import { setDateTimeClient, setSlotTime } from '../../../state/ducks/Booking/Booking-Actions';
import Calendar from './Partials/Calendar';
import SlotsContainer from './Partials/SlotsContainer';

const styles = (theme) => ({
    topContainer: {
        width: '100%',
        backgroundColor: theme.palette.common.white,
        height: '336px',
        padding: '26px 22px',
        [theme.breakpoints.down('sm')]: {
            backgroundColor: '#F9F9F9',
        },
    },
    heading: {
        marginBottom: '15px',
        [theme.breakpoints.down('sm')]: {
            width: '24rem',
            textAlign: 'center',
        },
    },
    datePickerContainer: {
        display: 'flex',
        flexDirection: 'column',
        borderTop: `1px solid ${theme.palette.common.lightGrey[0]}`,
        backgroundColor: theme.palette.common.lightGrey[3],
        padding: '24px 16px',
        marginBottom: '8px',
        [theme.breakpoints.down('sm')]: {
            width: '368px',
        },
    },
    datePicker: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        alignSelf: 'center',
        marginTop: '20px',
        [theme.breakpoints.down('sm')]: { width: '64%' },
    },
    monthName: {
        margin: '0 10px',
        fontWeight: '800',
        fontSize: '18px',
        [theme.breakpoints.down('sm')]: { margin: '0px 186px 0px 0px' },
    },
    datePickerSections: {
        margin: 'auto',
    },
    openingsText: {
        fontSize: '13px',
        margin: '10px 5px',
    },
    bottomContainer: {
        padding: '43px',
        [theme.breakpoints.down('sm')]: { padding: '0px' },
    },
    fullDate: {
        fontSize: '18px',
        fontWeight: '800',
        [theme.breakpoints.down('sm')]: {
            whiteSpace: 'nowrap',
            margin: '0px 0px -56px 21px',
        },
    },
    showCalendarAction: {
        display: 'flex',
        color: '#42413D',
        textTransform: 'none',
        [theme.breakpoints.down('sm')]: {
            whiteSpace: 'nowrap',
        },
    },
});

const DateTime = ({
    classes, getSelectedCalendarInfo, setDateTime, setSlot, goToNextPage, getSlot, availableDates, actionTriggerToSetDateTime,
}) => {
    const weekStartDate = availableDates?.[0] ? new Date(availableDates[0]) : new Date();
    const [selectedDate, setSelectedDate] = useState(getSelectedCalendarInfo ? new Date(getSelectedCalendarInfo) : weekStartDate);
    const [selectedSlot, setSelectedSlot] = useState(getSlot);
    const [showCalendar, setShowCalendar] = useState(false);

    const handleSelectSlot = (slot) => {
        setSelectedSlot(slot);
        setSelectedDate();
        setDateTime(selectedDate.toLocaleString());
        setSlot(slot);
        goToNextPage();
    };

    const onDateSelect = (date) => {
        setSelectedDate(date);
        actionTriggerToSetDateTime(date.toLocaleString());
        setShowCalendar(false);
        setSelectedSlot('');
        setSlot('');
    };

    return (
        <>
            <Grid className={classes.topContainer}>
                <Media query={{ maxWidth: 599 }}>
                    {(matches) => (matches ? (
                        <Typography className={classes.heading}>
                            Plan for approximately
                            {' '}
                            <strong>50 mins</strong>
                            {' '}
                            for a Blowout + Liquid Glass + Scalp Massage
                            {' '}
                        </Typography>
                    ) : (
                        <Typography className={classes.heading}>
                            Plan for
                            {' '}
                            <strong>50 mins</strong>
                            {' '}
                            for your service
                        </Typography>
                    )
                    )}
                </Media>
                <Grid className={classes.datePickerContainer}>
                    <Grid style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography className={classes.monthName}>
                            {monthNames[selectedDate.getMonth()]}
                        </Typography>
                        <Button onClick={() => setShowCalendar(true)} variant="container" className={classes.showCalendarAction}>
                            <Typography style={{ borderBottom: '0.5px solid #42413D', fontSize: '13px', height: '20px' }}>
                                Show Calendar
                            </Typography>
                            <CalendarTodayIcon style={{ height: '13px' }} />
                        </Button>
                    </Grid>
                    <Grid className={classes.datePickerSections}>
                        <Grid className={classes.datePicker}>
                            {getWeekByFirstDate(selectedDate).map((date) => (
                                <DateCard
                                    date={date}
                                    disabled={!availableDates?.length || !availableDates.some((d) => new Date(d).toDateString() === date.toDateString())}
                                    selectedDate={selectedDate}
                                    onDateSelect={onDateSelect}
                                />
                            ))}

                        </Grid>
                        <Typography className={classes.openingsText}>
                            (Openings)
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid className={classes.bottomContainer}>
                <Typography className={classes.fullDate}>
                    {getDateStringMMDDYY(selectedDate)}
                </Typography>
                {availableDates.some((d) => new Date(d).toDateString() === selectedDate.toDateString()) ? (
                    <SlotsContainer
                        handleSelectSlot={handleSelectSlot}
                        selectedSlot={selectedSlot}
                        selectedDate={selectedDate}
                    />
                ) : null}
            </Grid>
            <Calendar
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                open={showCalendar}
                onClose={() => setShowCalendar(false)}
                onClick={onDateSelect}
            />
        </>
    );
};

DateTime.propTypes = {
    classes: object.isRequired,
    getSelectedCalendarInfo: object,
};

DateTime.defaultProps = {
    getSelectedCalendarInfo: '',
};

const mapStateToProps = (state) => ({
    getSelectedCalendarInfo: getSelectedDateTime(state),
    getSlot: getSelectedSlot(state),
});

const mapDispatchToProps = (dispatch) => ({
    setDateTime: bindActionCreators(setDateTimeClient, dispatch),
    setSlot: bindActionCreators(setSlotTime, dispatch),
    actionTriggerToSetDateTime: bindActionCreators(setDateTimeClient, dispatch),
});

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
);

export default enhance(DateTime);
