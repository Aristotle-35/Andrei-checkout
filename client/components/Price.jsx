import React from 'react';

class Price extends React.Component {
  constructor (props) {
    super (props); 
  }

  render () {
    return (
      <div className="reservationBoxVehiclePrice">
        <div className="styledCurrency reservationBoxVehiclePrice-amount">
          <div className="styledCurrency_currency">
            $
          </div>
          <div className="styledCurrency_value styledCurrency_value__large">
            {this.props.price}
            <span className="reservationBoxVehiclePrice_unit">
              per day
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default Price;