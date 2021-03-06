class ClientForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: props.client ? props.client.city : '',
      co: props.client ? props.client.co : '',
      email: props.client ? props.client.email : '',
      firstName: props.client ? props.client.firstName : '',
      id: props.client ? props.client.id : '',
      lastName: props.client ? props.client.lastName : '',
      lawsuitId: props.lawsuitId,
      mobile: props.client ? props.client.mobile : '',
      note: props.client ? props.client.note : '',
      phoneNumber: props.client ? props.client.phoneNumber : '',
      postCode: props.client ? props.client.postCode : '',
      personalNumber: props.client ? props.client.personalNumber : '',
      street: props.client ? props.client.street : '',
    };

    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.handleOnSubmit(e);
    }
  }

  handleOnSubmit(e) {
    e.preventDefault();
    // If it has id it is an update.
    if (this.state.id) {
      makePutRequest(
        Routes.client_path(this.state.id),
        { client: this.state })
        .done(() => {
          showSuccessText('Klient uppdaterad', '#client-form-message');
          // Remove green or red text when updated successfully.
          $('.form-group').removeClass('has-success');
          $('.form-group').removeClass('has-error');
        })
        .fail(xhr => {
          errorMessage = xhr.status === 422 ?
            'Formuläret innehåller fel. Rätta till dem och försök igen.' :
            `Fel uppstod. Statuskod: ${xhr.status}`;
          showErrorText(errorMessage, '#client-form-message');
        });
    } else { // Otherwise create new client.
      if (this.state) {
        $('#client-form *').filter(':input').each((key, input) => {
          this.validate(input);
        });
        makePostRequest(Routes.clients_path(), { client: this.state })
          .done(res => {
            if (this.props.lawsuitId) {
              PubSub.publish('clientListUpdated');
            } else {
              window.location = res.client.link;
            }
          })
          .fail(xhr => {
            errorMessage = xhr.status === 422 ?
              'Formuläret innehåller fel. Rätta till dem och försök igen.' :
              `Fel uppstod. Statuskod: ${xhr.status}`;
            showErrorText(errorMessage, '#client-form-message');
          });
      }
    }
  }

  handleInputChange(e) {
    const nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  validate(e) {
    const input = e.target ? e.target : e;

    if (input.name === 'firstName') {
      validateStringLength(input.value, 40, 1, input.name, 'Förnamn');
    }
    if (input.name === 'lastName') {
      validateStringLength(input.value, 60, 1, input.name, 'Efternamn');
    }
    if (input.name === 'personalNumber') {
      validatePersonalNumber(input.value, input.name, true);
    }
    if (input.name === 'email') {
      validateStringLength(input.value, 255, '', input.name, 'E-post');
      validateEmail(input.value, input.name, false);
    }
    if (input.name === 'mobile') {
      validateStringLength(input.value, 15, '', input.name, 'Mobil');
    }
    if (input.name === 'phoneNumber') {
      validateStringLength(input.value, 15, '', input.name, 'Telefon');
    }
    if (input.name === 'street') {
      validateStringLength(input.value, 255, '', input.name, 'Gatuadress');
    }
    if (input.name === 'co') {
      validateStringLength(input.value, 255, '', input.name, 'C/O');
    }
    if (input.name === 'postCode') {
      validateStringLength(input.value, 6, '', input.name, 'Postnummer');
      validatePostCode(input.value, input.name, false);
    }
    if (input.name === 'city') {
      validateStringLength(input.value, 100, '', input.name, 'Ort');
    }
    if (input.name === 'note') {
      validateStringLength(input.value, 1000, '', input.name, 'Anteckning');
    }
  }

  handleCancelButtonClick(e) {
    e.preventDefault();
    if (this.props.lawsuitId) { // On lawsuit page.
      PubSub.publish('dismissEdit');
    } else { // On client new page.
      window.location = Routes.clients_path();
    }
  }

  render() {
    const isEdit = this.state !== '' && this.state.id !== '';
    const props = this.props;
    const state = this.state;
    return (
      <div>
        <h3>{props.header}</h3>
        <form
          id="client-form"
          onSubmit={this.handleOnSubmit}
          onKeyPress={this.handleKeyPress}
          noValidate
        >
          <p className="hidden message" id="client-form-message"></p>
          <div id="firstNameGroup" className="form-group row">
            <label className="col-sm-4 form-control-label" htmlFor="firstName">Förnamn</label>
            <div className="col-sm-8">
              <input
                placeholder="Förnamn"
                type="text"
                name="firstName"
                id="firstName"
                className="form-control form-control-sm"
                value={state.firstName}
                onChange={this.handleInputChange}
                onBlur={this.validate}
                autoFocus={!isEdit}
              />
            </div>
            <small id="firstNameHelper" className="text-muted text-danger helper"></small>
          </div>
          <div id="lastNameGroup" className="form-group row">
            <label htmlFor="lastName" className="col-sm-4 form-control-label">Efternamn</label>
            <div className="col-sm-8">
              <input
                type="text"
                placeholder="Efternamn"
                name="lastName"
                id="lastName"
                className="form-control form-control-sm"
                value={state.lastName}
                onChange={this.handleInputChange}
                onBlur={this.validate}
              />
            </div>
            <small id="lastNameHelper" className="text-muted text-danger helper"></small>
          </div>
          <div id="personalNumberGroup" className="form-group row">
            <label htmlFor="personalNumber" className="col-sm-8 form-control-label">
              Personnummer
            </label>
            <div className="col-sm-4">
              <input
                placeholder="ÅÅMMDD-XXXX"
                type="text"
                name="personalNumber"
                id="personalNumber"
                className="form-control form-control-sm"
                value={state.personalNumber}
                onChange={this.handleInputChange}
                onBlur={this.validate}
              />
            </div>
            <small id="personalNumberHelper" className="text-muted text-danger helper"></small>
          </div>
          <hr />
          <div id="emailGroup" className="form-group row">
            <label htmlFor="email" className="col-sm-4 form-control-label">E-post</label>
            <div className="col-sm-8">
              <input
                placeholder="E-post"
                id="email"
                type="email"
                name="email"
                className="form-control form-control-sm"
                value={state.email}
                onChange={this.handleInputChange}
                onBlur={this.validate}
              />
            {isEdit ?
              <a
                href={`mailto:${state.email}`}
                target="_top"
                className="fa fa-envelope"
                aria-hidden="true"
              ></a> : ''}
              <small id="emailHelper" className="text-muted"></small>
            </div>
          </div>
          <div id="mobileGroup" className="form-group row">
            <label htmlFor="mobile" className="col-sm-6 form-control-label">Mobil</label>
            <div className="col-sm-6">
              <input
                placeholder="Mobil"
                type="text"
                name="mobile"
                id="mobile"
                className="form-control form-control-sm"
                value={state.mobile}
                onChange={this.handleInputChange}
                onBlur={this.validate}
              />
            </div>
          </div>
          <small id="mobileHelper" className="text-muted text-danger helper"></small>
          <div id="phoneNumberGroup" className="form-group row">
            <label htmlFor="phoneNumber" className="col-sm-6 form-control-label">Telefon</label>
            <div className="col-sm-6">
              <input
                placeholder="Telefon"
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                className="form-control form-control-sm"
                value={state.phoneNumber}
                onChange={this.handleInputChange}
                onBlur={this.validate}
              />
            </div>
          </div>
          <small id="phoneNumberHelper" className="text-muted text-danger helper"></small>
          <hr />
          <div id="coGroup" className="form-group row">
            <label htmlFor="co" className="col-sm-4 form-control-label">C/O</label>
            <div className="col-sm-8">
              <input
                placeholder="C/O"
                type="text"
                name="co"
                id="co"
                className="form-control form-control-sm"
                value={state.co}
                onChange={this.handleInputChange}
                onBlur={this.validate}
              />
            </div>
          </div>
          <div id="streetGroup" className="form-group row">
            <label htmlFor="street" className="col-sm-4 form-control-label">Gatuadress</label>
            <div className="col-sm-8">
              <input
                placeholder="Gatuadress"
                type="text"
                name="street"
                id="street"
                className="form-control form-control-sm"
                value={state.street}
                onChange={this.handleInputChange}
                onBlur={this.validate}
              />
            </div>
          </div>
          <small id="streetHelper" className="text-muted text-danger helper"></small>
          <div id="postCodeGroup" className="form-group row">
            <label htmlFor="postCode" className="col-sm-8 form-control-label">Postnummer</label>
            <div className="col-sm-4">
              <input
                placeholder="Postnummer"
                type="text"
                name="postCode"
                id="postCode"
                className="form-control form-control-sm"
                value={state.postCode}
                onChange={this.handleInputChange}
                onBlur={this.validate}
              />
            </div>
            <small id="postCodeHelper" className="text-muted"></small>
          </div>
          <div id="cityGroup" className="form-group row">
            <label htmlFor="city" className="col-sm-4 form-control-label">Ort</label>
            <div className="col-sm-8">
              <input
                placeholder="Ort"
                type="text"
                name="city"
                id="city"
                className="form-control form-control-sm"
                value={state.city}
                onChange={this.handleInputChange}
                onBlur={this.validate}
              />
            </div>
            <small id="cityCodeHelper" className="text-muted text-danger helper"></small>
          </div>
          {isEdit ?
            <div className="content-right">
              <a
                href={`/report/${props.client.id}/brevmall.docx`}
                className="btn btn-primary-outline btn-sm"
              >
                <i className="fa fa-file-word-o" aria-hidden="true"></i>Brevmall
              </a>
            </div>
          : ''}
          <hr />
          <div id="noteGroup" className="form-group row">
            <label htmlFor="note" className="form-control-label">
              Anteckningar
            </label>
            <div className="col-sm-12">
              <textarea
                placeholder="Anteckningar"
                className="form-control"
                type="text-area"
                name="note"
                id="note"
                rows="4"
                value={state.note}
                onChange={this.handleInputChange}
                onBlur={this.validate}
              >
              </textarea>
              <small className="text-muted">Tryck Shift + Enter för att byta rad</small>
            </div>
            <small id="noteHelper" className="text-muted text-danger helper"></small>
          </div>
          <hr />
          <div className="content-right">
            {isEdit ? '' :
              <button
                className="btn btn-secondary"
                onClick={this.handleCancelButtonClick}
              >Avbryt
              </button>}
            <button
              className="btn btn-success"
              type="submit"
              disabled={false}
            >{isEdit ? 'Uppdatera' : 'Spara klient'}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

ClientForm.propTypes = {
  client: React.PropTypes.object,
  header: React.PropTypes.string,
  lawsuitId: React.PropTypes.number,
};
