import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import UsersList from '../pages/UsersList';
import AdvertisementsList from '../pages/AdvertisementsList';
import PlansList from '../pages/PlansList';
import UserDetails from '../pages/UserDetails';
import PlanDetails from '../pages/PlanDetails';
import AdvertisementDetails from '../pages/AdvertisementDetails';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/users" exact isPrivate component={UsersList} />
    <Route path="/users/:id" isPrivate component={UserDetails} />
    <Route
      path="/advertisements"
      exact
      isPrivate
      component={AdvertisementsList}
    />
    <Route
      path="/advertisements/:id"
      isPrivate
      component={AdvertisementDetails}
    />
    <Route path="/plans" exact isPrivate component={PlansList} />
    <Route path="/plans/:id" isPrivate component={PlanDetails} />
  </Switch>
);

export default Routes;
