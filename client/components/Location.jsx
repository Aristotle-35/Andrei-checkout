import React from 'react';
import locLogo from '../../public/icon-location.png';
import planeLogo from '../../public/plane.png';
import Form from './Form.jsx';

class Location extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      listOpen: false,
      headerTitle: 'Select a pick up location'
    }
    this.toggleList = this.toggleList.bind(this);
    this.grabDeliveryAddress = this.grabDeliveryAddress.bind(this);
  }

  handleClickOutside () {
    this.setState({
      listOpen: false
    })
  }

  toggleList () {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  grabItem (item) {
    // console.log(item.target.innerHTML);
    this.setState({
      headerTitle: item.target.innerHTML
    });
    this.toggleList();
  }

  grabDeliveryAddress(address) {
    this.setState({
      headerTitle: address,
    });
    this.toggleList();
  }

  render(){
    const{ listOpen, headerTitle } = this.state
    return(
      <div className="dd-wrapper" >
        <div className= "Header" onClick={this.toggleList}>
          <div className="dd-header-title">{headerTitle}</div>
        </div>
        {listOpen && 
        <div>
          <div id="Line">f</div>
            <div>
              CAR LOCATION
            </div>
            <div className= "Container4">
              <img id="Logo" src={locLogo} alt="locLogo"></img>
              <span onClick={(e) => this.grabItem(e)}>{this.props.location.carLocation}</span>
              <div>Free</div>
            </div>
            <div>
              We’ll send you the exact address once your trip is booked.
            </div>
            <div id="Line">f</div>
            <div>
              AIRPORT
            </div>
            <div className= "Container5">
              <img id="Logo" src={planeLogo} alt="locLogo"></img>
              <span onClick={(e) => this.grabItem(e)}>{this.props.location.airport}</span>
              <div>{this.props.priceAir}</div>
            </div>
            <div id="Line">f</div>
              <div>
              DELIVERY
            </div>
            <div className= "Container5">
              <Form grab={this.grabDeliveryAddress}/>
            </div>
            <div id="Line">f</div>
        </div>
        }
      </div>
    )
  }
}
  
export default Location;