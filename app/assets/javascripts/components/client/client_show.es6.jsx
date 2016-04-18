class ClientShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      client: props.client,
      editMode: false,
      showConfirmDelete: false,
    };

    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.deleteClient = this.deleteClient.bind(this);
    this.refreshClient = this.refreshClient.bind(this);
  }

  componentDidMount() {
    PubSub.subscribe('editModeButtonClicked', this.toggleEditMode);
    PubSub.subscribe('deleteClientConfirmed', this.deleteClient);
    PubSub.subscribe('clientUpdated', this.refreshClient);
  }

  componentWillUnmount() {
    PubSub.unsubscribe('editModeButtonClicked');
    PubSub.unsubscribe('deleteClientConfirmed');
    PubSub.unsubscribe('clientUpdated');
  }

  refreshClient () {
    makeGetRequest(Routes.client_path(this.state.client.id))
      .success(response=> {
        this.toggleEditMode();
        this.setState({ client: response.client });
      })
      .error(xhr=> {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  // Toggle boolean editMode.
  toggleEditMode() {
    if (this.state.editMode) {
      this.setState({ editMode: false });
      $('.edit-client-button').removeClass('active');
    } else {
      this.setState({ editMode: true });
      $('.edit-client-button').addClass('active');
    }
  }

  // Call delete in utils.
  deleteClient() {
    makeDeleteRequest(Routes.client_path(this.state.client.id))
      .success(response=> {
        console.log(response);
        window.location = Routes.clients_path();
      })
      .error(xhr=> {
        console.error(url, xhr.status, xhr.statusText);
      });
  }

  render() {
    var content;

    // Showing either form or regular text based on value of boolean editMode.
    if (this.state.editMode) {
      content = <ClientEditForm client={this.state.client} header="Redigera" />;
    } else {
      content = <ClientInfo client={this.state.client} />;
    }

    return (
      <div className="row">
        <div className="col-md-9">
          {content}
        </div>
        <div className="col-md-3">
          <div className="panel panel-default">
            <ClientShowButtons />
          </div>
        </div>
      </div>
    );
  }
}
