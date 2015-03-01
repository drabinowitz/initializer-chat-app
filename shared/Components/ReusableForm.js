var React = require('react');

var ReusableForm = React.createClass({
  propTypes: {
    showForm: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    //accept a defaultValue and or placeholder for the input
    defaultValue: React.PropTypes.string,
    placeholder: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      showForm: true,
      defaultValue: ''
    };
  },

  onSubmit: function (e) {
    e.preventDefault();
    e.stopPropagation();
    //on form submission call passed in handleSubmit method with input value
    this.props.handleSubmit(this.refs.formInput.getDOMNode().value);
  },

  render: function () {
    if (this.props.showForm) {
      var form = (
        <form onSubmit={this.onSubmit}>
          <input ref='formInput' placeholder={this.props.placeholder} defaultValue={this.props.defaultValue} />
        </form>
      );
    }

    return (
      <div>
        {form}
      </div>
    );
  }
});

module.exports = ReusableForm;
