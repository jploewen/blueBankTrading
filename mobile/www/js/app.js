var Header = React.createClass({

  render: function() {
    return (
      <div className="bar bar-header bar-light">
        <h1 className="title">{this.props.text}</h1>
      </div>
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
        <a className='item item-icon-left' href='#' onClick={this.props.clicked.bind(this, fun)}>
          <i className={change}></i>
          <span>{fun.name}</span>
          <span>{fun.price}</span>
          <span className={sign}>{fun.perc + "%"}</span>
        </a>
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
      <div className="list">
        {stockList}
      </div>
    );
  }

});


var HomePage = React.createClass({
  
  render: function() {
    return (
      <div>
        <Header text="My Stock Trading"/>
        <StockList clicked={this.props.clickHandler} />
      </div>
    );
  }
})

var Button = React.createClass({
  render: function() {
    return (
      <div>
        <button className={this.props.btnClass}>{this.props.btnTitle}</button>
      </div>
    );
  }
})

var StockPage = React.createClass({
  getInitialState: function() {
        return {stockID: {}};
    },
    componentDidMount: function() {

            this.setState({stockID: this.props.stockID});

    },
  render: function() {
    return (
      <div>
        <Header text="Stock Details" />
        <div>{this.props.stockID}</div>
        <Button btnTitle="Buy" btnClass="button button-stable" />
        <Button btnTitle="Sell" btnClass="button button-dark" />
      </div>
    );
  }
})
var App = React.createClass({
    mixins: [PageSlider],
    getInitialState: function() {
        return {
            selectedStock: ''
        }
    },
    openNewPage: function(fun){
      this.setState({
        pages: [<HomePage clickHandler={this.openNewPage}/>],
        selectedStock: fun.name
      });
      console.log("hey there.. you clicked me");
      console.log("fun is: ", fun);
      this.slidePage(<StockPage  stockID={fun.name} />)
      console.log("You just set state to : ", this.state);
    },
    componentDidMount: function() {
        router.addRoute('', function() {
            this.slidePage(<HomePage  clickHandler={this.openNewPage}/>);
        }.bind(this));
        router.addRoute('stocks/:id', function(id) {
            this.slidePage(<StockPage  stockID={id} />);
        }.bind(this));
        router.start();
      }
    });

React.render(
    <App />,
    document.body
);
