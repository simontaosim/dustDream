import React, {PropTypes} from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import MyWishPage from '../ui/MyWishPage';
import NewWishPage from '../ui/NewWishPage'

import App from '../ui/App';

const Routes = ({ location }) =>
  <Router history={location}>
    <Route path="/" component={App} location={location}>
      <IndexRoute component={MyWishPage} />
      <Route path="/wishes/new" component={NewWishPage} />
    </Route>

  </Router>

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
