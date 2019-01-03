import React from 'react';
import style from 'styled-components';
import locLogo from '../../public/icon-location.png';
import planeLogo from '../../public/plane.png';
import Form from './Form.jsx';

const Logo = style.img`
  width: 30px;
  height: 30px;
`;
const Line = style.div`
  color: white;
  height: 10px;
`;
const Container1 = style(Line)`
  background-color: #00b300;
  &:hover {
    background-color: green;
  };
  height: 70px;
`;
const Container2 = style.div`
  border: 1.5px solid black;
  &:hover {
    border: 1.5px solid green;
  };
  height: 70px;
`;

const Header = style.div`
  text-align: center;
  vertical-align: middle;
  line-height: 40px;
`;

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
            <Header onClick={this.toggleList}>
                <div className="dd-header-title">{headerTitle}</div>
            </Header>
            {listOpen && 
            <div>
              <Line>f</Line>
                <div>
                  CAR LOCATION
                </div>
                <Container1>
                    <Logo src={locLogo} alt="locLogo">
                    </Logo>
                    <span onClick={(e) => this.grabItem(e)}>{this.props.location.carLocation}</span>
                    <div>Free</div>
                </Container1>
                <div>
                  We’ll send you the exact address once your trip is booked.
                </div>
                <Line>f</Line>
                <div>
                  AIRPORT
                </div>
                <Container2>
                    <Logo src={planeLogo} alt="planeLogo">
                    </Logo><span onClick={(e) => this.grabItem(e)}>{this.props.location.airport}</span>
                    <div>$70</div>
                    {/* <div>{this.props.priceAir}</div> */}
                </Container2>
                <Line>f</Line>
                 <div>
                  DELIVERY
                </div>
                <Container2>
                  <Form grab={this.grabDeliveryAddress}/>
                </Container2>
                <Line>f</Line>
            </div>
                }
          </div>
        )
      }
  }
  
  export default Location;