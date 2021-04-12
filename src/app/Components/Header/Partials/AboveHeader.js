import { Button, Grid, withStyles } from '@material-ui/core';
import { object } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { TABLET_BREAKPPOINT } from '../../../../Helpers/breakpoints';

const styles = (theme) => ({
    buttonContainer: {
        textDecoration: 'none',
        backgroundColor: 'transparent',
        height: '39px',
        borderRight: '4px solid #fff',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            height: '49px',
        },
    },
    topButton: {
        color: '#42413D',
        width: '110px',
        fontSize: '15px',
        fontWeight: '800',
        fontFamily: 'DINCondensed',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            width: '70px',
        },
        '&:focus, &:hover, &:visited, &:link, &:active': {
            textDecoration: 'none',
        },
    },
    aboveHeaderContainer: {
        backgroundColor: '#F9F9F9',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selected: {
        backgroundColor: '#fff',
        borderTop: '6px solid #FFDD30',
        borderRight: 'none',
        borderLeft: 'none',
        paddingBottom: '10px',
    },
    icon: {
        fontWeight: '100',
        margin: '0 9px',
        cursor: 'pointer',
    },
});

const AboveHeader = ({ classes }) => (
    <Grid className={classes.aboveHeaderContainer}>
        <Grid style={{ display: 'flex' }}>
            <Button className={`${classes.buttonContainer} ${classes.selected}`} classes={{ label: classes.topButton }}>
                <Link className={classes.topButton} to="/auth/login">SERVICES</Link>
            </Button>
            <Button className={classes.buttonContainer} classes={{ label: classes.topButton }}>
                <Link className={classes.topButton} to="/booking/location">BOOK</Link>
            </Button>
            <Button className={classes.buttonContainer} classes={{ label: classes.topButton }}>
                <Link className={classes.topButton} to="/">SHOP</Link>
            </Button>
        </Grid>
        <Grid style={{ display: 'flex' }}>
            <SearchIcon className={classes.icon} />
            <Link to="/account/my-appointments" style={{ color: '#42413D' }}>
                <PersonOutlineOutlinedIcon className={classes.icon} style={{ height: '26px' }} />
            </Link>
            <Link to="/service/locator" style={{ color: '#42413D' }}>
                <LocationOnOutlinedIcon className={classes.icon} />
            </Link>
        </Grid>
    </Grid>
);

AboveHeader.propTypes = {
    classes: object.isRequired,
};

export default withStyles(styles)(AboveHeader);
