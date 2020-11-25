import React from 'react';

import { ID3 } from '../services/surveyService';
import { QUESTIONS } from './questions';
import InitialeForm from './initialeForm';
import AdaptativeForm from './adaptativeForm';
import { getTree } from '../services/surveyService';


class Loading extends React.Component {
  render() {
    return(
      <div className="flex mt-20 text-center">
        <span>Loading</span>
        <img width="25" height="25" src="../../assets/waiting.svg" className="ml-4 animate-spin my-auto"></img>
      </div>
    )
  }
}
export default class WholeForm extends React.Component {

  constructor(props) {
    super(props)
    this.form = <Loading/>
    this.state = {value: ""}
  }

  form

  async componentDidMount() {
    await getTree()
            .then(response => response.json())
            .then(data => {
              if(!data.canGenerate) {
                this.form = <InitialeForm/>
              }
              else {
                this.form = <AdaptativeForm tree={data.tree}/>
              }
              this.setState({value: "loaded"})
            });
  }


  render() {
    return(
      <div className="w-full">
        {this.form}
      </div>
    );
  }
}