/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box, Button, Grid, IconButton, Typography,
} from '@material-ui/core';
import RemoveCircleOutlineRoundedIcon from '@material-ui/icons/RemoveCircleOutlineRounded';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SummaryWrapper from './SummaryWrapper';
import { resetOnGuestChange, setNumberOfGuests } from '../../state/ducks/Booking/Booking-Actions';
import { getNumberOfGuests } from '../../state/ducks/Booking/Booking-Selectors';
import { MOBILE_BREAKPOINT } from '../../Helpers/breakpoints';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        padding: '60px',
        [theme.breakpoints.down('sm')]: {
            padding: '20px',
        },
    },
    buttonsWrapper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    button: {
        width: '438px',
        height: '73px',
        margin: '12px 0',
        backgroundColor: theme.palette.common.white,
        textTransform: 'none',
        fontSize: '18px',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
        [theme.breakpoints.down('sm')]: {
            //margin: '0px 0px 28px 257px', 
            //width: '373px',  
            height: '73px',
        },
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            width:'100%',
        }

    },
    selected: {
        backgroundColor: theme.palette.primary.main,
        fontWeight: '800',
        '&:hover': {
            backgroundColor: theme.palette.common.hover[1],
        },
    },
    selectGuest: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        margin: '50px 0',
    },
    text: {
        textAlign: 'center',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            whiteSpace: 'nowrap',
            //margin: '0px 0px 0px 232px',
        },
    },
    icons: {
        fontSize: '40px',
        fontWeight: '100',
    },
    changeGuestButtons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '30px 0',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
         //   margin: '0px 0px 0px 232px',
            margin: '5px',
        },
    },
    numberOfGuests: {
        fontSize: '26px',
        fontWeight: 800,
        display: 'flex',
        margin: '0 33px',
        paddingTop: '3px',
    },
    moreGuestButton: {
        margin: 'auto',
    },
}));

const HowManySummary = ({
    totalGuests,
    setTotalGuests,
    goToNextPage,
    resetData,
}) => {
    const classes = useStyles();

    const handleMeClick = () => {
        if (totalGuests > 0) {
            resetData();
        }
        setTotalGuests(0);
        goToNextPage();
    };

    const addGuest = () => {
        if (totalGuests < 4) {
            setTotalGuests(totalGuests + 1);
        }
    };

    const removeGuest = () => {
        if (totalGuests > 1) {
            setTotalGuests(totalGuests - 1);
        }
    };

    const handleGuestsClick = () => {
        if (!(totalGuests > 0)) {
            resetData();
            addGuest();
        }
    };

    return (
        <SummaryWrapper
            title="WHO&apos;S COMING?"
            nextButtonEnabled={totalGuests}
            onButtonClick={() => goToNextPage()}
        >
            <Grid className={classes.container}>
                <Grid className={classes.buttonsWrapper}>
                    <Button
                        onClick={handleMeClick}
                        className={`${classes.button} ${totalGuests === 0 ? classes.selected : ''}`}
                        variant="outlined"
                    >
                        Just Me
                    </Button>
                    <Button
                        onClick={() => handleGuestsClick()}
                        className={`${classes.button} ${totalGuests > 0 ? classes.selected : ''}`}
                        variant="outlined"
                    >
                        Me & Guest
                    </Button>
                </Grid>
                {totalGuests > 0 ? (
                    <Grid className={classes.selectGuest}>
                        <Typography className={classes.text}>
                            <Box fontSize="18px" marginBottom="12px">
                                How Many Guests?
                            </Box>
                            <Box fontSize="15px" fontStyle="oblique">
                                You may book up to 4 guests.
                            </Box>
                        </Typography>
                        <Grid className={classes.changeGuestButtons}>
                            <IconButton onClick={removeGuest}>
                                <RemoveCircleOutlineRoundedIcon className={classes.icons} />
                            </IconButton>
                            <Typography className={classes.numberOfGuests}>
                                {totalGuests}
                            </Typography>
                            <IconButton onClick={addGuest}>
                                <AddCircleOutlineRoundedIcon className={classes.icons} />
                            </IconButton>
                        </Grid>
                        <Button
                            onClick={() => handleGuestsClick()}
                            className={`${classes.button} ${classes.selected}`}
                            variant="outlined"
                        >
                            Next
                        </Button>
                        <Button variant="text" className={classes.moreGuestButton}>
                            I want to book more than 4
                        </Button>
                    </Grid>
                ) : null}
            </Grid>
        </SummaryWrapper>
    );
};

const mapStateToProps = (state) => ({
    totalGuests: getNumberOfGuests(state),
});

const mapDispatchToProps = (dispatch) => ({
    setTotalGuests: bindActionCreators(setNumberOfGuests, dispatch),
    resetData: bindActionCreators(resetOnGuestChange, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HowManySummary);
