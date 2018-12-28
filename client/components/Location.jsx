import React from 'react';
import FontAwesome from 'react-fontawesome';
import locLogo from '../../public/icon-location.png';
import planeLogo from '../../public/plane.png';

class Location extends React.Component {
    constructor (props) {
      super (props);
      this.state = {
        listOpen: false,
        headerTitle: 'Select a pick up location'
      }
      this.toggleList = this.toggleList.bind(this)
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
        console.log(item.target.innerHTML);
        this.setState({
            headerTitle: item.target.innerHTML
        });
        this.toggleList();
      }

      render(){
        const{time} = this.props
        const{listOpen, headerTitle} = this.state
        return(
          <div className="dd-wrapper" >
            <div className="dd-header" onClick={this.toggleList}>
                <div className="dd-header-title">{headerTitle}</div>
                {listOpen
                    ? <FontAwesome name="angle-up" size="2x"/>
                    : <FontAwesome name="angle-down" size="2x"/>
                }
            </div>
            {listOpen && 
            <div>
                <div>
                  CAR LOCATION
                </div>
                <div style={{backgroundColor: 'green', color: 'white'}}>
                    <img src={locLogo} alt="locLogo" style={{width: 40, height: 40}}>
                    </img><span onClick={(e) => this.grabItem(e)}>{this.props.location.carLocation}</span>
                    <div>Free</div>
                </div>
                <div>
                  We’ll send you the exact address once your trip is booked.
                </div>
                <div>
                  AIRPORT
                </div>
                <div style={{border: '1px solid black'}}>
                    <img src={planeLogo} alt="planeLogo" style={{width: 40, height: 40}}>
                    </img><span onClick={(e) => this.grabItem(e)}>{this.props.location.airport}</span>
                    <div>$70</div>
                </div>
                {/* <div>
                  DELIVERY
                </div> */}
            </div>
                }
          </div>
        )
      }
  }
  
  export default Location;