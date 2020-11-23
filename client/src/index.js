import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Form from './form/Form';
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <div className="overflow-hidden shadow-lg border-t-4 bg-white mb-4 rounded-b-lg rounded-t border-yellow-300 w-8/12 mt-10 flex mx-auto">
      <div className="px-6 py-4 mb-2 mt-4 mb-8 w-full">
          <div className="uppercase tracking-wide text-2xl text-gray-700 mb-4">
            Do you want to play football ?
          </div>
          <div className="w-full">
            <Form/>
          </div>
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
