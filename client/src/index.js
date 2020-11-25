import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import WholeForm from './form/form';

import reportWebVitals from './reportWebVitals';

var containerToDisplay = <HomePage/>

function start() {
  containerToDisplay = <FormPage/>
  screen()
}

function stop() {
  containerToDisplay = <HomePage/>
  screen()
}

function HomePage() {
  return(
    <div className="text-center">
      <h1 className="tracking-wide text-4xl text-gray-700">Hello !</h1>
      <p className="mt-10 tracking-wide text-2xl text-justify text-gray-700">We welcome you to this soccer player survey! Amateur or confirmed soccer players, it doesn't matter!</p>
      <p className="mt-5 tracking-wide text-xl text-justify text-gray-700">Could we ask you to fill out our survey? It won't take long. And if we've done a good job, it will be even faster!</p>
      <button className="bg-white text-xl text-gray-800 font-bold rounded border-b-2 border-yellow-300 shadow-md py-2 px-6 mt-10 inline-flex items-center" onClick={start}>
        <span className="mr-2">Get Started !</span>
      </button>
      <div className="mt-10 text-sm font-thin">
        Credit: Victor Cavero - Seraphin Henry - Thomas Martin
      </div>
    </div>
  )
}

function FormPage() {
  return(
    <div>
      <div className="">
        <button className="mb-10 inline-flex items-center" onClick={stop}>
          <img width="18" height="18" src="../assets/left-arrow.svg" className="my-auto"></img>
          <span className="ml-2">Return home</span>
        </button>
      </div>
      <WholeForm/>
    </div>
  )
}

function screen() {
  ReactDOM.render(
    <React.StrictMode>
      <div className="overflow-hidden shadow-lg border-t-4 bg-white mb-4 rounded-b-lg rounded-t border-yellow-300 w-8/12 mt-10 flex mx-auto">
        <div className="px-6 py-4 mb-2 mt-4 mb-8 w-full">
          {containerToDisplay}
        </div>
      </div>
          
    </React.StrictMode>,
    document.getElementById('root')
  );
}

screen()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
