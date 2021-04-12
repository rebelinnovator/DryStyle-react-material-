/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-comment-textnodes */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography } from '@material-ui/core';
import MasterCard from '../../assets/images/paymentCard.svg';
import SummaryWrapper from './SummaryWrapper';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    requestNoteCopy: {
        fontSize: '18px',
        textAlign: 'center',
        color: theme.palette.common.grey,
        fontWeight: 800,
        paddingBottom: '15px',
        borderBottom: `1px solid ${theme.palette.common.lightGrey}`,
        [theme.breakpoints.down('sm')]: { display: 'none' },
    },
    borderBottom: {
        borderBottom: `1px solid ${theme.palette.common.lightGrey}`,
        width: '88%',
        margin: '22px 5px 2px 41px',
    },
    cardSelectionCopy: {
        textAlign: 'center',
        margin: '18px 0px 0px 0px',
        fontFamily: theme.typography.fontFamily,
        [theme.breakpoints.down('sm')]: {
            whiteSpace: 'nowrap',
            margin: '-50px 0px 30px 42px',
        },
    },
    masterCard: {
        width: '223px',
        height: '163.07px',
        margin: '14% 2% 8% 2%',
    },
    MasterCardSecond: {
        width: '258px',
        height: '224.07px',
        margin: '11% 0% 0% 0%',
    },
    cardEnding: {
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.common.lightGrey[1],
        fontSize: '14px',
    },
    cardDetails: {
        margin: '-56% 0% 0% 29%',
    },
    cardDigit: {
        fontFamily: theme.typography.fontFamily,
        margin: '9px 0px 0px 0px',
    },
    proceedSelectedAction: {
        margin: '23% 0px 25px 24%',
        width: '50%',
    },
    proceedSelectClick: {
        left: '0.05%',
        right: '55.09%',
        bottom: '66.36%',
        fontFamily: theme.typography.fontFamily,
        fontSize: '18px',
        lineHeight: '45px',
        width: '100%',
        textTransform: 'none',
        color: '#54575A',
        backgroundColor: '#FFDD30',
        '&:hover': {
            backgroundColor: '#b29a21',
        },
        [theme.breakpoints.down('sm')]: {
            width: '324px',
            height: '63px',
            margin: '120px 0px 0px 0px',
        },
    },
    leftDivider: {
        width: '42%',
        margin: '2px 2px 2px 15px',
    },
    rightDivider: {
        width: '42%',
    },
    addCardAction: {
        margin: '9% 0px 25px 24%',
        width: '50%',
    },
    borderBottomBetween: {
        borderBottom: `1px solid ${theme.palette.common.lightGrey[0]}`,
        width: '38%',
        margin: '0px 5px 7px 41px',
    },
    displayFlex: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: { display: 'none' },
    },
    borderBottomCopy: {
        margin: '7px 0px 0px 25px',
    },
    leftSectionContainer: {
        backgroundColor: theme.palette.common.white,
        margin: 'auto',
        padding: '26px 22px',
        [theme.breakpoints.down('sm')]: { backgroundColor: '#F9F9F9' },
    },
    addCreditCard: {
        left: '0.05%',
        right: '55.09%',
        bottom: '66.36%',
        fontFamily: theme.typography.fontFamily,
        fontSize: '18px',
        lineHeight: '45px',
        width: '100%',
        textTransform: 'none',
        color: '#54575A',
        border: '1px solid #54575A',
        [theme.breakpoints.down('sm')]: {
            width: '324px',
            height: '63px',
            margin: '0px 0px 0px 0px',
        },
    },
    cardSelectionContainer: {
        [theme.breakpoints.down('sm')]: { width: '800px' },
    },
}));

const payemtCardDetails = [
    {
        user_card_ending: 'User card ending',
        user_card_number: '**** **** **** 3782',
    },
    {
        user_card_ending: 'User card ending',
        user_card_number: '**** **** **** 3782',
    },
    {
        user_card_ending: 'User card ending',
        user_card_number: '**** **** **** 3782',
    },
];

const AppointmentHold = ({ goToNextPage }) => {
    const classes = useStyles();

    return (
        <SummaryWrapper title="APPOINTMENT HOLD" containerStyle={{ backgroundColor: '#ffffff' }}>
            <Grid className={classes.leftSectionContainer}>
                <Typography className={classes.requestNoteCopy}>
                    Card Selection
                </Typography>
                <div className={classes.cardSelectionCopy}>
                    Select credit card to hold your appointment.
                </div>
                <Grid container spacing={3} className={classes.cardSelectionContainer}>
                    {payemtCardDetails.map((cardKey) => (
                        <Grid item xs={4}>
                            <img
                                src={MasterCard}
                                alt=""
                                className={classes.masterCard}
                            />
                            <div className={classes.cardDetails}>
                                <div className={classes.cardEnding}>{cardKey.user_card_ending}</div>
                                <div className={classes.cardDigit}>{cardKey.user_card_number}</div>
                            </div>
                        </Grid>
                    ))}
                </Grid>
                <div className={classes.proceedSelectedAction}>
                    <Button onClick={goToNextPage} className={classes.proceedSelectClick} variant="outlined">
                        Proceed with Selected
                    </Button>
                </div>
                <div />
                <div className={classes.displayFlex}>
                    <div className={classes.borderBottomBetween} />
                    <span className={classes.borderBottomCopy}>OR</span>
                    <div className={classes.borderBottomBetween} />
                </div>
                <div className={classes.addCardAction}>
                    <Button className={classes.addCreditCard} variant="outlined">
                        Add a Credit Card
                    </Button>
                </div>
            </Grid>

        </SummaryWrapper>
    );
};

export default AppointmentHold;
