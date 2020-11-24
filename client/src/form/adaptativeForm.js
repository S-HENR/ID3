import React from 'react';

import { ID3 } from '../services/surveyService';
import ThanksPage from '../thanksPage';
import { QUESTIONS } from './questions';

export default class AdaptativeForm extends React.Component {
  
  constructor(props) {
    super(props)
    this.survey = ID3
    this.answeredQuestions = {
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
    this.buildQuestion()
  }
  survey
  currentQuestion
  isFinalQuestion = false
  answeredQuestions
  isSent = false

  state = { value:"" }

  handleChange = (e) => {
      this.setState({
        value: e.target.value
      })
  }

  addToAnsweredQuestions() {
    this.answeredQuestions[this.currentQuestion.question] = this.state.value
  }

  handleIntermediateSubmit = (e) => {
    e.preventDefault()
    if(this.state.value === "")
      return

    this.survey = this.survey[this.state.value]

    this.addToAnsweredQuestions()

    if(typeof(this.survey) == "string") {
      this.isFinalQuestion = true
      this.currentQuestion = {
        question: 'result',
        answers: ['yes','no']
      }
    }
    else {
      this.buildQuestion()
    }  
    
    this.setState({
      value: ""
    })
  };

  handleFinalSubmit = (e) => {
    e.preventDefault()

    this.addToAnsweredQuestions()

    if(this.survey === this.state.value) {
      this.isSent = true
      this.forceUpdate()
    }
    else {
      this.askOtherQuestions()
    }
  }

  buildQuestion() {
    const [key, value] = Object.entries(this.survey)[0]

    this.currentQuestion = {
      question: key,
      answers: Object.keys(value)
    }
    this.survey = this.survey[key]
  }

  getQuestion(idQuestion) {
    let question
    QUESTIONS.find(q => {if(q.id === idQuestion) question = q.question})
    return question
  }

  askOthersQuestions() {
    console.log("ok let's go")
  }

  render() {
    let isInput
    QUESTIONS.find((q)=> {
      if(q.id === this.currentQuestion.question) {
        isInput = q.answers[0] === 'open'
      }
    })
    if(!this.isSent) {
      if(!this.isFinalQuestion) {
        if(isInput) {
          return (
            <form className="ml-10">
              <div className="mb-5 text-xl text-c2 text-gray-700 py-2 px-2 border-l-4 border-yellow-300">
                {this.getQuestion(this.currentQuestion.question)}
              </div>
              <div className="ml-10">
                <input 
                  className="shadow appearance-none border rounded py-2 px-3 text-grey-darker border border-yellow-300"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
              </div>
              <button className="float-right bg-white text-xl text-gray-800 font-bold rounded border-b-2 border-yellow-300 shadow-md py-2 px-6 inline-flex items-center" onClick={this.handleIntermediateSubmit}>
                <span className="mr-2">Next</span>
                <img width="18" height="18" src="../../assets/right-arrow.svg" className="ml-4 animate-bounce my-auto"></img>
              </button>
            </form>
          );
        }
        else {
          return (
            <form className="ml-10">
              <div className="mb-5 text-xl text-c2 text-gray-700 py-2 px-2 border-l-4 border-yellow-300">
                {this.getQuestion(this.currentQuestion.question)}
              </div>
              <div className="ml-10">
                {this.currentQuestion.answers.map(answer => 
                  <div className="mb-2">
                    <input 
                      id={answer}
                      type="radio" 
                      value={answer}
                      onChange={this.handleChange}
                      checked={this.state.value === answer}
                    />
                    <label for={answer} className="ml-2 capitalize text-lg text-c2 text-gray-700">{answer}</label>
                  </div>
                )}
              </div>
              <button className="float-right bg-white text-xl text-gray-800 font-bold rounded border-b-2 border-yellow-300 shadow-md py-2 px-6 inline-flex items-center" onClick={this.handleIntermediateSubmit}>
                <span className="mr-2">Next</span>
                <img width="18" height="18" src="../../assets/right-arrow.svg" className="ml-4 animate-bounce my-auto"></img>
              </button>
            </form>
          );
        }
      }
      else {
        return (
          <form> 
            <div className="mb-5 text-xl text-c2 text-gray-700 py-2 px-2 border-l-4 border-yellow-300 capitalize">
              Do you want to play ?
            </div>
            <div className="ml-10">
                <div className="mb-2">
                  <input 
                    id="yes"
                    type="radio" 
                    value="yes"
                    onChange={this.handleChange}
                    checked={this.state.value === "yes"}
                  />
                  <label for="yes" className="ml-2 capitalize text-lg text-c2 text-gray-700">Yes, Totally !</label>
                </div>
                <div className="mb-2">
                  <input 
                    id="no"
                    type="radio" 
                    value="no"
                    onChange={this.handleChange}
                    checked={this.state.value === "no"}
                  />
                  <label for="no" className="ml-2 capitalize text-lg text-c2 text-gray-700">Nah, Maybe another time !</label>
                </div>
            </div>
            <button className="float-right bg-white text-xl text-gray-800 font-bold rounded border-b-2 border-yellow-300 shadow-md py-2 px-6 inline-flex items-center" onClick={this.handleFinalSubmit}>
              <span className="mr-2">Finish</span>
              <img width="18" height="18" src="../../assets/right-arrow.svg" className="ml-4 animate-bounce my-auto"></img>
            </button>
          </form>
        );
      }
    }
    else {
      return <ThanksPage/>
    }
    
  }
}