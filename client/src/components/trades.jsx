var React = require('react');
var Header = require('./header');
var Reflux = require('reflux');
var Actions = require('./actions');
var TradeStore = require('./stores/trade-store');
var Trade = require('./trade');
var PropTypes = React.PropTypes;

var trades = React.createClass({
  mixins: [Reflux.listenTo(TradeStore, 'onTradesChange')],
  getInitialState: function() {
    return {
      trades:[]
    };
  },
  render: function() {
    return (
      <div className="container-fluid">
        <Header/>
        {this.showContents()}
      </div>
    );
  },
  componentWillMount: function() {
    Actions.getTrades();
  },
  showContents: function(){
    if(this.props.children){
      return this.props.children;
    }
    else{
      var trades = this.state.trades.map(function(trade){
        return (
          <Trade data={trade} />
        )
      })
      return(
        <div className="trades">
          {trades}
        </div>
      )
    }
    
  },
  onTradesChange: function(event, trades){
    console.log("onTradesChange: trades ", trades);
    this.setState({trades: trades})
  }

});

module.exports = trades;
