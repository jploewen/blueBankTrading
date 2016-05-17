var React = require('react');
var PropTypes = React.PropTypes;
var Header = require('./header');

var Home = React.createClass({

  render: function() {
    return (
      <div className="container-fluid">
        <Header />
        {this.showContents()}
      </div>
    );
  },
  showContents: function(){
    return(
      <div className="imgContent">
        <img src="images/money.png" height="400px"/>
      </div>
    )
  }

});

module.exports = Home;
