import React, { PropTypes } from 'react';
import Button from './button.jsx';
import Header from './header.jsx';
import StockStore from './stockstore.jsx';


class BuyPage extends React.Component {

componentDidMount() {
  console.log('componentDidMount StockPage');
  StockStore.addChangeListener(this.updateStock.bind(this));
}
constructor(props, context){
  console.log('BuyPage ctor');
  super(props, context);
  console.log("Conext: ", context);
  this.state = this.getStateFromStore(props);
}

componentWillUnmount() {
  StockStore.removeChangeListener(this.updateStock);
}
componentWillReceiveProps(nextProps) {
  this.setState(this.getStateFromStore(nextProps));
}
updateStock(){
  console.log('updateStock BuyPage');
  this.setState(this.getStateFromStore());
}


  getStateFromStore(props){
    console.log("getStateFromStore BuyPage");
    const { id } = props ? props.params : this.props.params
    return {
      stock: StockStore.getStock(id)
    };
  }

  buyTrade(event){
    var amount = document.getElementById("amount").value;
    console.log("About to buy trade");
    var json = {
      amount: amount,
      symbol: this.state.stock.symbol
    }
    StockStore.buyStock(json, function(res){
      if(res && res.result === 0){
        console.log("purchase was a success");
        this.context.router.transitionTo('/purchased', {result: 0});
      }
      else {
        console.log("purchase didn't go through: ", res);
        this.context.router.transitionTo('/purchased', {result: 1});
      }
    }.bind(this))
  }

  render() {
    return (
      <div className={"page " +this.props.position}>
        <Header text="Purchasing" back="true" />
        <div className={"card"}>
          <div className={"list"}>
            <div className={"item"}>
            <h2>{this.state.stock.company}</h2>
            <p>{this.state.stock.currentPrice}</p>
            </div>
            <label className={"item item-input"}>
              <input type={"number"} id={"amount"}  placeholder={"Enter Amount Here"} name={"amount"} min={"1"} max={"10000"} step={"1"}/>
            </label>
            <div className={"item item-button"}>
              <Button btnClass={"button button-balanced"} btnTitle={"Purchase"} handleClick={this.buyTrade.bind(this)}></Button>
            </div>
          </div>

        </div>

      </div>
    );
  }
}
BuyPage.contextTypes = {
  router: React.PropTypes.func.isRequired
};
export default BuyPage
