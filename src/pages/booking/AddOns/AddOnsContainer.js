/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import useFetch from '../../../Helpers/useFetch';
import AddOnsSkeleton from './Partials/AddOnsSkeleton';
import AddOns from './AddOns';
import SummaryWrapper from '../SummaryWrapper';
import { getNumberOfGuests } from '../../../state/ducks/Booking/Booking-Selectors';
import { getAddOnsData } from '../../../api/booking-api';
import ExtensionsPage from './Partials/ExtensionsPage';

const styles = () => ({
    containerTitleExtensions: {
        margin: '-40px auto 40px auto',
    },
});

const AddOnsContainer = ({ goToNextPage, guests, classes }) => {
    const { data, error, loading } = useFetch(getAddOnsData());
    const [showExtensionsPage, setShowExtensionsPage] = useState(false);
    let component = null;

    if (loading) {
        component = <AddOnsSkeleton />;
    }

    if (error) {
        console.log(error);
    }

    if (data?.Treatments?.length) {
        component = <AddOns guests={guests} addonData={data.Treatments} />;

        if (showExtensionsPage) {
            component = <ExtensionsPage goToNextPage={goToNextPage} />;
        }
    }

    return (
        <SummaryWrapper
            title={showExtensionsPage ? 'DO YOU HAVE EXTENSIONS?' : 'ADD-ONS'}
            containerTitle={showExtensionsPage ? 'Adds aproximately 20 mins to your service' : 'Add one or add many'}
            classes={showExtensionsPage ? {
                containerTitle: classes.containerTitleExtensions,
            } : null}
            containerTitleCenter={showExtensionsPage}
            nextPage="data-and-time"
            nextButtonEnabled={!showExtensionsPage}
            onButtonClick={() => setShowExtensionsPage(true)}
        >
            {component}
        </SummaryWrapper>
    );
};

const mapStateToProps = (state) => ({
    guests: getNumberOfGuests(state),
});

export default connect(mapStateToProps)(withStyles(styles)(AddOnsContainer));
