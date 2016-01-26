import HomePage from './homepage.jsx';
import BuyPage from './buypage.jsx';
import StockPage from './stockpage.jsx';
import StockStore from './stockstore.jsx';
import StockListItem from './stocklistitem.jsx';
import Header from './header.jsx';
import Purchased from './purchased.jsx';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import Router from 'react-router';
import React from 'react'
import {  Route, Link, RouteHandler, DefaultRoute } from 'react-router'

class App extends React.Component {
  constructor(props){
    console.log("App ctor");

    super(props);

  }
  componentWillMount() {
    console.log("componentWillMount App");


  }
  componentDidMount() {
    console.log("componentDidMount App");

  }
  componentWillUnmount() {
    console.log("componentWillUnmount App");
  }

  render(){

    return (
      <div >

          <TransitionGroup component="div" transitionName="example" transitionAppear={true} transitionAppearTimeout={500}>
            <RouteHandler key={name}/>
          </TransitionGroup>

      </div>
    )
  }
}

var Index = React.createClass({
  render: function () {
    return <h1>Stocks</h1>;
  }
});


let routes = (

    <Route handler={App}>
      <DefaultRoute name="home" handler={HomePage} />
      <Route name="stock" path="stock/:id?" handler={StockPage}/>
      <Route name="buy" path="buy/:id?" handler={BuyPage}/>
      <Route name="purchased" path="purchased" handler={Purchased}/>
    </Route>
   );

Router.run(routes, function(Handler){
React.render(<Handler/>
  , document.getElementById("mycontent"));
});
