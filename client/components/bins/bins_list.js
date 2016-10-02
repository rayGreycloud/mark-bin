import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Bins } from '../../../imports/collections/bins';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import moment from 'moment';

class BinsList extends Component {
  onBinRemove(bin) {
    Meteor.call('bins.remove', bin);
  }

  renderList() {
    return this.props.bins.map(bin => {
      const url = `/bins/${bin._id}`;
      const renderDate = () => {
        const message = 'Last updated at ';
        const timestamp = bin.createdAt;
        return message + moment.unix(timestamp).format('MMM Do YYYY @ h:mm a');
      };

      return (
        <li className="list-group-item" key={bin._id}>
          <Link to={url}>Bin {bin._id}</Link>
          <span className="bin__date">{renderDate()}</span>
          <span className="pull-right">
            <button
              className="btn btn-danger"
              onClick={() => this.onBinRemove(bin)}>Remove</button>
          </span>
        </li>
      );
    });
  }

  render() {
    const transitionOptions = {
      transitionName: "fade",
      transitionEnterTimeout: 500,
      transitionLeaveTimeout: 500
    };

    return (
      <ul className="list-group">
        <ReactCSSTransitionGroup {...transitionOptions}>
          {this.renderList()}
        </ReactCSSTransitionGroup>
      </ul>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('bins');
  Meteor.subscribe('sharedBins');

  return { bins: Bins.find({}).fetch() };
}, BinsList);
