import { Switch, Route } from 'react-router-dom';
import React from 'react';
import bookingRoutes from '../../routes/bookingRoutes';
import BookingWrapper from './BookingWrapper';

const Bookng = () => (
    <Switch>
        {
            bookingRoutes.map(({ path, Component }) => (
                <Route
                    path={path}
                    render={() => (
                        <BookingWrapper>
                            {({ goToNextPage }) => <Component goToNextPage={goToNextPage} />}
                        </BookingWrapper>
                    )}
                />
            ))
        }
    </Switch>
);

export default Bookng;
