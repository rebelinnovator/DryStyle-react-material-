/* eslint-disable react/prop-types */
import React from 'react';
import {
    Box,
    Button, Grid, Typography, withStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const styles = () => ({
    container: {
        position: 'fixed',
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
        zIndex: '10',
    },
    calendarContainer: {
        boxShadow: '0px 0px 64px rgba(0, 0, 0, 0.12)',
        background: '#fff',
        padding: '28px',
        maxWidth: '749px',
        boxSizing: 'content-box',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
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
    imageContainer: {
        display: 'flex',
    },
    image: {
        maxWidth: '221px',
        height: '221px',
        objectFit: 'cover',
        margin: '16px',
        border: '1.5px solid #CACACA',
    },
    heading: {
        fontFamily: 'MrsEavesSmallCap',
        borderBottom: '1px solid #D1D1D1',
        lineHeight: '2.5',
        fontSize: '18px',
    },
    description: {
        margin: '30px',
        fontSize: '15px',
    },
    priceText: {
        borderTop: '1px solid #D1D1D1',
        backgroundColor: '#F9F9F9',
        padding: '22px 29px',
        display: 'flex',
        justifyContent: 'space-between',
    },
});

const TreatmentDetailsModal = ({
    onClose,
    classes,
    title,
    images,
    description,
    price,
}) => {
    const handleOutsideClick = (event) => {
        event.preventDefault();
        if (event.target === event.currentTarget) {
            onClose();
        }
    };
    return (
        <Grid onClick={handleOutsideClick} className={classes.container}>
            <Grid className={classes.calendarContainer}>
                <Grid className={classes.header}>
                    <Typography className={classes.headerText}>
                        {title}
                    </Typography>
                    <Button onClick={onClose} style={{ padding: 0 }}>
                        <CloseIcon className={classes.closeIcon} />
                    </Button>
                </Grid>
                <Grid style={{ width: 'fit-content', margin: 'auto' }}>
                    <Grid className={classes.imageContainer}>
                        {images?.length ? images.map((img) => <img className={classes.image} src={img} alt="img" />) : null}
                    </Grid>
                    <Grid>
                        <Typography className={classes.heading}>
                            HOW IT WORKS
                        </Typography>
                        <Typography className={classes.description}>
                            {description}
                        </Typography>
                        <Typography className={classes.priceText}>
                            <Box>
                                Price
                            </Box>
                            <Box style={{ fontWeight: '800' }}>
                                {`$${price}`}
                            </Box>
                        </Typography>
                        <Typography className={classes.priceText}>
                            <Box>
                                Approximate Service Time
                            </Box>
                            <Box style={{ fontWeight: '800' }}>
                                20 mins
                            </Box>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default withStyles(styles)(TreatmentDetailsModal);
