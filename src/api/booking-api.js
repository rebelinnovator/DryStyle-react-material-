export const getServices = () => ({
    url: '/booker/FindTreatments',
    data: {
        method: 'POST',
        urlParams: {},
        data: {
            LocationID: 22889,
        },
    },
});

export const getAddOnsData = () => ({
    url: '/booker/GetTreatmentAddOns',
    data: {
        method: 'GET',
        urlParams: {
            id: 2422965,
        },
        data: {},
    },
});

export const getAvailableDates = (startDate, endDate) => ({
    url: '/booker/AvailableDates',
    data: {
        method: 'GET',
        urlParams: {},
        data: {
            locationIds: 1639,
            fromDate: startDate,
            toDate: endDate,
            serviceId: 2490102,
        },
    },
});

export const getSlots = (selectedDate) => ({
    url: '/booker/Availability1Day',
    data: {
        method: 'GET',
        urlParams: {},
        data: {
            LocationId: 1639,
            fromDateTime: selectedDate,
            IncludeEmployees: true,
            serviceId: 2490102,
        },
    },
});

export const createAppointment = ({ startDate, endDate }) => ({
    url: '/booker/CreateAppointment',
    data: {
        method: 'POST',
        urlParams: {},
        data: {
            AppointmentDateOffset: startDate,
            AppointmentTreatmentDTOs: [
                {
                    EmployeeID: 119629,
                    StartTimeOffset: startDate,
                    EndTimeOffset: endDate,
                    TreatmentID: 2490102,
                    RoomID: 11519,
                }],
            Customer: {
                FirstName: 'Steve',
                LastName: 'Monkeytime',
                Email: 'steve.witkos@thedrybar.com',
                HomePhone: '7147881059',
                ID: '119704791',
            },
            ResourceTypeID: 1,
            LocationID: '1639',
        },
    },

});

export const updateAppointment = ({ startDate, endDate }) => ({
    url: '/booker/UpdateAppointment',
    data: {
        method: 'POST',
        urlParams: {},
        data: {
            AppointmentDateOffset: startDate,
            AppointmentTreatmentDTOs: [
                {
                    EmployeeID: 119629,
                    StartTimeOffset: startDate,
                    EndTimeOffset: endDate,
                    TreatmentID: 2490102,
                    RoomID: 11519,
                }],
            Customer: {
                FirstName: 'Steve',
                LastName: 'Monkeytime',
                Email: 'steve.witkos@thedrybar.com',
                HomePhone: '7147881059',
                ID: '119704791',
            },
            ResourceTypeID: 1,
            LocationID: '1639',
        },
    },

});

export const cancelAppointment = (ID) => ({
    url: '/booker/CancelAppointment',
    data: {
        method: 'PUT',
        urlParams: {},
        data: {
            ID,
        },
    },
});

export const getAppointments = () => ({
    url: '/booker/FindAppointments',
    data: {
        method: 'POST',
        urlParams: {},
        data: {
            CustomerID: '119704791',
            LocationID: '1639',
        },
    },
});

export const getSpecialByCode = (promoCode) => ({
    url: '/booker/GetSpecialByCode',
    data: {
        method: 'GET',
        urlParams: {
            id: '1639'
        },
        data: {
            couponcode: promoCode
        },
    }
})

export default {
    getServices,
    getAddOnsData,
};
