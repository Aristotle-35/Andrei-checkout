import React from 'react';



class Price extends React.Component {
  constructor (props) {
    super (props);
   
  }

  render () {
    return (
      <h1>
          ${this.props.price} per day
      </h1>
      )
  }
}

export default Price;