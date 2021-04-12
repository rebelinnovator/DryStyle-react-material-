import Booking from '../pages/booking/Bookng';
import BookingConfirmation from '../pages/booking/Confirmation/BookingConfirmation';

import LogInContainer from '../app/Components/Auth/LogInContainer';
import SignUpContainer from '../app/Components/Auth/Partials/Registration/RegistrationUser';
import Account from '../pages/account/Account';
import Service from '../pages/service/Service';
import Home from "../pages/home/Home";
import Events from "../pages/events/Events";
import HelpCenter from "../pages/faqs/help-center";
import FaqDetailsSectionView from "../pages/faqs/faq-details-section";
import TheStyles from "../pages/the-styles/TheStyles";
import DryStyling from "../pages/dry-styling/dry-styling";
import FranchiseView from "../pages/franchise/franchise";
import BarflyMembershipEnrollment from '../pages/BarflyMembership/GraphqlBarflyMembership';
import BarflyEnrollmentPage from '../pages/BarflyMembership/BarflyEnrollmentPage';
import PrivacyPolicy from "../pages/privacy-policy/privacy-policy";

export default [
    {
        path: '/service/:page',
        Component: Service,
    },
    {
        path: '/auth/login',
        Component: LogInContainer,
    },
    {
        path: '/auth/sign-up',
        Component: SignUpContainer,
    },
    {
        path: '/appointment-confirm',
        Component: BookingConfirmation,
    },
    {
        path: '/account/:page',
        Component: Account,
        privateRoute: true,
    },
    {
        path: '/booking/:page',
        Component: Booking,
    },
    {
        path: '/events',
        Component: Events,
    },
    {
        path: '/faqs/:id',
        Component: FaqDetailsSectionView,
    },
    {
        path: '/faqs',
        Component: HelpCenter,
    },
    {
        path: '/dry-styling',
        Component: DryStyling
    },
    {
        path: '/the-styles',
        Component: TheStyles
    },
    {
        path: '/franchising',
        Component: FranchiseView
    },
    {
        path: '/barfly-confirm',
        Component: BarflyMembershipEnrollment,
    },
    {
        path: '/barfly-membership-enrollment',
        Component: BarflyEnrollmentPage,
        privateRoute: true,
    },
    {
        path: '/barfly-membership',
        Component: BarflyMembershipEnrollment,
    },
    {
        path: '/privacy-policy',
        Component: PrivacyPolicy
    },
    {
        path: '/franchising',
        Component: FranchiseView
    },
    {
        path: '/',
        Component: Home,
    },
];
