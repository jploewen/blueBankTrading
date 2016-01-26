import React, { PropTypes } from 'react'
import Header from './header.jsx'
import StockList from './stocklist.jsx';

class HomePage extends React.Component {
  render() {
    return (
      <div className={"page"}>
        <Header text="My Stock Trading"/>
        <div className="card">
          <StockList />
        </div>
      </div>
    );
  }
}

export default HomePage
