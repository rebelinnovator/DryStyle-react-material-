/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import { Grid, Typography, withStyles } from '@material-ui/core';
import { object, string } from 'prop-types';
import React from 'react';
import Media from 'react-media';
import { Link, withRouter } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const styles = (theme) => ({
    text: {
        fontFamily: 'DINCondensed',
        textAlign: 'center',
        // margin: '8px 0',
        fontWeight: 600,
        fontSize: '39px',
        color: '#42413D',
        [theme.breakpoints.down('sm')]: {
            fontSize: '31px',
        },
    },
    container: {
        padding: '45px',
        width: '100%',
    },
    goBack: {
        float: 'left',
        margin: '3px 0px 0px -24px',
    },
    displayFlex: {
        display: 'flex',
        marginTop: '6px',
    },
    goToNextCopy: {
        fontWeight: '600',
        fontSize: '13px',
        margin: '4px 5px 0px 0px',
    },
    containerTitleCenter: {
        display: 'flex',
        justifyContent: 'center',
    },
    containerTitle: {
        padding: '0 45px',
    },
});

const SectionTitle = ({
    classes, title, history, location, containerTitle, containerTitleCenter,
}) => {
    const isAddonsLocation = location?.pathname?.includes('/booking/addons');
    return (
        <Grid style={{ width: '100%' }}>
            <Grid className={classes.container}>
                <Typography
                    className={classes.text}
                    variant="h3"
                >
                    <Media query={{ maxWidth: 599 }}>
                        {(matches) => (matches ? (
                            <Grid container spacing={3}>
                                <Grid item xs={2}>
                                    <ArrowBackIosIcon onClick={history.goBack} className={classes.goBack} />
                                </Grid>
                                <Grid item xs={8}>
                                    {title?.toUpperCase()}
                                </Grid>
                                {isAddonsLocation ? (
                                    <Grid item xs={2} className={classes.displayFlex}>
                                        <Link to="/booking/select-date" style={{ color: '#42413D', display: 'flex' }}>
                                            <Typography className={classes.goToNextCopy}>NEXT</Typography>
                                            <ArrowForwardIosIcon onClick={history.goNext} />
                                        </Link>
                                    </Grid>
                                ) : null}

                            </Grid>
                        ) : (
                            <>
                                {title?.toUpperCase()}
                            </>
                        )
                        )}
                    </Media>
                </Typography>
                {/* Optional Title */}

            </Grid>
            {containerTitle?.length
                ? (
                    <Typography
                        className={`${classes.containerTitle} ${containerTitleCenter ? classes.containerTitleCenter : ''}`}
                    >
                        {containerTitle}
                    </Typography>
                )
                : null}
        </Grid>
    );
};

SectionTitle.propTypes = {
    classes: object.isRequired,
    title: string,
    history: object.isRequired,
    location: object.isRequired,
};

SectionTitle.defaultProps = {
    title: '',
};

export default withRouter(withStyles(styles)(SectionTitle));
