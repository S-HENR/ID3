import React from 'react';
import { getTranslation } from './services/translationService';
export default class ThanksPage extends React.Component {
    
  constructor(props) {
    super(props)
    this.preferredLang = localStorage.getItem('preferredLang')
  }

  preferredLang
  textTranslated
  text = [
    "Thank You !",
    "Thank you for your precious time !",
    "Credit: Victor Cavero - Seraphin Henry - Thomas Martin"
  ]

  async componentDidMount() {
    this.translateText()
  }

  async translateText() {
    let result = []
    let lang = this.preferredLang
    if(lang !== 'en') {
      var data = {text: "", targetLanguage: lang, sourceLanguage: 'en'}
  
      for(let i = 0 ; i < this.text.length ; i++) {
        data.text = this.text[i]
        try {
          const res = await getTranslation(data)
          if (res.statusCode > 200) {
            throw 'error';
          }
          result[i] = res.translatedText
        } catch(err) {
          result[i] = this.text[i]
        }
      }
      this.textTranslated = result
    }
    else {
      this.textTranslated = this.text
    }
  }

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