import React from 'react';


class Header extends React.Component {
  render() {
    return (
      <div className="bar bar-header bar-light">
        <a href="#" className={"button icon-left ion-chevron-left button-clear button-dark" + (this.props.back === "true"? "": " hidden" )}></a>
        <h1 className="title">{this.props.text}</h1>
      </div>
    );
  }
}

export default Header
