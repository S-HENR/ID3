import React from 'react';
import './Form.css';
import { SURVEY } from '../services/surveyService';

export default class WholeForm extends React.Component {
  
  constructor(props) {
    super(props)
    this.survey = SURVEY
    this.buildQuestion()
  }
  survey
  currentQuestion
  isFinalQuestion = false

  state = { value:"" }

  handleChange = (e) => {
      this.setState({
        value: e.target.value
      })
  }

  handleIntermediateSubmit = (e) => {
    e.preventDefault()
    if(this.state.value === "")
      return

    this.survey = this.survey[this.state.value]

    if(typeof(this.survey) == "string") {
      this.isFinalQuestion = true
    }
    else {
      this.buildQuestion()
    }
      
    
    this.setState({
      value: ""
    })

    this.forceUpdate();
  };

  handleFinalSubmit = (e) => {
    e.preventDefault()
    if(this.survey === this.state.value) {
      alert('Thank you for your time !')
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

  askOtherQuestions() {
    console.log("ok let's go")
  }


  render() {
    if(!this.isFinalQuestion) {
      return (
        <form>
          <div className="mb-5 text-xl text-c2 text-gray-700 py-2 px-2 border-l-4 border-yellow-300 capitalize">
            {this.currentQuestion.question}
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
}