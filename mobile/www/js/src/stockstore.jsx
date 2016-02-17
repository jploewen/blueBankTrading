var tradeURL = "http://my-trading.stage1.mybluemix.net/api/v1/trades";//"http://192.168.59.103:8080/api/v1/trades";
var _trades = {};
var tmpTrades = {};
var _initCalled = false;
var _changeListeners = [];

var StockStore = module.exports = {
  init: function(){
    //console.log("INIT called");
    if(_initCalled){
      return;
    }
    _initCalled = true;
    console.log("init called");
    getJSON(tradeURL, function(err, res){
      console.log("Get JSON res: ", res);
      res.trades.forEach(function(trade){
        _trades[trade.symbol] = trade;
      })
      StockStore.notifyChange();

    });


  },
  notifyChange: function () {
    _changeListeners.forEach(function (listener) {
      listener();
    });
  },

  addChangeListener: function (listener) {
    _changeListeners.push(listener);
  },

  removeChangeListener: function (listener) {
    _changeListeners = _changeListeners.filter(function (l) {
      return listener !== l;
    });
  },
  buyStock: function (stock, cb) {
    postJSON(tradeURL + "/buy", { amount: stock.amount, symbol: stock.symbol }, function (res) {
      console.log("What's my res: ", res);
      StockStore.notifyChange();
      if (cb) cb(res);
    });
  },

  removeStock: function (id, cb) {
    deleteJSON(API + '/' + id, cb);
    delete _trades[id];
    StockStore.notifyChange();
  },

  getStocks: function () {
    var array = [];
    //console.log("getStocks: ", _trades);
    for (var id in _trades){
      array.push(_trades[id]);

    }
    console.log("Returning stocks: ", array);
    return array;
  },

  getStock: function (id) {
    return _trades[id];
  }


}


function getJSON(url, cb) {
  var req = new XMLHttpRequest();
  req.onload = function () {
    if (req.status === 404) {
      cb(new Error('not found'));
    } else {
      cb(null, JSON.parse(req.response));
    }
  };
  req.open('GET', url);
  req.send();
}

function postJSON(url, obj, cb) {
  var req = new XMLHttpRequest();
  req.onload = function () {
    cb(JSON.parse(req.response));
  };
  req.open('POST', url);
  req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  req.send(JSON.stringify(obj));
}

function deleteJSON(url, cb) {
  var req = new XMLHttpRequest();
  req.onload = cb;
  req.open('DELETE', url);
  req.send();
}
