import React from 'react';
import Price from './Price.jsx';
import Start from './Start.jsx';
import Dropdown from './Dropdown.jsx';


var server = "http://localhost:3000/api/turash/checkouts"
class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      price: '',
      dates: '',
      time: '',
    }
  }

  getCars () {
    fetch(`${server}/4`)
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
          price: result[0]['price'], 
          dates: result[0]['dates'],
          time: result[0]['time']
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
        <div>
          <Price price={this.state.price} />
        </div>
          <div className="container1" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <div>
            <Start dates={this.state.dates}/>
            </div>
              <div>
              <Dropdown 
                title="Select time"
                time={this.state.time}
              />
              </div>
          </div>
      </div>
      )
  }
}

export default App;