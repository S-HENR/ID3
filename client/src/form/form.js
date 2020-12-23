import React from 'react';

import { ID3 } from '../services/surveyService';
import { QUESTIONS } from './questions';
import InitialeForm from './initialeForm';
import AdaptativeForm from './adaptativeForm';
import { getTree } from '../services/surveyService';
import { getFormTranslation } from '../services/translationService';
import Loading from '../components/loading';
import Error from '../components/error';


export default class WholeForm extends React.Component {

  constructor(props) {
    super(props)
    this.form = <Loading/>
    this.state = {value: ""}
  }


  async componentDidMount() {
    getTree()
      .then(response => response.json())
      .then(async(data) => { 
        console.log(data)
        
        if(!data.canGenerate) {
  
          try {
          const survey = await this.translateSurvey()
          if (survey.statusCode > 200) {
            throw 'error';
          }
          this.form = <InitialeForm questions={survey}/>
          } catch(err) {
            this.form = <Error text="An error has occured with the translating service, please try again later"/>
          }

         
        }
        else {
          console.log("boi")
          this.form = <AdaptativeForm tree={data.tree}/>
        }
        this.setState({value: "loaded"})
      });
  }

  async translateSurvey() {
    const lang = localStorage.getItem('preferredLang')

    if (lang != "en" ){
      const res = await getFormTranslation({
        targetLanguage: localStorage.getItem('preferredLang'),
        questionsAnswers: QUESTIONS
      })
      return res.questionsAnswers
    }

    return QUESTIONS

  }

  render() {
    return(
      <div className="w-full">
        {this.form}
      </div>
    );
  }
}