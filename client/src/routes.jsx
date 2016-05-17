var React = require('react')
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Home = require('./components/home');
var Trades = require('./components/trades');
var TradeDetail = require('./components/trade-detail');
var BuyTrade = require('./components/buy-trade');

module.exports = (
  <Router>
    <Route path="/" component={Home} />
    <Route path="/trades" component={Trades}>
      <Route path="/trades/:id" component={TradeDetail}/>
    </Route>
    <Route path="/trades/:id/buy" component={BuyTrade} />
  </Router>
)
