var React = require('react');
var Helmet = require('react-helmet');
module.exports = React.createClass({
  getInitialState: function(){
    return null;
  },
  componentDidMount: function(){
  },
  render: function(){
    return(
      <div>
        <Helmet
          title="About"
        />
        <p>About</p>
      </div>
    );
  }
});
