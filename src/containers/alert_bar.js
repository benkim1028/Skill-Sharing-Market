import React, {Component} from 'react';
import {connect} from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import {closeAlertBar} from "../actions"; 

class AlertBar extends Component {

  render() {
    return (
      <div>
        <Snackbar
          open={this.props.alert.open}
          message={this.props.alert.message}
          autoHideDuration={2000}
          onRequestClose={this.props.closeAlertBar()}
        />
      </div>
    );
  }
}

function mapStateToProps(state){
  return { alert: state.alert }
}

export default connect(mapStateToProps, {closeAlertBar})(AlertBar);
