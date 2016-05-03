class AddLegalCaseButton extends React.Component {
  handleAddLegalCaseClick(e) {
    e.preventDefault();
    ReactDOM.render(
      <EditFormModal
        form={<LegalCaseEditForm clientId={this.props.clientId}/>}
        header="Lägg till mål"
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
            <hr/>
            <a onClick={this.handleAddLegalCaseClick.bind(this)}
              className="btn btn-success-outline">Lägg till mål
            </a>
          </div>
      </div>
    );
  }
}
AddLegalCaseButton.propTypes = {
  clientId: React.PropTypes.number.isRequired,
};