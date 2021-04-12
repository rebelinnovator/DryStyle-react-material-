import AccountInformation from '../pages/account/AccountInformation';
import AccountBarflyMembership from '../pages/account/AccountBarflyMembership';
import AccountFavouriteShop from '../pages/account/AccountFavouriteShop';
import AccountHistory from '../pages/account/AccountHistory';
import AccountReplenishment from '../pages/account/AccountReplenishment';
import ConnectedRebookAppointmentDetails from '../pages/account/Partials/RebookAppointmentDetails';
import MyAppointmentsContainer from '../pages/account/MyAppointments/MyAppointmentsContainer';

export default [{
    path: '/account/information',
    Component: AccountInformation,
    label: 'Account Information',
},
{
    path: '/account/my-appointments',
    Component: MyAppointmentsContainer,
    label: 'My Appointments',
},
{
    path: '/account/barfly-membership',
    Component: AccountBarflyMembership,
    label: 'Barfly Membership',
},
{
    path: '/account/favorites',
    Component: AccountFavouriteShop,
    label: 'Favorites',
},
{
    path: '/account/order-history',
    Component: AccountHistory,
    label: 'Order History',
},
{
    path: '/account/auto-replenishment',
    Component: AccountReplenishment,
    label: 'Auto-Replenishment',
},
{
    path: '/account/appointment-details',
    Component: ConnectedRebookAppointmentDetails,
    label: 'Appointment details',
},
{
    path: '/account/appointment-rebook',
    Component: ConnectedRebookAppointmentDetails,
    label: 'Rebook An Appointment',
},
];
