import React from 'react';

import { LANGS } from './langs';

export default class DropdownLangs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'en'}
    this.props.targetLang('en')
    this.langs = LANGS
    this.handleChange = this.handleChange.bind(this)
  }
  
  lang

  handleChange(event) {
    this.setState({value: event.target.value})
    this.props.targetLang(event.target.value)
  }
  
  render() {
    return (
      <label>
        Select a language:
        <select value={this.state.value} onChange={this.handleChange}>
          {this.langs.map(lang => 
            <option value={lang.code}>{lang.name}</option>
          )}
        </select>
      </label>
    );
  }
}