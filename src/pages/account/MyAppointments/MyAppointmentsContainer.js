/* eslint-disable max-len */
import React from 'react';
import { getAppointments } from '../../../api/booking-api';
import BackdropCircularProgress from '../../../app/Components/common/BackdropCircularProgress';
import useFetch from '../../../Helpers/useFetch';
import MyAppointments from './MyAppointments';

const MyAppointmentsContainer = () => {
    const { data, loading, error } = useFetch(getAppointments());
    if (loading) {
        return <BackdropCircularProgress />;
    }
    if (error) {
        return null;
    }
    if (data) {
        // Temporary date check for upcoming and past - change with proper values
        const upcoming = data?.Results?.filter((appointment) => (new Date(appointment.StartDateTimeOffset) >= new Date()) && appointment.IsCancelled === false).sort((a, b) => new Date(a.StartDateTimeOffset) - new Date(b.StartDateTimeOffset));
        const past = data?.Results?.filter((appointment) => (new Date(appointment.StartDateTimeOffset) < new Date()) || appointment.IsCancelled === true).sort((a, b) => new Date(b.StartDateTimeOffset) - new Date(a.StartDateTimeOffset));
        return (
            <MyAppointments
                upcoming={upcoming}
                past={past}
            />
        );
    }
    return null;
};

export default MyAppointmentsContainer;
