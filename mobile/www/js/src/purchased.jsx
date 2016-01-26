import React from 'react';;
import { Link } from 'react-router';
import Button from './button.jsx';
import Header from './header.jsx';

class Purchased extends React.Component{
  render () {
    console.log("Purchased: ", this.props);
    return (
      <div className="page">
        <Header text="Purchase Complete"/>
        <div className="card">
          <h3>{"Thank you for your purchase"}</h3>
          <Link to="home"><Button btnTitle={"Home"} btnClass={"button button-positive"}/></Link>
        </div>

      </div>

    )
  }
}

export default Purchased
