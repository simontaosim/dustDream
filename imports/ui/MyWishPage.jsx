import React, { Component, PropTypes } from 'react';

import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import Divider from 'material-ui/Divider';
import { Link, hashHistory } from 'react-router';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton'
import Checkbox from 'material-ui/Checkbox';


var dateformat = require('date-format');


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};
let SelectableList = MakeSelectable(List);

import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';


class MyWishPage extends Component {
  constructor(props){
    super(props);
  }

  renderTasks(type) {

    return this.props[type].map((task) => (
      <div data-key={task._id}>
      <ListItem
        value={task._id}
        primaryText={
          <div className={task.checked ? 'checked' : ''}>
            {task.taskTitle}
          </div>

        }
        rightIconButton={
          <div>
            <span style={{float: "left", position: "relative", top: "12px", left: "15px"}}>
            <Checkbox
               label=""
               defaultChecked={task.checked}
               onTouchTap={this.toggleChecked.bind(this, task._id, task)}
             />
            </span>
            <span>
            <IconButton onTouchTap={this.deleteThisTask.bind(this, task._id)}>
              <ClearIcon />
             </IconButton>
            </span>


          </div>

        }
        secondaryText={
            <p>
              <span>决心于：&nbsp;</span><span style={{color: 'darkBlack'}}>{dateformat('yyyy/MM/dd/hh:mm:ss', task.createdAt)}</span>

            </p>
          }
         secondaryTextLines={2}
      />
      <Divider inset={true} />
      </div>
    ));
  }
  deleteThisTask(id) {
    Tasks.remove(id);
  }

  toggleChecked(id, task) {
    console.log(id);

    // Set the checked property to the opposite of its current value
    Tasks.update(id, {
      $set: { checked: !task.checked },
    });
  }

  render() {
    return (
      <Tabs>
        <Tab label="今日" >
          <SelectableList>
              {this.renderTasks("tasksToday")}

          </SelectableList>
        </Tab>
        <Tab label="几周" >
        <SelectableList>
            {this.renderTasks("tasksWeeks")}

        </SelectableList>
        </Tab>
        <Tab
          label="几年"
          data-route="/home"
        >
        <SelectableList>
            {this.renderTasks("tasksYears")}

        </SelectableList>
        </Tab>
        <Tab
          label="永久"
          data-route="/home"
        >
        <SelectableList>
            {this.renderTasks("tasksLife")}

        </SelectableList>
        </Tab>
  </Tabs>
    );
  }
}

MyWishPage.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    tasksToday: Tasks.find({taskType: 1}, { sort: { createdAt: -1 } }).fetch(),
    tasksWeeks: Tasks.find({taskType: 2}, { sort: { createdAt: -1 } }).fetch(),
    tasksYears: Tasks.find({taskType: 3}, { sort: { createdAt: -1 } }).fetch(),
    tasksLife: Tasks.find({taskType: 4}, { sort: { createdAt: -1 } }).fetch(),
  };
}, MyWishPage);
