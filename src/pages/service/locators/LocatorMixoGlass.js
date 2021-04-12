/* eslint-disable max-len */
import React from 'react';
import { object } from 'prop-types';
import {
    Grid,
    withStyles, Typography,
} from '@material-ui/core';

const styles = (theme) => ({
    serviceLocatorContainer: {
        // width: '1367px',
        height: '689px',
        backgroundColor: '#F9F9F9',
    },
    specialOfferCopy: {
        fontFamily: 'MrsEavesSmallCaps',
        fontSize: '20px',
        lineHeight: '23px',
        margin: '12px 0% 0% 14%',
        whiteSpace: 'nowrap',
        letterSpacing: '3.9px',
        color: '#42413D',
    },
    borderBottomBetween: {
        borderBottom: '3px dashed #BDBDBD',
        width: '38%',
        margin: '0px 5px 7px 41px',
    },
    displayFlex: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: { display: 'none' },
    },
    dashedBorderCopy: {
        borderTop: '3px dashed #BDBDBD',
        width: '93%',
        margin: '22px 0px 0px 23px',
    },
    desktopMedia: {
        margin: '40px 0px 10px 199px',
        width: '740px',
    },
    mediaSubtitle: {
        margin: '11px 0px 66px 291px;',
        whiteSpace: 'nowrap',
        fontFamily: 'AvenirNext',
        fontSize: '16px',
        lineHeight: '19px',
        textAlign: 'center',
        color: '#42413D',
    },
    shopLogist: {
        margin: '0px 0px 0px 311px',
        fontFamily: 'AvenirNext',
        fontSize: '15px',
        lineHeight: '18px',
        textAlign: 'center',
        color: '#42413D',
        fontWeight: '600',
    },
});

const LocatorMixoGlass = ({ classes, marketingData }) => {
    if (!marketingData) {
        return null;
    }
    const marketingStoreCollectionData = marketingData?.marketingComponentsCollection?.items?.[0] || [];
    const marketingDesktopMedia = marketingStoreCollectionData?.marketingComponentsCollection?.items?.[0]?.marketingComponentsCollection || {};
    const SpecialOfferCopy = marketingStoreCollectionData.title || '';
    return (
        <>
            <Grid container className={classes.serviceLocatorContainer}>
                <Grid item xs={5}>
                    <Grid className={classes.dashedBorderCopy} />
                </Grid>
                <Grid item xs={2}>
                    <Typography className={classes.specialOfferCopy}>{SpecialOfferCopy}</Typography>
                </Grid>
                <Grid item xs={5}>
                    <Grid className={classes.dashedBorderCopy} />
                </Grid>
                {marketingDesktopMedia?.items.map((media) => (
                    <Grid item xs={5}>
                        <img src={media.image.desktopMedia.url} alt="mixologist" className={classes.desktopMedia} />
                        <Typography className={classes.mediaSubtitle}>{media.subtitle}</Typography>
                        <Typography className={classes.shopLogist}>Shop Mixologist</Typography>
                    </Grid>
                ))}

            </Grid>
        </>
    );
};

LocatorMixoGlass.propTypes = {
    marketingData: object.isRequired,
    classes: object.isRequired,
};

export default (withStyles(styles)(LocatorMixoGlass));
