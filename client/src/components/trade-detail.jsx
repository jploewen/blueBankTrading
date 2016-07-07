var React = require('react');
var PropTypes = React.PropTypes;
var rd3 = require('react-d3');
var AreaChart = rd3.AreaChart;
var Actions = require('./actions');
var TradeStore = require('./stores/trade-store');
var Reflux = require('reflux');
var _ = require('lodash');
var api = require('./utils/api');
var Modal = require('react-modal');

var TradeDetail = React.createClass({
  mixins:[Reflux.listenTo(TradeStore, 'onChange')],
  getInitialState: function() {
    return {
      trade:null,
      modalIsOpen: false
    };
  },
  componentWillMount: function() {
    console.log("cwm trade-detail ", this.props.params);
    Actions.getTrades();
  },
  render: function() {
    var trade = {"volume":1624460,"symbol":"RCI","high":53.754351539615506,"low":46.9348910581031,"percGainLoss":87.31365873423913,"gainLoss":"loss","openPrice":53.754351539615506,"currentPrice":46.9348910581031,"company":"Random Corp. Inc","numGainLoss":6.819460481512408}
    var data = [
    {
    label: ['jan','feb','mar', 'apr','may','jun','jul','aug','sep','oct','nov','dec' ],
    values: [{x: 0, y: 2}, {x: 1.3, y: 5}, {x: 3, y: 6}, {x: 3.5, y: 6.5}, {x: 4, y: 6}, {x: 4.5, y: 6}, {x: 5, y: 7}, {x: 5.5, y: 8}]
  }];
    var title = trade.company;
    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
        <h1 className="panel-title">
          {title}
        </h1>
        </div>
        <div className="panel-body">
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles} >

            <h2 ref="subtitle">Transaction Complete</h2>
            <button onClick={this.closeModal}>close</button>
          </Modal>
          <AreaChart data={data}
            width="400"
            height="200"
            margin={{top:10, botton:50,left:50,right:10}}
            />
          <h3>Price</h3>
          <div>{"$" +trade.currentPrice.toFixed(2)}</div>
          <div className="btn-group">
            <button type="button" className="btn btn-info" onClick={this.handleBuyClick}>Buy</button>
            <button type="button" className="btn btn-warning" onClick={this.handleBuyClick}>Sell</button>
          </div>
        </div>

      </div>
    );
  },
  onChange: function(event, trade){
    console.log("onChange trade: ", trade);
    this.setState({trade: TradeStore.find(this.props.params.id)});
  },
  handleBuyClick:function(event){
    api.buy({"amount": "4", "symbol": "s:0"});
    this.openModal();
  },
  openModal:function(){
    this.setState({modalIsOpen: !this.state.modalIsOpen});

  },afterOpenModal: function() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

});

module.exports = TradeDetail;
