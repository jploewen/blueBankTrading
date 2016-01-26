import React, { PropTypes } from 'react';
import StockListItem from './stocklistitem.jsx';
import StockStore from './stockstore.jsx';

class StockList extends React.Component {
  constructor(props){
    console.log("StockList ctor");

    super(props);
    //console.log("props: ", props);
    this.state = {
      stocks: StockStore.getStocks(),
      loading: true
    }
  }
  updateStocks(){

    console.log("updateStocks from StockList");

    this.setState({
      stocks: StockStore.getStocks(),
      loading: false
    })
  }
  componentWillMount() {
    console.log("componentWillMount StockList");
    StockStore.init();

  }
  componentDidMount() {
    console.log("componentDidMount StockList");
    StockStore.addChangeListener(this.updateStocks.bind(this));
  }
  componentWillUnmount() {
    console.log("componentWillUnmount StockList");
    StockStore.removeChangeListener(this.updateStocks);
  }

  getStockList(myList){
    var list = myList.map(function(fun){
      var change = 'icon ion-arrow-graph-up-right';
      var sign = "balanced"
      if(fun.change === 'down'){
        change = 'icon ion-arrow-graph-down-right';
        sign = 'assertive';
      }
      return (
          <StockListItem stock={this.state.stock} />
      )
    }.bind(this));
    return list;

  }

  render() {
    var stocks = this.state.stocks.map(function(stock){
      return (

          <StockListItem stock={stock}/>

      )
    }.bind(this))
    return (
      <ul className="table-view">
        {stocks}
      </ul>
    );
  }
}

export default StockList
