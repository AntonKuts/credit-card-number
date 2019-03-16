import React from 'react';
import './App.css';
import InputMask from 'react-input-mask';
import {Button, Icon} from 'react-materialize';


class CreditCardNumber extends React.Component {
  state = {
    separator: '9999-9999-9999-9999',
    value: '',
    numberWithoutSeparator: '',
    result: false,
  }

  onChangeSeparator = (event) => {
    let separatorMask = '9999' + event.target.value + '9999' + event.target.value + '9999'+ event.target.value + '9999';
    this.setState({
      separator: separatorMask
    });
  }

  onChange = (event) => {
    let numberWithoutSeparator = '';
    if (event.target.value.length === 19){
      numberWithoutSeparator = event.target.value.substr(0,4) + event.target.value.substr(5,4) + event.target.value.substr(10,4) + event.target.value.substr(15,4);
    }
    this.setState({
      value: event.target.value,
      numberWithoutSeparator: numberWithoutSeparator
    });
  }

  SeeResult= () => {
    this.setState({
      result: true,
    });
  }

  beforeMaskedValueChange = (newState, oldState, userInput) => {
    var { value } = newState;
    var selection = newState.selection;
    var cursorPosition = selection ? selection.start : null;

    // keep minus if entered by user
    if (value.endsWith('-') && userInput !== '-' && !this.state.value.endsWith('-')) {
      if (cursorPosition === value.length) {
        cursorPosition--;
        selection = { start: cursorPosition, end: cursorPosition };
      }
      value = value.slice(0, -1);

    }
    return {
      value,
      selection
    };
  }

  render() {
    return (
      <div className="сontainer">
      <h5>Enter your credit card number</h5>
      <input type="text" maxLength='1' pattern="[^0-9]" onChange={this.onChangeSeparator} placeholder="Input separator"/>
      <br/>
      <InputMask mask={this.state.separator} maskChar={null} value={this.state.value} onChange={this.onChange} beforeMaskedValueChange={this.beforeMaskedValueChange}
      placeholder="Input card number" />
      <br/>
      <Button waves='light' disabled={this.state.numberWithoutSeparator ? "" : "disabled"} onClick={this.SeeResult}>
        Enter
      </Button>
      <h5>
        {this.state. result ? this.state.numberWithoutSeparator : ""}
      </h5>
      </div>
    )
  }
}

export default CreditCardNumber;
