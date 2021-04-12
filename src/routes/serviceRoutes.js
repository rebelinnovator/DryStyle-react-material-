import ServiceStoreLocatorContainer from '../pages/service/locators/ServiceStoreLocationContainer';
import GraphqlMeetOurStylist from '../pages/service/stylist/GraphqlMeetOurStylist';
import GraphqlScreenAddOnsCollection from '../pages/service/addOns/GraphqlScreenAddOnsCollection';
import GraphqlServicesCollection from '../pages/service/services/GraphqlServiceCollections';
import GraphqlScreenButterCup from '../pages/service/butterCup/GraphqlScreenButterCup';

export default [
    {
        path: '/service/add-ons',
        Component: GraphqlScreenAddOnsCollection,
    },
    {
        path: '/service/blow-services',
        Component: GraphqlServicesCollection,
    },
    {
        path: '/service/butter-cup',
        Component: GraphqlScreenButterCup,
    },
    {
        path: '/service/meet-stylist',
        Component: GraphqlMeetOurStylist,
    },
    {
        path: '/service/locator',
        Component: ServiceStoreLocatorContainer,
    },
];
