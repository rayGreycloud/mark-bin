import React, { Component } from 'react';

class BinsShare extends Component {
  onShareClick() {
    const email = this.refs.email.value;
    
  }

  render() {
    return (
      <div>
        <footer className="bins-share">
          <div className="input-group">
            <input ref="email" className="form-control" />
            <div className="input-group-btn">
              <button
                onClick={this.onShareClick.bind(this)}
                className="btn btn-default">
                Share Bin
              </button>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default BinsShare;
