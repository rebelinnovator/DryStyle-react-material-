/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
import React from 'react';
import { connect } from 'react-redux';
import { getAvailableDates } from '../../../api/booking-api';
import { getWeekByFirstDate } from '../../../Helpers/dateTime';
import { getSelectedDate } from '../../../state/ducks/Booking/Booking-Selectors';
import BackdropCircularProgress from '../../../app/Components/common/BackdropCircularProgress';
import SummaryWrapper from '../SummaryWrapper';
import DateTime from './DateTime';

const DateTimeContainer = (props) => {
    const selectedDate = props.selectedDate ? new Date(props.selectedDate) : new Date();
    const DATE_FETCH_QUERY = getAvailableDates(getWeekByFirstDate(selectedDate)[0], getWeekByFirstDate(selectedDate)[6]);
    return (
        <SummaryWrapper
            title="DATE & TIME"
            containerStyle={{ padding: '0px', minWidth: '800px' }}
            useFetch={DATE_FETCH_QUERY}
        >
            {({ data, error, loading }) => {
                if (loading) {
                    return <BackdropCircularProgress />;
                }

                if (error) {
                    return null;
                }

                if (data) {
                    return (
                        <DateTime
                            availableDates={data?.[0]?.serviceCategories?.[0]?.services?.[0]?.availability || []}
                            {...props}
                        />
                    );
                }

                return <></>;
            }}
        </SummaryWrapper>
    );
};

const mapStateToProps = (state) => ({
    selectedDate: getSelectedDate(state),
});

export default connect(mapStateToProps)(DateTimeContainer);
