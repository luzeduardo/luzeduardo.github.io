import React from 'react'
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Layout from './Layout';
import ListPrices from './ListPrices';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class AppRouter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <Router>
        <div>
          <RaisedButton
            label="Open Drawer"
            onTouchTap={this.handleToggle}
          />
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
            <MenuItem onTouchTap={this.handleClose}><Link to="/">Register</Link></MenuItem>
            <MenuItem onTouchTap={this.handleClose}><Link to="/list">List</Link></MenuItem>
          </Drawer>

          <Route exact path="/" component={Layout}/>
          <Route exact path="/list" component={ListPrices}/>
        </div>
      </Router>
    );
  }
}

export default AppRouter;
