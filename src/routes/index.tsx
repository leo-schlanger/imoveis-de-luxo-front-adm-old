import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import UsersList from '../pages/UsersList';
import AdvertisementsList from '../pages/AdvertisementsList';
import PlansList from '../pages/PlansList';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/users" isPrivate component={UsersList} />
    <Route path="/advertisements" isPrivate component={AdvertisementsList} />
    <Route path="/plans" isPrivate component={PlansList} />
  </Switch>
);

export default Routes;
