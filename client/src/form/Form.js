import React from 'react';

import { ID3 } from '../services/surveyService';
import { QUESTIONS } from './questions';
import InitialeForm from './initialeForm';
import AdaptativeForm from './adaptativeForm';
import { getTree } from '../services/surveyService';

export default class WholeForm extends React.Component {

  formToUse() {
    getTree().then(res => {
      return res.canGenerate
    })
  }

  render() {

    let form

    if(!this.formToUse()) {
      form = <InitialeForm/>
    }
    else {
      form = <AdaptativeForm/>
    }

    return(
      <div className="w-full">
        {form}
      </div>
    );
  }
}