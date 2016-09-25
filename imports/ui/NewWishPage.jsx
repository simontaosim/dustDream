import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { Link, hashHistory } from 'react-router';


import { Tasks } from '../api/tasks.js';


class NewWishPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dropVal: 1
    };
  }

   handleChange(event, index, dropVal) {
     this.setState({dropVal});
   }

   handleSubmitBtn(e){

    this.handleSubmit(e);

   }

   handleSubmit(e){
     e.preventDefault();
      const taskType = this.refs.taskType.props.value;
      const taskTitle = this.refs.taskTitle.getValue();
      const taskDescription = this.refs.taskDescription.getValue();


      Tasks.insert({
        taskType,
        taskTitle,
        taskDescription,
        createdAt: new Date(), // current time
      });
      hashHistory.push("/");




   }



  render() {
    return (
      <div><br /><br />
        <form onSubmit={this.handleSubmit.bind(this)}>
          <SelectField ref="taskType" value={this.state.dropVal} onChange={this.handleChange.bind(this)}   fullWidth={true}>
              <MenuItem value={1} primaryText="今日心愿" />
              <MenuItem value={2} primaryText="这几个星期" />
              <MenuItem value={3} primaryText="这几年" />
              <MenuItem value={4} primaryText="毕生心愿" />
            </SelectField>
            <TextField ref="taskTitle"
              hintText="心愿标题"
                floatingLabelText="心愿标题" fullWidth={true}
            /><br /><br />
            <TextField ref="taskDescription"
              hintText="越具体越说明您思维的清晰"
              floatingLabelText="主要描述"
              multiLine={true}
              rows={2}
              fullWidth={true}
            /><br /><br /><br /><br />
            <RaisedButton label="提交了吧，不忘此心" secondary={true} fullWidth={true}  onTouchTap={this.handleSubmitBtn.bind(this)}  />
            <br /><br /><br /><br />
          </form>
     </div>
    );
  }
}

export default NewWishPage;
