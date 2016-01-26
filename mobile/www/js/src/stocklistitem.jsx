import React, { PropTypes } from 'react';
import {Link } from 'react-router';
import Button from './button.jsx';

class StockListItem extends React.Component {
  render() {
    var change = 'icon ion-arrow-graph-up-right balanced';
    var sign = "balanced";
    var btn = "button button-balanced";
    var stock = this.props.stock;
    var perc = ((stock.marketValue > stock.purchaseBasis) ?
      ((stock.purchaseBasis / stock.marketValue) * 100).toFixed(2)  : ((stock.marketValue / stock.purchaseBasis) * 100 ).toFixed(2));
    if(stock.gainLoss === 'loss'){
      change = 'icon ion-arrow-graph-down-right assertive';
      sign = 'assertive';
      btn = 'button button-assertive';
    }
    //console.log("rendering StockList item for : ", stock);
    return (
      <li className="table-view-cell media item" key={stock.symbol}>

        <Link to={`/stock/${stock.symbol}`} className={""} >
          <div className="row">

              <span className="col col-40"><h2>{stock.symbol}</h2>
                <span className="sign">{stock.numGainLoss.toFixed(2)}</span>
              </span>
              <span className={"col col-30"}><i className={change}></i></span>
              <span className="col col-30"><Button btnTitle={"$"+stock.currentPrice.toFixed(2)} btnClass={btn}/></span>



          </div>
        </Link>

      </li>
    );
  }
}

export default StockListItem
