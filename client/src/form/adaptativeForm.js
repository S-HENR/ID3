import React from 'react';

import { sendSurvey, getTree } from '../services/surveyService';
import ThanksPage from '../thanksPage';
import { QUESTIONS } from './questions';

export default class AdaptativeForm extends React.Component {
  
  constructor(props) {
    super(props)
    this.survey = props.tree
    this.questions = QUESTIONS
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
  isCompleting = false
  remainingQuestions
  isLoading = false
  isCompleted = false

  state = { value:"" }

  componentDidMount() {
    console.log("ADAPTATIVE FORM")
  }

  handleChange = (e) => {
      this.setState({
        value: e.target.value
      })
  }

  handleChangeCompleting = (e) => {
    this.setState({
      ...this.state,
      [e.target.name] : e.target.value
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
    
    if(typeof(this.survey) === "string") {
      this.isFinalQuestion = true
      this.currentQuestion = {
        question: 'result',
        answers: ['yes','no']
      }
      this.setState({
        value: ""
      })
    }
    else if(this.survey === undefined) {
      this.isSent = true
      this.askOthersQuestions(false)
    }
    else {
      this.buildQuestion()
      this.setState({
        value: ""
      })
    }  
    
  };

  handleFinalSubmit = (e) => {
    e.preventDefault()

    this.addToAnsweredQuestions()

    if(this.survey === this.state.value) {
      this.isSent = true
      this.forceUpdate()
    }
    else {
      this.isSent = true
      this.forceUpdate()
      this.askOthersQuestions(true)
    }
  }

  handleCompletingSubmit = (e) => {
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
        this.setState({value: ""})
        this.isCompleted = true
        this.isCompleting = false
        this.forceUpdate()
      })

  }

  buildQuestion() {
    const [key, value] = Object.entries(this.survey)[0]

    for(var answer in value) {
      if(value[answer] === 0) {
        value[answer] = 'no'
      }
      else if(value[answer] === 1) {
        value[answer] = 'yes'
      }
    }

    this.currentQuestion = {
      question: key,
      answers: Object.keys(value)
    }
    this.survey = this.survey[key]
  }

  getQuestion(idQuestion) {
    let question
    this.questions.find(q => {if(q.id === idQuestion) question = q.question})
    return question
  }

  askOthersQuestions(id3IsInacurate) {
    
    this.setState({ ...this.answeredQuestions})
    delete this.state['value']

    this.remainingQuestions = this.questions.filter(question => this.answeredQuestions[question.id] === '')

    if(!id3IsInacurate) {
      this.remainingQuestions.push({id: "result", question: "Do you want to play ?", answers: ['yes', 'no']})
    }

    this.isCompleting = true
    this.forceUpdate()
  }

  render() {
    let isInput
    this.questions.find((q)=> {
      if(q.id === this.currentQuestion.question) {
        isInput = q.answers[0] === 'open'
      }
    })
    if(!this.isCompleting) {
      if(!this.isSent) {
        if(!this.isFinalQuestion) {
          if(isInput) {
            return (
              <div>
                {/* <div className="uppercase tracking-wide text-2xl text-gray-700 mb-4">
                  Do you want to play football ?
                </div> */}
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
              </div>
            );
          }
          else {
            return (
              <div>
                {/* <div className="uppercase tracking-wide text-2xl text-gray-700 mb-4">
                  Do you want to play football ?
                </div> */}
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
                        <label htmlFor={answer} className="ml-2 capitalize text-lg text-c2 text-gray-700">{answer}</label>
                      </div>
                    )}
                  </div>
                  <button className="float-right bg-white text-xl text-gray-800 font-bold rounded border-b-2 border-yellow-300 shadow-md py-2 px-6 inline-flex items-center" onClick={this.handleIntermediateSubmit}>
                    <span className="mr-2">Next</span>
                    <img width="18" height="18" src="../../assets/right-arrow.svg" className="ml-4 animate-bounce my-auto"></img>
                  </button>
                </form>
              </div>
            );
          }
        }
        else {
          return (
            <div>
                {/* <div className="uppercase tracking-wide text-2xl text-gray-700 mb-4">
                  Do you want to play football ?
                </div> */}
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
                      <label htmlFor="yes" className="ml-2 capitalize text-lg text-c2 text-gray-700">Yes, Totally !</label>
                    </div>
                    <div className="mb-2">
                      <input 
                        id="no"
                        type="radio" 
                        value="no"
                        onChange={this.handleChange}
                        checked={this.state.value === "no"}
                      />
                      <label htmlFor="no" className="ml-2 capitalize text-lg text-c2 text-gray-700">Nah, Maybe another time !</label>
                    </div>
                </div>
                <button className="float-right bg-white text-xl text-gray-800 font-bold rounded border-b-2 border-yellow-300 shadow-md py-2 px-6 inline-flex items-center" onClick={this.handleFinalSubmit}>
                  <span className="mr-2">Finish</span>
                  <img width="18" height="18" src="../../assets/right-arrow.svg" className="ml-4 animate-bounce my-auto"></img>
                </button>
              </form>
            </div>
          );
        }
      }
    }
    else {
      return(
        <div>
          {/* <div className="uppercase tracking-wide text-2xl text-gray-700 mb-4">
            Do you want to play football ?
          </div> */}
          <form>
            {this.remainingQuestions.map(q => 
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
                          onChange={this.handleChangeCompleting}
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
                      onChange={this.handleChangeCompleting}
                    />
                  </div>
                }
              </div>
            )}
            <button className="float-right bg-white text-xl text-gray-800 font-bold rounded border-b-2 border-yellow-300 shadow-md py-2 px-6 inline-flex items-center" onClick={this.handleCompletingSubmit}>
              <span className="mr-2">Submit</span>
              {!this.isLoading && <img width="18" height="18" src="../../assets/right-arrow.svg" className="ml-4 animate-bounce my-auto"></img>}
              {this.isLoading && <img width="18" height="18" src="../../assets/waiting.svg" className="ml-4 animate-spin my-auto"></img>}
            </button>
          </form>
        </div>
      );
    }

    if((this.isSent && !this.isCompleting) || (this.isSent && this.isCompleted)) {
      return <ThanksPage/>
    }
  }
}