var React = require('react');
var PropTypes = React.PropTypes;
var rd3 = require('react-d3');
var AreaChart = rd3.AreaChart;
var Link = require('react-router').Link;

var trade = React.createClass({

  render: function() {
    var currPrice = this.props.data.currentPrice;
    var price = currPrice.toFixed(2);

    var data = [
    {
    label: ['jan','feb','mar', 'apr','may','jun','jul','aug','sep','oct','nov','dec' ],
    values: [{x: 0, y: 2}, {x: 1.3, y: 5}, {x: 3, y: 6}, {x: 3.5, y: 6.5}, {x: 4, y: 6}, {x: 4.5, y: 6}, {x: 5, y: 7}, {x: 5.5, y: 8}]
    }
];

    return (
      <div className="panel panel-warning" style={{display: 'inline-block', marginRight:'10px'}}>
        <div className="panel-heading">{this.props.data.company}</div>
        <div className="panel-body">
          <Link to={"/trades/"+this.props.data.symbol +"-"+ this.props.data.volume}>
            <div className="pull-left">
              <h2 className="panel-title">{"$"+price}</h2>
              <span>
                {this.props.data.symbol}
              </span>
              <br/>
              <span>
                {this.props.data.volume}
              </span>
              <span>

              </span>
            </div>
            <div className="pull-left">
              <AreaChart data={data}
                width="400"
                height="200"
                margin={{top:10, botton:50,left:50,right:10}}
                />
            </div>
          </Link>
        </div>
      </div>
    );
  }

});
var myDataSource = {
    "chart": {
        "caption": "Actual Revenues, Targeted Revenues & Profits",
        "subcaption": "Last year",
        "xaxisname": "Month",
        "yaxisname": "Amount (In USD)",
        "numberprefix": "$",
    },
    "categories": [
        {
            "category": [
                {
                    "label": "Jan"
                },
                {
                    "label": "Feb"
                },
                {
                    "label": "Mar"
                },
                {
                    "label": "Apr"
                },
                {
                    "label": "May"
                },
                {
                    "label": "Jun"
                },
                {
                    "label": "Jul"
                },
                {
                    "label": "Aug"
                },
                {
                    "label": "Sep"
                },
                {
                    "label": "Oct"
                },
                {
                    "label": "Nov"
                },
                {
                    "label": "Dec"
                }
            ]
        }
    ],
    "dataset": [
        {
            "seriesname": "Actual Revenue",
            "data": [
                {
                    "value": "16000"
                },
                {
                    "value": "20000"
                },
                {
                    "value": "18000"
                },
                {
                    "value": "19000"
                },
                {
                    "value": "15000"
                },
                {
                    "value": "21000"
                },
                {
                    "value": "16000"
                },
                {
                    "value": "20000"
                },
                {
                    "value": "17000"
                },
                {
                    "value": "25000"
                },
                {
                    "value": "19000"
                },
                {
                    "value": "23000"
                }
            ]
        },
        {
            "seriesname": "Projected Revenue",
            "renderas": "line",
            "showvalues": "0",
            "data": [
                {
                    "value": "15000"
                },
                {
                    "value": "16000"
                },
                {
                    "value": "17000"
                },
                {
                    "value": "18000"
                },
                {
                    "value": "19000"
                },
                {
                    "value": "19000"
                },
                {
                    "value": "19000"
                },
                {
                    "value": "19000"
                },
                {
                    "value": "20000"
                },
                {
                    "value": "21000"
                },
                {
                    "value": "22000"
                },
                {
                    "value": "23000"
                }
            ]
        },
        {
            "seriesname": "Profit",
            "renderas": "area",
            "showvalues": "0",
            "data": [
                {
                    "value": "4000"
                },
                {
                    "value": "5000"
                },
                {
                    "value": "3000"
                },
                {
                    "value": "4000"
                },
                {
                    "value": "1000"
                },
                {
                    "value": "7000"
                },
                {
                    "value": "1000"
                },
                {
                    "value": "4000"
                },
                {
                    "value": "1000"
                },
                {
                    "value": "8000"
                },
                {
                    "value": "2000"
                },
                {
                    "value": "7000"
                }
            ]
        }
    ]
};
module.exports = trade;
