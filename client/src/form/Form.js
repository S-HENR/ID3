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
      
    
    this.state.value = ""
    console.log(this.isFinalQuestion)
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
          {this.currentQuestion.question}
          {this.currentQuestion.answers.map(answer => 
            <div>
              <input 
                id={answer}
                type="radio" 
                value={answer}
                onChange={this.handleChange}
                checked={this.state.value === answer}
              />
              <label for={answer}>{answer}</label>
            </div>
          )}
          <button onClick={this.handleIntermediateSubmit}>Next</button>
        </form>
      );
    }
    else {
      return (
        <form>
          Do you want to play ?
          <input 
            id="yes"
            type="radio" 
            value="yes"
            onChange={this.handleChange}
            checked={this.state.value === "yes"}
          />
          <label for="yes">Yes</label>
          <input 
            id="no"
            type="radio" 
            value="no"
            onChange={this.handleChange}
            checked={this.state.value === "no"}
          />
          <label for="no">No</label>
          <button onClick={this.handleFinalSubmit}>Finish</button>
        </form>
      );
    }
  }
}