import React from 'react';
import Price from './Price.jsx';
import Start from './Start.jsx';
import Time from './Time.jsx';
import Location from './Location.jsx'


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
          time: result[0]['time'],
          location: result[0]['location'],
        });
        
      })
    .catch(error => console.log(error))
  }

  componentDidMount () {
    this.getCars();
  }

  render () {
    console.log('location', this.state.location)
    return (
      <div>
        <div>
          <Price price={this.state.price} />
        </div> Trip start
        <div className="container1" style={
          {display: 'flex', 
          flexDirection: 'row', 
          // justifyContent: 'space-between',
          cursor: 'pointer',}
          }>
          <div style={{border: '1px solid red', width: '290px'}}>
            <Start dates={this.state.dates}/>
          </div>
          <div style={{border: '1px solid red', width: '150px'}}>
            <Time 
            time={this.state.time}
            />
          </div>
        </div>
          Trip end 
        <div className="container2" style={
          {display: 'flex', 
          flexDirection: 'row', 
          // justifyContent: 'space-between',
          cursor: 'pointer',}
          }>
          <div style={{border: '1px solid blue', width: '290px'}}>
            <Start dates={this.state.dates}/>
          </div>
          <div style={{border: '1px solid blue', width: '150px'}}>
            <Time 
            time={this.state.time}
            />
          </div>
        </div>
          Pickup & return location
        <div className="container3" style={
          {display: 'flex', 
          flexDirection: 'colomn', 
          justifyContent: 'center',
          cursor: 'pointer',
          border: '1px solid green',
          width: '441px'}
          }>
            <Location location={this.state.location}/>
        </div>
        <div className="container4" style={
          {
          color: 'white',
          width: '441px'}
          }>
          ffffffffffff
        </div>
        <div className="container5" style={
          {
          backgroundColor: 'green',
          cursor: 'pointer',
          border: '1px solid green',
          color: 'white',
          width: '441px'}
          }>
            Go to checkout
        </div>
      </div>
      )
  }
}

export default App;