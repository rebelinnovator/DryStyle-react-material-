/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import {
    Button, Checkbox, Grid, Typography, withStyles,
} from '@material-ui/core';
import React from 'react';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setExtensions } from '../../../../state/ducks/Booking/Booking-Actions';
import { getExtensions } from '../../../../state/ducks/Booking/Booking-Selectors';

const styles = (theme) => ({
    slotButton: {
        width: '438px',
        height: '72px',
        margin: '24px 0 5px',
        fontSize: '18px',
        color: '#42413D',
        backgroundColor: theme.palette.common.white,
        boxShadow: '2px 2px 17px rgba(235, 235, 235, 0.5)',
        border: 'none',
        lineHeight: '1.5',
        borderRadius: 'none',
        '&:hover': {
            border: 'none',
            backgroundColor: theme.palette.primary.main,
        },
        [theme.breakpoints.down('sm')]: {
            width: '366px',
            margin: '24px 0px 0px 258px',
        },
        textTransform: 'none',
    },
    selected: {
        backgroundColor: theme.palette.primary.main,
        fontWeight: '800',
        '&:hover': {
            backgroundColor: theme.palette.common.hover[1],
        },
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
    },
});

// `

const ExtensionsPage = ({
    classes, setExtensionAction, extensions, goToNextPage,
}) => (
    <Grid className={classes.container}>
        <Grid style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
            <InfoRoundedIcon />
            <Typography style={{ margin: '3px 0 0 5px' }}>
                Learn about our extension policy
                {' '}
                <Link to="">here</Link>
                .
            </Typography>
        </Grid>
        <Button
            onClick={() => {
                setExtensionAction(false);
                goToNextPage();
            }}
            className={`${classes.slotButton} ${extensions === false ? classes.selected : ''}`}
            variant="outlined"
            color="primary"
        >
            No
        </Button>
        <Button
            onClick={() => {
                setExtensionAction(true);
                goToNextPage();
            }}
            className={`${classes.slotButton} ${extensions === true ? classes.selected : ''}`}
            variant="outlined"
            color="primary"
        >
            Yes
            <br />
            $20
        </Button>

        <Grid style={{ marginTop: '10px' }}>
            <Checkbox style={{ marginBottom: '3px' }} />
            <Typography style={{ display: 'inline-block' }}>
                Don&apos;t ask me again
            </Typography>
        </Grid>
    </Grid>
);

const mapDispatchToProps = (dispatch) => ({
    setExtensionAction: bindActionCreators(setExtensions, dispatch),
});

const mapStateToProps = (state) => ({
    extensions: getExtensions(state),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ExtensionsPage));
