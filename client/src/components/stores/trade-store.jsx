var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');

module.exports = Reflux.createStore({
  listenables: [Actions],
  getTrades: function(){
    return Api.get('')
    .then(function(trades){
      console.log("trade-store ", trades);
      this.trades = trades.trades;
      this.triggerChange();
    }.bind(this));
  },
  triggerChange: function(){
    this.trigger('change', this.trades);
  },
  find: function(id){
    var trade = {"volume":1624460,"symbol":"RCI","high":53.754351539615506,"low":46.9348910581031,"percGainLoss":87.31365873423913,"gainLoss":"loss","openPrice":53.754351539615506,"currentPrice":46.9348910581031,"company":"Random Corp. Inc","numGainLoss":6.819460481512408};
    return trade;

  }
});
