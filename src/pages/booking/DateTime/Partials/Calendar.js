/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import {
    Button, Grid, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Typography, withStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { getMonth, monthShortNames } from '../../../../Helpers/dateTime';
import useFetch from '../../../../Helpers/useFetch';
import { getAvailableDates } from '../../../../api/booking-api';

const styles = () => ({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    calendarContainer: {
        width: '749px',
        height: '472px',
        boxShadow: '0px 0px 64px rgba(0, 0, 0, 0.12)',
        background: '#fff',
        padding: '28px',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #D1D1D1',
        paddingBottom: '15px',
    },
    headerText: {
        fontFamily: 'DINCondensed',
        fontSize: '35px',
        fontWeight: '700',
        color: '#42413D',
        width: '100%',
        textAlign: 'center',
        marginLeft: '32px',
    },
    closeIcon: {
        fontSize: '45px',
        color: '#42413D',
        margin: '5px 0',
    },
    rowContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px 0',
    },
    monthHeader: {
        fontSize: '20px',
        fontWeight: 700,
        lineHeight: '1',
        marginTop: '5px',
    },
    nextIcon: {
        fontSize: '30px',
        padding: '8px 0',
    },
    dates: {
        fontSize: '17px',
        borderBottom: 'none',
        padding: '8px 0',
        textAlign: 'center',
        cursor: 'pointer    ',
    },
    selected: {
        backgroundColor: 'black',
        color: 'white',
    },
    disabled: {
        cursor: 'default',
        color: '#d5d5d5',
    },
});

const StyledTableCell = withStyles(() => ({
    head: {
        borderBottom: '2px solid #F9F9F9',
        fontWeight: 800,
        fontSize: '17px',
        padding: 0,
        textAlign: 'center',
        width: '50px',
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const Calendar = ({
    classes, open, onClose, selectedDate, onClick,
}) => {
    const [currentDate, setCurrentDate] = useState(selectedDate || new Date());
    const currentMonthDates = getMonth(currentDate);
    const lastWeek = currentMonthDates[currentMonthDates.length - 1];
    const lastDay = lastWeek[lastWeek.length - 1];
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 2);
    const { data } = useFetch(getAvailableDates(firstDay, lastDay));
    if (data) {
        const handleOutsideClick = (event) => {
            event.preventDefault();
            if (event.target === event.currentTarget) {
                onClose();
            }
        };

        const handleMonthChange = (op) => {
            const currDate = new Date(currentDate);
            const nexMonth = op === 'add' ? currDate.getMonth() + 1 : currDate.getMonth() - 1;
            setCurrentDate(new Date(currDate.setMonth(nexMonth)));
        };

        if (open) {
            return (
                <Grid onClick={handleOutsideClick} className={classes.container}>
                    <Grid className={classes.calendarContainer}>
                        <Grid className={classes.header}>
                            <Typography className={classes.headerText}>
                                DATE SELECTION
                            </Typography>
                            <Button onClick={onClose} style={{ padding: 0 }}>
                                <CloseIcon className={classes.closeIcon} />
                            </Button>
                        </Grid>
                        <Grid style={{ width: 'fit-content', margin: 'auto' }}>
                            <Grid className={classes.rowContainer}>
                                <Button onClick={() => handleMonthChange('sub')} style={{ padding: 0, minWidth: 'auto' }}>
                                    <ArrowBackIosIcon className={classes.nextIcon} />
                                </Button>
                                <Typography className={classes.monthHeader}>
                                    {monthShortNames[currentDate.getMonth()]}
                                </Typography>
                                <Button onClick={() => handleMonthChange('add')} style={{ padding: 0, minWidth: 'auto' }}>
                                    <ArrowForwardIosIcon className={classes.nextIcon} />
                                </Button>
                            </Grid>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>S</StyledTableCell>
                                            <StyledTableCell>M</StyledTableCell>
                                            <StyledTableCell>T</StyledTableCell>
                                            <StyledTableCell>W</StyledTableCell>
                                            <StyledTableCell>T</StyledTableCell>
                                            <StyledTableCell>F</StyledTableCell>
                                            <StyledTableCell>S</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {getMonth(currentDate).map((week) => (
                                            <TableRow>
                                                {week.map((day) => {
                                                    const isEnabled = (data?.[0]?.serviceCategories?.[0]?.services?.[0]?.availability || []).some((d) => new Date(d).toDateString() === day.toDateString());
                                                    return (
                                                        <TableCell
                                                            className={`${classes.dates} ${selectedDate.toDateString() === day.toDateString() ? classes.selected : ''} ${!isEnabled ? classes.disabled : ''}`}
                                                            onClick={isEnabled ? () => onClick(day) : null}
                                                        >
                                                            {day.getDate()}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        )) }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Grid>
            );
        }
    }
    return null;
};

export default withStyles(styles)(Calendar);
