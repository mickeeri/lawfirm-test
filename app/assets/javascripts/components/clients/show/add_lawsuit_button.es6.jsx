class AddLawsuitButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    ReactDOM.render(
      <EditFormModal
        form={<LawsuitForm clientId={this.props.clientId} />}
        header="Lägg till ärende"
      />,
    document.getElementById('editModalContainer')
    );
    $('#editFormModal').modal();
  }

  render() {
    return (
      <div>
        <div id="editModalContainer"></div>
        <div className="content-right">
          <a
            onClick={this.handleClick}
            className="btn btn-success-outline btn-sm"
            id="add-lawsuit-button"
          >Lägg till ärende
          </a>
        </div>
      </div>
    );
  }
}

AddLawsuitButton.propTypes = {
  clientId: React.PropTypes.number,
};
