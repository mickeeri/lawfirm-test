class ClientEditForm extends React.Component {
  constructor(props)  {
    super(props);
    this.state = props.client; // TODO: define properties here.
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleChangeOnClientInput = this.handleChangeOnClientInput.bind(this);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    if (this.state && this.state.id) { // If it has id it is an update.
      makePutRequest(Routes.client_path(this.state.id),
        { client: this.state }, 'clientUpdated');
    } else {
      if (this.state) { // Otherwise create new client.
        makePostRequest(Routes.clients_path(), { client: this.state }, 'redirect');
      }
    }
  }

  handleChangeOnClientInput(e) {
    var nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleCancelButtonClick(e) {
    e.preventDefault();
    if (this.state && this.state.id) {
      PubSub.publish('editModeButtonClicked');
    } else {
      window.location = Routes.clients_path();
    }
  }

  render() {
    var isEdit = this.state !== null && this.state.id !== null;
    return (
      <div className="card">
        <div className="card-block">
          <h3 className="card-title">{this.props.header}</h3>
          <form className="form-inline" onSubmit={this.handleOnSubmit}>
            <FormGroup
              name="first_name"
              type="text"
              value={this.state ? this.state.first_name : ''}
              changeEvent={this.handleChangeOnClientInput}
              autoFocus="true"
              label="Förnamn"
              required={true}
            />
            <FormGroup
              name="last_name"
              type="text"
              value={this.state ? this.state.last_name : ''}
              changeEvent={this.handleChangeOnClientInput}
              label="Efternamn"
              required={true}
            />
            <FormGroup
              name="ssn"
              type="tel"
              value={this.state ? this.state.ssn : ''}
              changeEvent={this.handleChangeOnClientInput}
              label="Personnummer"
              pattern='\d*'
              required={true}
              maxLength={10}
              minLength={10}
            />
            <hr/>
            <FormGroup
              name="email"
              type="email"
              value={this.state ? this.state.email : ''}
              changeEvent={this.handleChangeOnClientInput}
              label="E-post"
            />
            <FormGroup
              name="phone_number"
              type="tel"
              value={this.state ? this.state.phone_number : ''}
              changeEvent={this.handleChangeOnClientInput}
              label="Mobil"
            />
            <hr/>
            <FormGroup
              name="street"
              type="text"
              value={this.state ? this.state.street : ''}
              changeEvent={this.handleChangeOnClientInput}
              label="Gatuadress"
            />
            <FormGroup
              name="post_code"
              type="tel"
              value={this.state ? this.state.post_code : ''}
              changeEvent={this.handleChangeOnClientInput}
              pattern='\d*'
              label="Postnummer"
            />
            <FormGroup
              name="city"
              type="text"
              value={this.state ? this.state.city : ''}
              changeEvent={this.handleChangeOnClientInput}
              label="Ort"
            />
            <hr/>
            <div className="form-group form-group-textarea">
              <label htmlFor="note">Anteckningar</label>
              <textarea
                className="form-control"
                type="text-area"
                value={this.state ? this.state.note : ''}
                name="note"
                rows="4"
                onChange={this.handleChangeOnClientInput}>
              </textarea>
            </div>
            <hr/>
            <div className="content-right">
              {isEdit ? '' :
                <button
                  className="btn btn-secondary"
                  onClick={this.handleCancelButtonClick}>Avbryt
                </button>}
              <button
                className="btn btn-success"
                type="submit">{isEdit ? 'Uppdatera' : 'Spara klient'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
