class ClientDeleteButton extends React.Component {
  render() {
    var target = 'deleteClient';
    return (
      <div className="card">
        <ConfirmDeleteModal
          target={target}
          url={Routes.client_path(this.props.clientId)}
          redirectTo={Routes.clients_path()}
          subToPublish="deleteClientConfirmed"
        />
        <div className="card-block">
          <div className="row">
          <div className="col-md-8">
            <h3>Radera klient</h3>
            Radera klient och alla klientens mål.
          </div>
          <div className="col-md-4">
            <a href="#" className="btn btn-danger-outline"
              data-toggle="modal"
              data-target="#{target}">Radera klient
            </a>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

ClientDeleteButton.propTypes = {
  clientId: React.PropTypes.number.isRequired,
};
