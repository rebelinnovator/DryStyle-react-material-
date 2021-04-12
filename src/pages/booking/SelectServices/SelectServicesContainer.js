import {
    array, bool, func, number, object,
} from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Grid, withStyles } from '@material-ui/core';
import { getServices } from '../../../api/booking-api';
import { getNumberOfGuests, getServicesData, isGuestWithDifferentServices } from '../../../state/ducks/Booking/Booking-Selectors';
import SummaryWrapper from '../SummaryWrapper';
import MultipleUserServices from './MultipleUserServices';
import ServiceSkeleton from '../../../app/Components/Skeleton/ServiceSkeleton';
import ServiceButton from './Partials/ServiceButton';
import { makeStyles } from '@material-ui/core/styles';

const PAGE_TITLE = 'WHAT SERVICE?';

const useStyles = makeStyles((theme)=>({
    buttonsWrapper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        padding: '60px',
    },
}))
/*
const styles = () => ({
    buttonsWrapper: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        padding: '60px',
        
    },
});
*/
const SelectServicesContainer = ({
    // classes,
    guests,
    isDifferentServiceEnabled,
    selectedServices,
    goToNextPage,
}) => 
    {
        const classes = useStyles();
        return(
            <SummaryWrapper
        title={PAGE_TITLE}
        nextButtonEnabled={guests && isDifferentServiceEnabled}
        useFetch={getServices()}
        onButtonClick={goToNextPage}
    >
        {({ data, error, loading }) => {
            if (loading) {
                return <ServiceSkeleton />;
            }

            if (error) {
                return null;
            }

            if (data?.Treatments?.length) {
                const services = data.Treatments;
                if (guests) {
                    return (
                        <MultipleUserServices
                            guests={guests}
                            isDifferentServiceEnabled={isDifferentServiceEnabled}
                            services={services}
                            selectedServices={selectedServices}
                            goToNextPage={goToNextPage}
                        />
                    );
                }

                return (
                    <Grid className={classes.buttonsWrapper}>
                        {services.map((service) => (
                            <ServiceButton
                                goToNextPage={goToNextPage}
                                service={service}
                                isSelected={selectedServices.some((s) => s.user === 'Me' && s.data.Name === service.Name)}
                            />
                        ))}
                    </Grid>
                );
            }
            return <></>;
        }}
    </SummaryWrapper>
        )
    }
    


SelectServicesContainer.propTypes = {
    guests: number,
    isDifferentServiceEnabled: bool,
    selectedServices: array,
    classes: object.isRequired,
    goToNextPage: func,
};

SelectServicesContainer.defaultProps = {
    guests: 0,
    isDifferentServiceEnabled: false,
    selectedServices: [],
    goToNextPage: () => {},
};

const mapStateToProps = (state) => ({
    guests: getNumberOfGuests(state),
    isDifferentServiceEnabled: isGuestWithDifferentServices(state),
    selectedServices: getServicesData(state),
});

export default connect(mapStateToProps)((SelectServicesContainer));
