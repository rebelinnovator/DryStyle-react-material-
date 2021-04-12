import {
    Button,
    Grid, InputAdornment, TextField, Typography, withStyles,
} from '@material-ui/core';
import { object, array } from 'prop-types';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import barflyHeader from '../../assets/images/barflyHeader.jpg';
import BarflyMembershipPriceCard from './Partials/BarflyMembershipPriceCard';
import barflyMembershipHeartDark from '../../assets/images/barflyMembershipHeartDark.svg';
import { MOBILE_BREAKPOINT, TABLET_BREAKPPOINT } from '../../Helpers/breakpoints';

const styles = (theme) => ({
    barflyPageContainer: {
        maxWidth: '1400px',
        width: '100%',
        margin: 'auto',
        backgroundColor: '#fff',
        padding: '36px',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            padding: '5px',
        },
    },
    headerImage: {
        margin: '5px 0',
        width: '100%',
    },
    mainContent: {
        margin: '50px 0',
    },
    storeSearchHeader: {
        fontWeight: '800',
        fontSize: '20px',
    },
    locationSearchContainer: {
        backgroundColor: '#F7F8F9',
        borderTop: '1px solid #D1D1D1',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: '36px 36px 47px 36px',
        margin: '18px 0',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            padding: '20px',
        },
    },
    searchFieldHeight: {
        height: '100%',
        fontSize: '25px',
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '15px',
        },
    },
    searchButton: {
        marginTop: '-5px',
        background: '#54575A',
        borderRadius: '0px',
        color: '#FFFFFF',
        fontSize: '18px',
        width: '139px',
        height: '63px',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'rgb(58, 60, 62);',
        },
        [theme.breakpoints.down(MOBILE_BREAKPOINT)]: {
            fontSize: '15px',
            width: '80px',
            height: '40px',
        },
    },
    memberShipDetailsContainer: {
        backgroundImage: 'linear-gradient(135deg, #ffffff 35.71%, #e2e2e2 35.71%, #e2e2e2 50%, #ffffff 50%, #ffffff 85.71%, #e2e2e2 85.71%, #e2e2e2 100%)',
        backgroundSize: '9.90px 9.90px',
        padding: '36px 20px',
        display: 'flex',
        border: '2px solid #E2E2E2',
        boxSizing: 'border-box',
        [theme.breakpoints.down(TABLET_BREAKPPOINT)]: {
            flexWrap: 'wrap',
            padding: '10px 4px',
        },
    },
    darkCard: {
        backgroundColor: '#42413D',
        color: '#fff',
    },
    callUsContainer: {
        background: '#F7F8F9',
        borderTop: '1px solid #D1D1D1',
        padding: '42px 20px 60px 20px',
        textAlign: 'center',
    },
    callUsText: {
        fontSize: '25px',
        color: '#42413D',
        marginBottom: '42px',
    },
    callUsButton: {
        border: '1px solid #42413D',
        maxWidth: '378px',
        width: '100%',
        padding: '15px',
        textTransform: 'none',
        fontSize: '18px',
        borderRadius: '0',
    },
});

const BarflyMembershipEnrollment = ({ classes, barflyMembershipCollection }) => {
    const signatureMembership = barflyMembershipCollection?.[0] || [];
    const premiumMembership = barflyMembershipCollection?.[1] || [];

    return (
        <Grid className={classes.barflyPageContainer}>
            <img className={classes.headerImage} src={barflyHeader} alt="Barfly Membership" />
            <Grid className={classes.mainContent}>
                <Typography className={classes.storeSearchHeader}>
                    What is your preferred store?
                </Typography>
                <Grid className={classes.locationSearchContainer}>
                    <TextField
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon style={{ fontSize: '30px' }} />
                                </InputAdornment>
                            ),
                            classes: {
                                root: classes.searchFieldHeight,
                            },
                        }}
                        placeholder="City, State or Zip"
                        // onChange={(e) => handleLocationSearch(e)}
                    />
                    <Button className={classes.searchButton} variant="outlined">Search</Button>
                </Grid>
                <Grid className={classes.memberShipDetailsContainer}>
                    <BarflyMembershipPriceCard
                        headerTitle={signatureMembership.title}
                        price={signatureMembership.price}
                        blowouts={signatureMembership.subtitle}
                        additionalOffers={signatureMembership.benefitsCollection.items}
                    />
                    <BarflyMembershipPriceCard
                        headerTitle={premiumMembership.title}
                        classes={{
                            headerTitle: classes.darkCard,
                        }}
                        priceCardHeaderIcon={barflyMembershipHeartDark}
                        price={premiumMembership.price}
                        blowouts={premiumMembership.subtitle}
                        additionalOffers={premiumMembership.benefitsCollection.items}
                    />
                </Grid>
                <Typography style={{ margin: '26px auto', textAlign: 'center' }}>
                    *Membership prices vary by market. See below for details.
                </Typography>
                <Grid className={classes.callUsContainer}>
                    <Typography className={classes.callUsText}>
                        Interested in upgrading your membership? Call
                        {' '}
                        <span style={{ fontWeight: '800' }}>(877) 379-2279</span>
                        {' '}
                        so we can help.
                    </Typography>
                    <Button className={classes.callUsButton} variant="outlined">
                        Call Us
                    </Button>
                </Grid>
                <Typography style={{ margin: '26px auto', textAlign: 'center' }}>
                    If you’d like to suspend or cancel your membership today, please
                    {' '}
                    <Link to="/">click here</Link>
                    .
                </Typography>
            </Grid>
        </Grid>
    );
};

BarflyMembershipEnrollment.propTypes = {
    classes: object.isRequired,
    barflyMembershipCollection: array.isRequired,
};

export default withStyles(styles)(BarflyMembershipEnrollment);
