import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { hashHistory, Link } from 'react-router';

import Routes from '../imports/routes/index'
Meteor.startup(() => {
  render(<Routes location={hashHistory} />, document.getElementById('render-target'));
});
