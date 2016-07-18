var React = require('react');
var PropTypes = React.PropTypes;
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var header = React.createClass({

  render: function() {

    return (
      <nav className="header navbar navbar-default">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand"><span className="glyphicon glyphicon-piggy-bank"></span></Link>
        </div>
        <ul className="nav navbar-nav">
          <li className='item' onClick={this.handleLinkClick}>
            <Link to="trades/">Investments</Link>
          </li>
          <li className="item">
            <a href="http://bbtrading.mybluemix.net/images/mine.html">See Portfolios</a>
          </li>
        </ul>
        <ul className="nav navbar-nav pull-right">
          <li className="item">
            <Link to="/">Blue Bank Trading</Link>
          </li>
          <li className="item">
              <div id="nav-icon" onClick={this.handleClick}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </li>
        </ul>


      </nav>
    );
  },
  handleClick: function(event){
    event.target.classList.toggle('open');
    event.stopPropagation();
    event.preventDefault();
  },
  handleLinkClick: function(event){
    event.target.classList.toggle('active');
    event.stopPropagation();
    event.preventDefault();
  }

});

module.exports = header;
