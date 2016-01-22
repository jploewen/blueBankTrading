var Header = React.createClass({

  render: function() {
    return (
      <div className="bar bar-header bar-light">
        <a href="#" className={"button icon-left ion-chevron-left button-clear button-dark" + (this.props.back === "true"? "": " hidden" )}></a>
        <h1 className="title">{this.props.text}</h1>
      </div>
    );
  }

});

var StockListItem = React.createClass({
  getInitialState: function() {
    return {
      searchKey:""
    };
  },
  clickHandler: function(event){

    console.log("searchKey: ", this.props.stockName);
    this.setState({
      searchKey: this.props.stockName
    });
      this.props.clickHandler(this.props.stockName);


  },
  render: function() {
    return (
      <li className="table-view-cell media">
        <a className='item item-icon-left' onClick={this.clickHandler}  >
        <div className="row">
            <i className={"col col-20 " +this.props.stockChange}></i>
            <span className="col col-20">{this.props.stockName}</span>
            <span className="col col-20">{this.props.stockPrice}</span>
            <span className={ "col col-20 " +this.props.stockSign}>{this.props.stockPerc + "%"}</span>
            <span className="col col-20"><i className="ion-chevron-right"></i></span>
        </div>

        </a>
      </li>
    );
  }
});


var StockList = React.createClass({

  getStockList: function(myList){
    var list = myList.map(function(fun){
      var change = 'icon ion-arrow-graph-up-right';
      var sign = "balanced"
      if(fun.change === 'down'){
        change = 'icon ion-arrow-graph-down-right';
        sign = 'assertive';
      }
      return (
          <StockListItem clickHandler={this.props.clicked} stockName={fun.name} stockPrice={fun.price} stockChange={change} stockSign={sign}
            stockPerc={fun.perc} />
      )
    }.bind(this));
    return list;

  },
  render: function() {
    var stockList = this.getStockList([{name:'GOOG', price: 733.89, perc: 2.8, change: 'up'},
  {name:'IBM', price: 900.19, perc: 200, change: 'up'},
  {name:'AMAZ', price: 23.11, perc: 2.8, change: 'down'},
  {name:'KIND', price: 100.21, perc: 4.2, change: 'down'},
  {name:'REWI', price: 98.20, perc: 1.1, change: 'up'},
  {name:'AFIC', price: 20.20, perc: 5.1, change: 'up'}]);
    return (
      <ul className="table-view">
        {stockList}
      </ul>
    );
  }

});


var HomePage = React.createClass({

  render: function() {
    return (
      <div className={"page " + this.props.position}>
        <Header text="My Stock Trading"/>
        <div className="content">
          <StockList clicked={this.props.clickHandler} />
        </div>
      </div>
    );
  }
})

var Button = React.createClass({
  render: function() {
    return (

        <button className={this.props.btnClass}>{this.props.btnTitle}</button>

    );
  }
})

var StockPage = React.createClass({
  getInitialState: function() {
        return {stock: {}}
    },
    componentDidMount: function() {
      console.log("props: ", this.props);
      this.props.service.findByName(this.props.stockID).done(function(result){
        this.setState({stock: result});
        console.log("state: ", this.state);
      }.bind(this));

    },
    componentDidUpdate: function(prevProps, prevState) {
      if(prevProps !== prevState.result)
    },
  render: function() {
    return (
      <div className={"page " + this.props.position}>
        <Header text="Stock Details" back="true" />
        <div className="card">
          <ul className="table-view">
            <li className="table-view-cell media">
              <div className="media-body">
                <h1>{this.state.stock.name} </h1>

                </div>
            </li>
            <li className="table-view-cell media">
              <div className="media-body">
                <h1>{this.state.stock.price} </h1>

                </div>
            </li>
          <Button btnTitle="Buy" btnClass="button button-stable " />
          <Button btnTitle="Sell" btnClass="button button-dark " />
          </ul>
        </div>
      </div>
    );
  }
})
var App = React.createClass({
    mixins: [PageSlider],
    getInitialState: function() {
        return {
            stocks: [],
            searchKey: ''
        }
    },
    openNewPage: function(key){
      console.log("KEY: ", key);
      console.log("initial state: ", this.state);
      this.setState({
        pages: [<HomePage clickHandler={this.openNewPage}/>]
      });

      this.slidePage(<StockPage  stockID={key} service={stockData}/>)
      console.log("You just set state to : ", this.state);
    },
    componentDidMount: function() {
        router.addRoute('', function() {
            this.slidePage(<HomePage  clickHandler={this.openNewPage}/>);
        }.bind(this));
        router.addRoute('stocks/:id', function(id) {
            this.slidePage(<StockPage  stockID={id} service={stockData}/>);
        }.bind(this));
        router.start();
      }
    });

React.render(
    <App />,
    document.body
);
