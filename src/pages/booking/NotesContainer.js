/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Media from 'react-media';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Button, Grid, Typography, withStyles,
} from '@material-ui/core';
import SectionTitle from '../../app/Components/SectionTitle';
import { setRequestNoteMessage } from '../../state/ducks/Booking/Booking-Actions';
import { getNotesMessage } from '../../state/ducks/Booking/Booking-Selectors';

const useStyles = makeStyles((theme) => ({
    requestNoteDetails: {
        float: 'right',
        background: '#FFFFFF',
        boxShadow: '2px 2px 17px rgba(235, 235, 235, 0.5)',
        margin: 'auto',
        maxWidth: '800px',
        padding: '30px 22px',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            backgroundColor: '#fafafa',
        },
    },
    requestNoteCopy: {
        fontFamily: 'sans-serif',
        fontSize: '16px',
        textAlign: 'center',
        color: '#42413D',
    },
    requestContainer: {
        background: '#F7F8F9',
        minHeight: '468px',
        width: '100%',
        padding: '38px 26px',
        borderTop: '1px solid #D1D1D1',
        [theme.breakpoints.down('sm')]: {
            borderTop: 'none',
        },
    },
    textArea: {
        border: '1px solid #D1D1D1',
        resize: 'none',
        height: '468.78px',
        width: '657.47px',
        padding: '32px 26px',
        fontSize: '18px',
        fontFamily: 'AvenirNext',
        fontStyle: 'oblique',
        [theme.breakpoints.down('sm')]: {
            fontSize: '18px',
            height: '246px',
            width: '350px',
            margin: '0px 0px 0px -20px',
        },
    },
    nextClick: {
        fontSize: '18px',
        lineHeight: '45px',
        color: '#54575A',
        textTransform: 'capitalize',
        background: '#FFDD30',
        height: '63px',
        width: '378px',
        marginTop: '48px',
        borderRadius: '0px',
        '&:hover': {
            backgroundColor: '#b29a21',
        },
        [theme.breakpoints.down('sm')]: {
            margin: '0px 0px 0px -26px;',
        },
    },
    haveAnyRequest: {
        fontFamily: 'DINCondensed',
        fontSize: '39px',
        textTransform: 'uppercase',
        color: '#42413D',
    },
    requestServiceContainer: {
        background: '#F9F9F9',
        marginBottom: '86px',
    },
    topText: {
        marginBottom: '15px',
        fontSize: '20px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '18px',
            margin: '0px 34px 0px 34px;',
        },
    },
}));

const NotesCard = ({ goToNextPage, setNotesMessageContainer, getSavedNoteMessage }) => {
    const classes = useStyles();
    const [notesMessage, setNotesMessage] = useState(getSavedNoteMessage || []);

    const handleChange = (event) => {
        setNotesMessage(event.target.value);
    };

    const setNotesContainerMessage = () => {
        setNotesMessageContainer(notesMessage);
        goToNextPage();
    };

    return (
        <Grid container className={classes.requestServiceContainer}>
            <Media query={{ maxWidth: 599 }}>
                {(matches) => (matches ? (
                    <>
                        <SectionTitle title="HAVE ANY REQUEST?" />
                        <Grid className={classes.requestNoteDetails}>
                            <Typography className={classes.topText}>
                                Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan
                                et viverra justo commodo. Duis aute irure.
                            </Typography>
                            <Grid className={classes.requestContainer}>
                                <textarea rows="30" cols="79" placeholder="Your request here..." draggable="false" className={classes.textArea} />
                            </Grid>
                            <Grid>
                                <Button className={classes.nextClick} onClick={goToNextPage} variant="outlined">
                                    Next
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                )
                    : (
                        <>
                            <SectionTitle title="HAVE ANY REQUEST?" />
                            <Grid className={classes.requestNoteDetails}>
                                <Typography className={classes.topText}>
                                    Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan
                                    et viverra justo commodo. Duis aute irure.
                                </Typography>
                                <Grid className={classes.requestContainer}>
                                    <textarea rows="30" cols="79" placeholder="Your request here..." draggable="false" value={notesMessage} className={classes.textArea} onChange={(event) => handleChange(event)} />
                                </Grid>
                                <Grid>
                                    <Button className={classes.nextClick} onClick={setNotesContainerMessage} variant="outlined">
                                        Next
                                    </Button>
                                </Grid>
                            </Grid>
                        </>
                    )) }
            </Media>
        </Grid>
    );
};

const mapStateToProps = (state) => ({
    getSavedNoteMessage: getNotesMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
    setNotesMessageContainer: bindActionCreators(setRequestNoteMessage, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(NotesCard));
