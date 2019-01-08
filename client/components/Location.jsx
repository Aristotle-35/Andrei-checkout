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
        <div className="Location">
          <div id="Line">f</div>
            <div className="Location reservationBox_title">
              CAR LOCATION
            </div>
            <div className= "Location Container4">
              <img id="Logo" src="http://localhost:3002/bfac8a9e7aa2ee22b89947e91499b6e2.png" alt="locLogo"></img>
              <span onClick={(e) => this.grabItem(e)}>{this.props.location.carLocation}</span>
              <div>Free</div>
            </div>
            <div className="Location reservationBoxLocationOptionGroup_subtitle">
              We’ll send you the exact address once your trip is booked.
            </div>
            <div id="Line">f</div>
            <div className="Location reservationBox_title">
              AIRPORT
            </div>
            <div className= "Location Container5">
              <img id="Logo" src="http://localhost:3002/ad01f8f012c1ffd91c0757a9c58181a4.png" alt="locLogo"></img>
              <span onClick={(e) => this.grabItem(e)}>{this.props.location.airport}</span>
              <div>${this.props.priceAir}</div>
            </div>
            <div id="Line">f</div>
              <div className="Location reservationBox_title">
              DELIVERY
            </div>
            <div className= "Location Container5">
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