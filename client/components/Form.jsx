import React from 'react';
import style from 'styled-components';
import locLogo from '../../public/icon-location.png';

const Logo = style.img`
  width: 30px;
  height: 30px;
`;

const Input = style.div`
  height: 70px;
  background-color: green;
  text-align: center;
`;

const Input2 = style.input`
  display: block;
  margin : 0 auto;
  height: 30px;
`;

class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        listOpen: false,
        headerTitle: 'Location on your choice',
        inputValue: '',
      }

      this.onSubmit = this.onSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
      this.toggleForm = this.toggleForm.bind(this);
    }
  
    toggleForm () {
        this.setState(prevState => ({
          listOpen: !prevState.listOpen
        }))
      }

    onSubmit (event) {
      event.preventDefault();
      this.setState({
        listOpen: false,
      })
      this.props.grab(this.state.headerTitle);
    }
  
    onChange (event) {
      console.log(event.target.value);
      this.setState ({
        inputValue: event.target.value,
        headerTitle: event.target.value,
      })
    }
  
  render () {
    if (!this.state.listOpen) {
      return (<div>
        <Logo src={locLogo} alt="locLogo">
        </Logo>
        <span onClick={this.toggleForm}>
          {this.state.headerTitle}
          <div>
            $100
          </div>
        </span>
      </div>
      )
    }
    return (
      <form onSubmit={this.onSubmit}>
        <Input>
          <Input2 type="text" 
          name="delivery" onChange={this.onChange} value={this.state.inputValue}/>
        </Input>
      </form>
    )
  }
}
  
  
  export default Form;