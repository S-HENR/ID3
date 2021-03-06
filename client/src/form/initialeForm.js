import React from 'react';

import { QUESTIONS } from './questions';

import { sendSurvey } from '../services/surveyService';
import { getFormTranslation, getTranslation } from '../services/translationService';

import ThanksPage from '../thanksPage';

export default class InitialeForm extends React.Component {
  
  constructor(props) {
    super(props)
    this.preferredLang = localStorage.getItem('preferredLang')
    this.state = this.surveyResultsIdx;
  }

  surveyResultsIdx = {
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

  isLoading = false
  isSent = false

  componentDidMount() {
    console.log("INITIAL FORM")
  }
  
  handleChange = (e) => {
   

      this.setState({
        ...this.state,
        [e.target.name] : e.target.value
      })

  }

  handleSubmit = async (e) => {
    e.preventDefault()

    var resSurveys = this.state

    if(Object.values(resSurveys).indexOf("") > -1)
      return

    

    for (const id in resSurveys) {
      if(!isNaN(parseInt(resSurveys[id])) && id != 'result') {
        console.log(id)
        const q = QUESTIONS.find(e => e.id == id)
        resSurveys[id] = q.answers[parseInt(resSurveys[id])]
      }
      
    }

    console.log(resSurveys)    
  

    for(var key in resSurveys) {
      if(key !== 'inj_sick' && key !== 'transport')
        if(resSurveys[key] === 'yes') {
          resSurveys[key] = true
        }
        else if(resSurveys[key] === 'no') {
          resSurveys[key] = false
        }
    }

    const inj_sickTranslated =  await getTranslation({
      text: resSurveys["inj_sick"],
      targetLanguage: 'en',
      sourceLanguage: this.preferredLang
    })

    resSurveys["inj_sick"] = inj_sickTranslated.translatedText
    
    const transportTranslated = await getTranslation({
      text: resSurveys["transport"],
      targetLanguage: 'en',
      sourceLanguage: this.preferredLang
    })

    resSurveys["transport"] = transportTranslated.translatedText


    this.isLoading = true
    this.forceUpdate()
    sendSurvey(resSurveys)
      .then( () => {
        this.isLoading = false
        this.setState({ ...this.surveyResultsIdx})
        this.isSent = true
        this.forceUpdate()
      })
    
    
  };

  render() {
    if(!this.isSent) {
      return (
        <div>
          {/* <div className="uppercase tracking-wide text-2xl text-gray-700 mb-4">
            Do you want to play football ?
          </div> */}
          <form>
            {this.props.questions.map(q => 
              <div className="ml-10">
                <div className="mb-5 text-xl text-c2 text-gray-700 py-2 px-2 border-l-4 border-yellow-300">
                  {q.question}
                </div>
                {q.answers[0] !== ' ' && 
                  <div className="ml-10">
                    {q.answers.map(answer => 
                      <div className="mb-2">
                        <input 
                          id={`${q.id}-${answer}`}
                          type="radio" 
                          value={q.answers.indexOf(answer)}
                          name={q.id}
                          onChange={this.handleChange}
                          //checked={this.state[q.id] === answer}
                        />
                        <label htmlFor={`${q.id}-${answer}`} className="ml-2 capitalize text-lg text-c2 text-gray-700">{answer}</label>
                      </div>
                    )}
                  </div>
                }
                {q.answers[0] === ' ' && 
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