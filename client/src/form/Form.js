import React from 'react';

import { ID3 } from '../services/surveyService';
import { QUESTIONS } from './questions';
import InitialeForm from './initialeForm';
import AdaptativeForm from './adaptativeForm';
import { getTree } from '../services/surveyService';

export default class WholeForm extends React.Component {

  form = <this.Loading/>

  async formToUse() {
    let res = await getTree()
    if(!res.canGenerate) {
      this.form = <InitialeForm/>
    }
    else {
      this.form = `
        <AdaptativeForm/>
      `
    }

    this.forceUpdate()

  }

  Loading() {
    <div className="mt-20">
      Loading
      <img width="25" height="25" src="../../assets/waiting.svg" className="ml-4 animate-spin my-auto"></img>
    </div>
  }

  render() {
    this.formToUse()
    return(
      <div className="w-full">
        {this.form}
      </div>
    );
  }
}