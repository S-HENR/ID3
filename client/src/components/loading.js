import React from 'react';


export default class Loading extends React.Component {
    render() {
      return(
        <div className="flex mt-20 text-center">
          <span>Loading</span>
          <img width="25" height="25" src="../../assets/waiting.svg" className="ml-4 animate-spin my-auto"></img>
        </div>
      )
    }
  }