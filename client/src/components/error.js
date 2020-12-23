import React from 'react';


export default class Error extends React.Component {
    render() {
      return(
        <div className="flex mt-20 text-center">
          <span>{this.props.text}</span>
        </div>
      )
    }
  }