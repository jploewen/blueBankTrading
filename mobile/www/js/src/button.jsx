import React, { PropTypes } from 'react'

class Button extends React.Component {
  clickHandler(event){
    
    console.log("Sending click");
		if(this.props.handleClick)
      setTimeout(this.props.handleClick(), 1);
  }
  render() {
    return (

        <button className={this.props.btnClass} onClick={this.clickHandler.bind(this)}>{this.props.btnTitle} </button>

    );
  }
}

export default Button
