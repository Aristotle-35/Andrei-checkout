import React from 'react';
import Price from './Price.jsx';

var server = "http://localhost:3000/api/turash/checkouts"
class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      price: ''
    }
  }

  getCars () {
    fetch(`${server}/1`)
    .then(res => {
      if(res.ok) {
        return res.json()
      } else {
        throw new Error('No result!');
      }
    })
    .then(
      (result) => {
        console.log(result)
        this.setState({
          price: result[0]['price']
        });
        
      })
    .catch(error => console.log(error))
  }

  componentDidMount () {
    this.getCars();
  }

  render () {
    console.log('price', this.state.price)
    return (
      <div>
          <Price price={this.state.price} />
      </div>
      )
  }
}

export default App;