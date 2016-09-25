import React, { Component, PropTypes } from 'react';

import AppBar from 'material-ui/AppBar';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Link, hashHistory } from 'react-router';


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



import { createContainer } from 'meteor/react-meteor-data';

import MyWishPage from './MyWishPage'



injectTapEventPlugin();


// App component - represents the whole app
class App extends Component {

  constructor(props){
    super(props);
    let title = this.getTitle(this.props.location.pathname);
    this.state = {
      open: false,
      title: title
    }
  }


  componentDidMount() {
    let title = this.getTitle(this.props.location.pathname);
    this.setState({title});

  }

  componentWillReceiveProps(newProps){

    let title = this.getTitle(newProps.location.pathname);
    this.setState({title});
    this.forceUpdate();

  }

  getTitle(pathname){
    switch (pathname) {
      case '/':
        return '我的心愿';
      case '/wishes/new':
        return '新的心愿';
      default:

    }
  }


  renderTasks() {
    return this.props.tasks.map((task) => (
      <ListItem key="task._id"
        value={task._id}
        primaryText={task.text}
      />
    ));
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
              title={this.state.title}
              iconClassNameRight="muidocs-icon-navigation-expand-more"
              onLeftIconButtonTouchTap={() => this.setState({open: !this.state.open})}
              iconClassNameRight="ffix"
              iconElementRight={
              <IconMenu
                iconButtonElement={
                  <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                  <MenuItem primaryText="消息"/>
                <MenuItem primaryText="新愿望" onTouchTap={()=>{hashHistory.push('/wishes/new')}} />
                <MenuItem primaryText="求助" />

              </IconMenu>
            }

            />
            <div style={{height: "100%"}}>

            {this.props.children}


         </div>

         <Drawer docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}>
            <MenuItem  onTouchTap={()=>{hashHistory.push('/'); this.setState({open: false});}} >我的愿望</MenuItem>
            <MenuItem>去执行</MenuItem>
            <MenuItem>朋友</MenuItem>
            <MenuItem>设置</MenuItem>
          </Drawer>
        </div>
     </MuiThemeProvider>

    );
  }
}

export default App
