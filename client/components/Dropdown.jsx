import React from 'react';

class Dropdown extends React.Component {
    constructor (props) {
      super (props);
      this.state = {
        listOpen: false,
        headerTitle: this.props.title
      }
    }
  
    render () {
      return (
        <tbody>
            <tr>
                <td>
                    Dropdown 
                </td>
            </tr>
            
        </tbody>
        )
    }
  }
  
  export default Dropdown;