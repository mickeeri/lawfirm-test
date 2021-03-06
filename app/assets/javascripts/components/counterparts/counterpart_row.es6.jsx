class CounterPartRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    e.preventDefault();
    ReactDOM.render(
      <EditFormModal
        form={<CounterPartForm
          clientId={this.props.clientId ? this.props.clientId : ''}
          initialCounterpart={this.props.counterpart}
        />}
        header="Motpart"
      />,
    document.getElementById('editModalContainer')
    );
    $('#editFormModal').modal();
  }

  render() {
    const counterpart = this.props.counterpart;
    return (
      <div>
        <hr />
        <a
          onClick={this.handleOnClick}
          href="#"
        >{counterpart.name}
        </a><span> ({counterpart.personalNumber})</span>
      </div>
    );
  }
}

CounterPartRow.propTypes = {
  counterpart: React.PropTypes.object.isRequired,
  clientId: React.PropTypes.number,
};
