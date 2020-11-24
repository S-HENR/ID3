import React from 'react';

export default class ThanksPage extends React.Component {
    
  render() {
    return(
      <div className="text-center">
        <h1 className="tracking-wide text-4xl text-gray-700">Thank You !</h1>
        <p className="mt-10 tracking-wide text-2xl text-justify text-gray-700">Thank you for your precious time !</p>
        <div className="mt-10 text-sm font-thin">
          Credit: Victor Cavero - Seraphin Henry - Thomas Martin
        </div>
      </div>
    );
  }
}