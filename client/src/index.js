import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import WholeForm from './form/form';
import { getTranslation } from './services/translationService';
import { LANGS } from './langs'

import reportWebVitals from './reportWebVitals';
import Loading from './components/loading';


class HomePage extends React.Component {

  constructor(props) {
    super(props)
    if(!localStorage.getItem('preferredLang')) {
      localStorage.setItem('preferredLang', 'en')
    }
    this.state = {targetLang: localStorage.getItem('preferredLang'), textTranslated: this.text, loading:false}
    this.handleChange = this.handleChange.bind(this)
    this.translateText = this.translateText.bind(this)
    this.langs = LANGS
    
  }
  langs
  text = [
    "Select a language :",
    "Hello !", 
    "We welcome you to this soccer player survey! Amateur or confirmed soccer players, it doesn't matter!",
    "Could we ask you to fill out our survey? It won't take long. And if we've done a good job, it will be even faster!",
    "Get Started !",
    "Credit"
  ]

  handleChange = async (event) => {
    this.setState({loading: true})
    localStorage.setItem('preferredLang', event.target.value)
    await this.translateText(event.target.value)
    
  }

  componentDidMount() {
    this.translateText(this.state.targetLang)
  }

  async translateText(lang) {
    let result = []
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
      this.setState({targetLang: lang, textTranslated: result, loading: false })
    }
    else {
      this.setState({targetLang: lang, textTranslated: this.text, loading:false })
    }
  }

  render() {


    return(
      <div>
        {this.state.loading ? <Loading />:
          <div>
            <div className="float-right">
              <label>
                {this.state.textTranslated[0]}
                <select value={this.state.targetLang} onChange={this.handleChange}>
                  {this.langs.map(lang => 
                    <option value={lang.code}>{lang.name}</option>
                  )}
                </select>
              </label>
            </div>
            <br/>
            <div className="text-center">
              <h1 className="tracking-wide text-4xl text-gray-700">{this.state.textTranslated[1]}</h1>
              <p className="mt-10 tracking-wide text-2xl text-justify text-gray-700">{this.state.textTranslated[2]}</p>
              <p className="mt-5 tracking-wide text-xl text-justify text-gray-700">{this.state.textTranslated[3]}</p>
              <button className="bg-white text-xl text-gray-800 font-bold rounded border-b-2 border-yellow-300 shadow-md py-2 px-6 mt-10 inline-flex items-center" onClick={start}>
                <span className="mr-2">{this.state.textTranslated[4]}</span>
              </button>
              <div className="mt-10 text-sm font-thin">
                {this.state.textTranslated[5]}: Victor Cavero - Seraphin Henry - Thomas Martin
              </div>
            </div>

          </div>
        }

      </div>
    )
  }

}

var containerToDisplay = <HomePage/>

function start() {
  containerToDisplay = <FormPage/>
  screen()
}

function stop() {
  containerToDisplay = <HomePage/>
  screen()
}

function FormPage() {
  return(
    <div>
      <div className="">
        <button className="mb-10 inline-flex items-center" onClick={stop}>
          <img width="18" height="18" src="../assets/left-arrow.svg" className="my-auto"></img>
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
