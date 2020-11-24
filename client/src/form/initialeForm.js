import React from 'react';

import { QUESTIONS } from './questions';

import { sendSurvey } from '../services/surveyService';

import ThanksPage from '../thanksPage';

export default class InitialeForm extends React.Component {
  
  constructor(props) {
    super(props)
    this.questions = QUESTIONS
    this.state = this.initialeState
  }

  initialeState = {
    outlook : "",
    temp : "",
    humidity : "",
    wind : "",
    friends_avail : "",
    homework : "",
    day_night : "",
    localisation : "",
    lights : "",
    inj_sick : "",
    transport : "",
    result : ""
  }
  questions
  state
  isLoading = false
  isSent = false

  handleChange = (e) => {
      this.setState({
        ...this.state,
        [e.target.name] : e.target.value
      })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let arr = Object.values(this.state)
    
    if(arr.indexOf("") > -1)
      return

    let answers = this.state
    for(var key in answers) {
      if(key !== 'inj_sick' && key !== 'transport')
        if(answers[key] === 'yes') {
          answers[key] = true
        }
        else if(answers[key] === 'no') {
          answers[key] = false
        }
    }
    this.isLoading = true
    this.forceUpdate()
    sendSurvey(answers)
      .then( () => {
        this.isLoading = false
        this.setState({ ...this.initialeState})
        this.isSent = true
        this.forceUpdate()
      })
    
    
  };

  render() {
    if(!this.isSent) {
      return (
        <div>
          <div className="uppercase tracking-wide text-2xl text-gray-700 mb-4">
            Do you want to play football ?
          </div>
          <form>
            {this.questions.map(q => 
              <div className="ml-10">
                <div className="mb-5 text-xl text-c2 text-gray-700 py-2 px-2 border-l-4 border-yellow-300">
                  {q.question}
                </div>
                {q.answers[0] !== 'open' && 
                  <div className="ml-10">
                    {q.answers.map(answer => 
                      <div className="mb-2">
                        <input 
                          id={`${q.id}-${answer}`}
                          type="radio" 
                          value={answer}
                          name={q.id}
                          onChange={this.handleChange}
                          checked={this.state[q.id] === answer}
                        />
                        <label htmlFor={`${q.id}-${answer}`} className="ml-2 capitalize text-lg text-c2 text-gray-700">{answer}</label>
                      </div>
                    )}
                  </div>
                }
                {q.answers[0] === 'open' && 
                  <div className="ml-10">
                    <input 
                      className="shadow appearance-none rounded py-2 px-3 text-grey-darker border border-yellow-300"
                      value={this.state[q.id]}
                      name={q.id}
                      onChange={this.handleChange}
                    />
                  </div>
                }
              </div>
            )}
            <div className="ml-10">
              <div className="mb-5 text-xl text-c2 text-gray-700 py-2 px-2 border-l-4 border-yellow-300 capitalize">
                Do you want to play ?
              </div>
              <div className="ml-10">
                  <div className="mb-2">
                    <input 
                      id="result-yes"
                      type="radio"
                      name="result"
                      value="yes"
                      onChange={this.handleChange}
                      checked={this.state['result'] === "yes"}
                    />
                    <label htmlFor="result-yes" className="ml-2 capitalize text-lg text-c2 text-gray-700">Yes, Totally !</label>
                  </div>
                  <div className="mb-2">
                    <input 
                      id="result-no"
                      type="radio" 
                      value="no"
                      name="result"
                      onChange={this.handleChange}
                      checked={this.state['result'] === "no"}
                    />
                    <label htmlFor="result-no" className="ml-2 capitalize text-lg text-c2 text-gray-700">Nah, Maybe another time !</label>
                  </div>
              </div>
            </div>
            <button className="float-right bg-white text-xl text-gray-800 font-bold rounded border-b-2 border-yellow-300 shadow-md py-2 px-6 inline-flex items-center" onClick={this.handleSubmit}>
              <span className="mr-2">Submit</span>
              {!this.isLoading && <img width="18" height="18" src="../../assets/right-arrow.svg" className="ml-4 animate-bounce my-auto"></img>}
              {this.isLoading && <img width="18" height="18" src="../../assets/waiting.svg" className="ml-4 animate-spin my-auto"></img>}
            </button>
          </form>
        </div>
      );
    }
    else {
      return <ThanksPage/>
    }
    
  }
}