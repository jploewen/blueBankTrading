import React from 'react';
import StockList from './stocklist.jsx';
import Header from './header.jsx';
import Button from './button.jsx';
import StockStore from './stockstore.jsx';
import {Link} from 'react-router';

class StockPage extends React.Component {

  getStateFromStore(props){
    console.log("getStateFromStore");
    const { id } = props ? props.params : this.props.params
    return {
      stock: StockStore.getStock(id)
    };
  }


  componentDidMount() {
    console.log('componentDidMount StockPage');
    StockStore.addChangeListener(this.updateStock);
  }
  constructor(props){
    console.log('StockPage ctor');
    super(props);
    this.state = this.getStateFromStore(props);

  }

  componentWillUnmount() {
    StockStore.removeChangeListener(this.updateStock);
  }
  componentWillReceiveProps(nextProps) {
    this.setState(this.getStateFromStore(props));
  }
  updateStock(){
    console.log('updateStock');
    this.setState(this.getStateFromStore());
  }
  destroy(){
    const { id } = this.props.params;
    //this.context.router.push('/')
  }
  render() {
    console.log('render StockPage, stock: ', this.state);
    var styles = {'paddingLeft': '50px'}
    var hiLow = this.state.stock.low + " - " + this.state.stock.high;
    return (
      <div className={"page"}>
        <Header text="Stock Details" back="true" />
        <div className="card">
          <ul className="table-view">
            <li className="table-view-cell media">
              <div className="media-body">
                <h1>{this.state.stock.company}</h1>
                  <p>{this.state.stock.symbol}</p>

                </div>
            </li>
            <li className="table-view-cell media">
              <div className="media-body">
                <h1>{"Market Value"} </h1>
                <p>{this.state.stock.currentPrice}</p>
                </div>
            </li>
            <li className="table-view-cell media">
              <div className="media-body">
                <h1>{"Price Range"} </h1>
                <p>{hiLow}</p>

                </div>
            </li>
          <li className="table-view-cell media">

          <Link to={`/buy/${this.state.stock.symbol}`}><Button btnTitle="Buy" btnClass="button button-full button-balanced " /></Link>
          <span style={styles}></span>

          </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default StockPage
